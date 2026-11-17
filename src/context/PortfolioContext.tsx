import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  ADMIN_EMAIL,
  OperationType,
  handleFirestoreError,
  publishPortfolioToCloud,
  submitInquiryToCloud,
  updateInquiryReadInCloud,
  deleteInquiryInCloud,
} from '../lib/firebase';
import { PortfolioData, InquiryMessage, ProjectItem, CertificationItem, EducationItem } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolio';
import { Language, Translations, translations } from '../data/translations';

export type PageTab = 'home' | 'about' | 'internships' | 'projects' | 'skills' | 'contact';
export type CloudSyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  resetData: () => Promise<boolean>;
  publishToCloud: (targetData?: PortfolioData) => Promise<boolean>;
  displayProjects: ProjectItem[];
  displayCertifications: CertificationItem[];
  displayEducation: EducationItem[];
  inquiries: InquiryMessage[];
  addInquiry: (inquiry: Omit<InquiryMessage, 'id' | 'createdAt' | 'read'>) => Promise<boolean>;
  deleteInquiry: (id: string) => void;
  markInquiryRead: (id: string, read: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  isCloudAdmin: boolean;
  authUser: User | null;
  authReady: boolean;
  cloudSyncStatus: CloudSyncStatus;
  cloudSyncError: string | null;
  hasCloudData: boolean;
  loginAdmin: (password: string) => boolean;
  loginWithGoogleAdmin: () => Promise<{ ok: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
  isTranscriptOpen: boolean;
  setIsTranscriptOpen: (open: boolean) => void;
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const STORAGE_KEY_DATA = 'gayeon_portfolio_data_v6';
const STORAGE_KEY_INQUIRIES = 'gayeon_portfolio_inquiries_v4';
const ADMIN_PASSWORD = '1111';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const defaultFallbackInquiries: InquiryMessage[] = [
  {
    id: 'inq-default-1',
    name: '김현우 팀장',
    company: '테크 스타트업 피플팀',
    email: 'hwkim@partner-tech.kr',
    phone: '010-3456-7890',
    type: 'interview',
    message:
      '안녕하세요 이가연 님, 포트폴리오의 HR 학술 조직 창립 및 연말정산 프로세스 개선 경험을 인상 깊게 보았습니다. 현재 저희 시리즈 B 스타트업의 신임 People Operations 담당자 포지션에 대해 이야기 나누고 싶습니다.',
    createdAt: '2026-11-10T14:30:00.000Z',
    read: false,
  },
  {
    id: 'inq-default-2',
    name: '박서연 리드',
    company: '글로벌 엔터테인먼트 그룹 인사본부',
    email: 'sypark@global-ent.com',
    phone: '010-8765-4321',
    type: 'coffee_chat',
    message:
      '일본어 역량(N1)과 데이터 분석 기반의 HR 관점이 매우 매력적입니다. 다음 주 중 30분 정도 가벼운 온/오프라인 커피챗을 제안드리고자 합니다.',
    createdAt: '2026-11-08T10:15:00.000Z',
    read: true,
  },
];

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.contact) {
          parsed.contact.linkedIn = 'https://www.linkedin.com/in/gayeon-lee2003';
        }
        return {
          ...defaultPortfolioData,
          ...parsed,
          education:
            parsed.education && parsed.education.length > 0
              ? parsed.education
              : defaultPortfolioData.education,
        };
      }
    } catch (e) {
      console.warn('Failed to parse portfolio data from storage, using defaults', e);
    }
    return defaultPortfolioData;
  });

  const [inquiries, setInquiries] = useState<InquiryMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse inquiries from storage', e);
    }
    return defaultFallbackInquiries;
  });

  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [localPinAuth, setLocalPinAuth] = useState(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<CloudSyncStatus>('idle');
  const [cloudSyncError, setCloudSyncError] = useState<string | null>(null);
  const [hasCloudConfig, setHasCloudConfig] = useState(false);
  const [hasCloudProjects, setHasCloudProjects] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [activeTab, setActiveTabState] = useState<PageTab>('home');
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('gayeon_portfolio_lang_v1');
      if (saved === 'ko' || saved === 'en' || saved === 'ja') {
        return saved;
      }
    } catch {}
    return 'ko';
  });

  const dataRef = useRef(data);
  dataRef.current = data;

  const isCloudAdmin = Boolean(
    authUser &&
      authUser.emailVerified &&
      authUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );
  const isAuthenticated = isCloudAdmin || localPinAuth;
  const hasCloudData = hasCloudConfig || hasCloudProjects;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('gayeon_portfolio_lang_v1', lang);
    } catch {}
  };

  const t = translations[language] || translations.ko;

  // 1. Firebase Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // 2. Real-time Firestore listener for public portfolio/main config
  useEffect(() => {
    const configRef = doc(db, 'portfolio', 'main');
    const unsubscribe = onSnapshot(
      configRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setHasCloudConfig(false);
          return;
        }
        setHasCloudConfig(true);
        const cloud = snapshot.data();
        setData((prev) => ({
          ...prev,
          hero: cloud.hero ? { ...prev.hero, ...cloud.hero } : prev.hero,
          about: cloud.about ? { ...prev.about, ...cloud.about } : prev.about,
          education: Array.isArray(cloud.education) && cloud.education.length > 0 ? cloud.education : prev.education,
          skillCategories:
            Array.isArray(cloud.skillCategories) && cloud.skillCategories.length > 0
              ? cloud.skillCategories
              : prev.skillCategories,
          certifications: Array.isArray(cloud.certifications) ? cloud.certifications : prev.certifications,
          contact: cloud.contact
            ? {
                ...prev.contact,
                ...cloud.contact,
                linkedIn: cloud.contact.linkedIn || 'https://www.linkedin.com/in/gayeon-lee2003',
              }
            : prev.contact,
        }));
      },
      (error) => {
        console.warn('Portfolio config listener warning:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // 3. Real-time Firestore listener for ordered public portfolio_projects
  useEffect(() => {
    const projectsQuery = query(collection(db, 'portfolio_projects'), orderBy('orderIndex', 'asc'));
    const unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        if (snapshot.empty) {
          setHasCloudProjects(false);
          return;
        }
        setHasCloudProjects(true);
        const cloudProjects: ProjectItem[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: typeof d.id === 'string' ? d.id : docSnap.id,
            title: typeof d.title === 'string' ? d.title : '',
            subtitle: typeof d.subtitle === 'string' ? d.subtitle : '',
            role: typeof d.role === 'string' ? d.role : '',
            period: typeof d.period === 'string' ? d.period : '',
            category: d.category || 'project',
            tags: Array.isArray(d.tags) ? d.tags : [],
            metrics: Array.isArray(d.metrics) ? d.metrics : [],
            overview: typeof d.overview === 'string' ? d.overview : '',
            situation: typeof d.situation === 'string' ? d.situation : '',
            task: typeof d.task === 'string' ? d.task : '',
            action: Array.isArray(d.action) ? d.action : [],
            result: Array.isArray(d.result) ? d.result : [],
            skills: Array.isArray(d.skills) ? d.skills : [],
            ...(typeof d.imageUrl === 'string' ? { imageUrl: d.imageUrl } : {}),
            ...(typeof d.featured === 'boolean' ? { featured: d.featured } : {}),
            ...(d.translations && typeof d.translations === 'object' ? { translations: d.translations } : {}),
          };
        });
        setData((prev) => ({
          ...prev,
          projects: cloudProjects,
        }));
      },
      (error) => {
        console.warn('Portfolio projects listener warning:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // 4. Real-time Firestore listener for private Inquiries (ONLY when auth ready & verified cloud admin)
  useEffect(() => {
    if (!authReady || !isCloudAdmin) return;

    const inquiriesQuery = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      inquiriesQuery,
      (snapshot) => {
        const list: InquiryMessage[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          const created =
            d.createdAt instanceof Timestamp
              ? d.createdAt.toDate().toISOString()
              : typeof d.createdAt === 'string'
              ? d.createdAt
              : new Date().toISOString();
          return {
            id: docSnap.id,
            name: typeof d.name === 'string' ? d.name : '',
            company: typeof d.company === 'string' ? d.company : '',
            email: typeof d.email === 'string' ? d.email : '',
            phone: typeof d.phone === 'string' ? d.phone : undefined,
            type: d.type || 'other',
            message: typeof d.message === 'string' ? d.message : '',
            read: Boolean(d.read),
            createdAt: created,
          };
        });
        setInquiries(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'inquiries');
      }
    );

    return () => unsubscribe();
  }, [authReady, isCloudAdmin]);

  // Auto-seed initial portfolio data to Firestore once when verified cloud admin logs in for the first time
  const seededOnceRef = useRef(false);
  useEffect(() => {
    if (authReady && isCloudAdmin && authUser && !hasCloudConfig && !hasCloudProjects && !seededOnceRef.current) {
      seededOnceRef.current = true;
      void publishToCloud(dataRef.current);
    }
  }, [authReady, isCloudAdmin, authUser, hasCloudConfig, hasCloudProjects]);

  // Sync activeTab with window URL pathname (/About_GAYEON_LEE/...) or hash
  useEffect(() => {
    const handleUrlChange = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash.replace('#', '');

      if (pathname.includes('/about') || hash === 'about') {
        setActiveTabState('about');
      } else if (pathname.includes('/internships') || hash === 'internships') {
        setActiveTabState('internships');
      } else if (pathname.includes('/projects') || hash === 'projects') {
        setActiveTabState('projects');
      } else if (pathname.includes('/skills') || hash === 'skills') {
        setActiveTabState('skills');
      } else if (pathname.includes('/contact') || hash === 'contact') {
        setActiveTabState('contact');
      } else {
        setActiveTabState('home');
      }

      if (!pathname.includes('About_GAYEON_LEE')) {
        const targetPath = '/About_GAYEON_LEE';
        window.history.replaceState(null, '', targetPath);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const setActiveTab = (tab: PageTab) => {
    setActiveTabState(tab);
    const subPath = tab === 'home' ? '' : `/${tab}`;
    const newUrl = `/About_GAYEON_LEE${subPath}`;
    window.history.pushState({ tab }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save inquiries to localStorage', e);
    }
  }, [inquiries]);

  const publishToCloud = async (targetData?: PortfolioData): Promise<boolean> => {
    if (!isCloudAdmin || !authUser) {
      return false;
    }
    setCloudSyncStatus('syncing');
    setCloudSyncError(null);
    try {
      await publishPortfolioToCloud(targetData || dataRef.current, authUser.uid);
      setCloudSyncStatus('synced');
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : '클라우드 동기화 중 오류가 발생했습니다.';
      setCloudSyncStatus('error');
      setCloudSyncError(msg);
      return false;
    }
  };

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    dataRef.current = newData;
    if (isCloudAdmin && authUser) {
      void publishToCloud(newData);
    }
  };

  const resetData = async (): Promise<boolean> => {
    setData(defaultPortfolioData);
    dataRef.current = defaultPortfolioData;
    try {
      localStorage.removeItem(STORAGE_KEY_DATA);
    } catch (e) {
      console.error(e);
    }
    if (isCloudAdmin && authUser) {
      return await publishToCloud(defaultPortfolioData);
    }
    return true;
  };

  const addInquiry = async (
    inquiry: Omit<InquiryMessage, 'id' | 'createdAt' | 'read'>
  ): Promise<boolean> => {
    let createdId = `inq-${Date.now()}`;
    try {
      createdId = await submitInquiryToCloud(inquiry);
    } catch (err) {
      console.warn('Firestore inquiry save error, saved locally as fallback:', err);
    }

    let emailedByServer = false;
    try {
      const serverRes = await fetch('/api/notify-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      });
      if (serverRes.ok) {
        const result = (await serverRes.json()) as { emailed?: boolean };
        emailedByServer = Boolean(result?.emailed);
      }
    } catch (err) {
      console.warn('Server email notification check skipped:', err);
    }

    if (!emailedByServer) {
      const typeLabelMap: Record<InquiryMessage['type'], string> = {
        interview: '정규직 채용 / 면접 제안',
        coffee_chat: '가벼운 커피챗 제안',
        project: '인턴십 / 채용연계 제안',
        other: '기타 협업 및 문의',
      };
      const typeLabel = typeLabelMap[inquiry.type] || '포트폴리오 문의';

      try {
        await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(ADMIN_EMAIL)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            제안유형: typeLabel,
            name: inquiry.name,
            소속회사: inquiry.company || '미입력',
            email: inquiry.email,
            연락처: inquiry.phone || '미입력',
            message: inquiry.message,
            _subject: `[포트폴리오 ${typeLabel}] ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ''}`,
            _replyto: inquiry.email,
            _template: 'table',
            _captcha: 'false',
          }),
        });
      } catch (err) {
        console.warn('FormSubmit fallback skipped:', err);
      }
    }

    const newEntry: InquiryMessage = {
      ...inquiry,
      id: createdId,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setInquiries((prev) => {
      if (prev.some((i) => i.id === createdId)) return prev;
      return [newEntry, ...prev];
    });
    return true;
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    if (isCloudAdmin) {
      void deleteInquiryInCloud(id).catch((err) => {
        console.error('Failed to delete inquiry from Firestore:', err);
      });
    }
  };

  const markInquiryRead = (id: string, read: boolean) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read } : item))
    );
    if (isCloudAdmin) {
      void updateInquiryReadInCloud(id, read).catch((err) => {
        console.error('Failed to update inquiry read state in Firestore:', err);
      });
    }
  };

  const loginAdmin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setLocalPinAuth(true);
      return true;
    }
    return false;
  };

  const loginWithGoogleAdmin = async (): Promise<{ ok: boolean; error?: string }> => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const user = cred.user;
      if (!user.emailVerified || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        await signOut(auth);
        return {
          ok: false,
          error: `관리자 계정(${ADMIN_EMAIL})으로 인증된 경우에만 실시간 웹 DB 편집이 허용됩니다.`,
        };
      }
      setCloudSyncError(null);
      return { ok: true };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Google 로그인 창이 닫혔거나 인증에 실패했습니다.';
      return { ok: false, error: message };
    }
  };

  const logoutAdmin = async () => {
    setLocalPinAuth(false);
    if (auth.currentUser) {
      await signOut(auth);
    }
  };

  const displayProjects: ProjectItem[] =
    language === 'ko'
      ? data.projects
      : data.projects.map((item) => {
          const staticTrans = t.projects.projectList.find((tp) => tp.id === item.id);
          const customTrans = item.translations?.[language];
          const base = staticTrans
            ? {
                ...staticTrans,
                category: item.category,
                featured: item.featured,
                imageUrl: item.imageUrl || staticTrans.imageUrl,
              }
            : item;

          if (!customTrans) return base;

          return {
            ...base,
            ...(customTrans.title?.trim() ? { title: customTrans.title.trim() } : {}),
            ...(customTrans.subtitle?.trim() ? { subtitle: customTrans.subtitle.trim() } : {}),
            ...(customTrans.role?.trim() ? { role: customTrans.role.trim() } : {}),
            ...(customTrans.period?.trim() ? { period: customTrans.period.trim() } : {}),
            ...(customTrans.overview?.trim() ? { overview: customTrans.overview.trim() } : {}),
            ...(customTrans.situation?.trim() ? { situation: customTrans.situation.trim() } : {}),
            ...(customTrans.task?.trim() ? { task: customTrans.task.trim() } : {}),
            ...(customTrans.action && customTrans.action.length > 0 ? { action: customTrans.action } : {}),
            ...(customTrans.result && customTrans.result.length > 0 ? { result: customTrans.result } : {}),
            ...(customTrans.tags && customTrans.tags.length > 0 ? { tags: customTrans.tags } : {}),
            ...(customTrans.skills && customTrans.skills.length > 0 ? { skills: customTrans.skills } : {}),
          };
        });

  const displayCertifications: CertificationItem[] =
    language === 'ko'
      ? data.certifications
      : data.certifications.map((item) => {
          const staticCert = t.skills.certifications.find((tc) => tc.id === item.id);
          const customCert = item.translations?.[language];
          const base = staticCert
            ? {
                ...staticCert,
                category: item.category,
                ...(item.skillCategoryId ? { skillCategoryId: item.skillCategoryId } : {}),
              }
            : item;

          if (!customCert) return base;

          return {
            ...base,
            ...(customCert.name?.trim() ? { name: customCert.name.trim() } : {}),
            ...(customCert.date?.trim() ? { date: customCert.date.trim() } : {}),
          };
        });

  const displayEducation: EducationItem[] =
    language === 'ko'
      ? data.education
      : data.education.map((item) => t.skills.education.find((te) => te.id === item.id) || item);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetData,
        publishToCloud,
        displayProjects,
        displayCertifications,
        displayEducation,
        inquiries,
        addInquiry,
        deleteInquiry,
        markInquiryRead,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        isCloudAdmin,
        authUser,
        authReady,
        cloudSyncStatus,
        cloudSyncError,
        hasCloudData,
        loginAdmin,
        loginWithGoogleAdmin,
        logoutAdmin,
        selectedProjectId,
        setSelectedProjectId,
        isResumeOpen,
        setIsResumeOpen,
        isTranscriptOpen,
        setIsTranscriptOpen,
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
