import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioData, ProjectItem, CertificationItem, LocalizedProjectFields, LocalizedHeroFields, SkillCompetencyId } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolio';
import { translations, Language } from '../data/translations';
import { processImageFile } from '../utils/imageUpload';
import { getCertificationSkillCategory } from '../utils/certificationMatch';
import {
  X,
  Lock,
  Unlock,
  Save,
  RotateCcw,
  Mail,
  Trash2,
  CheckCircle,
  Download,
  Upload,
  Settings,
  FolderKanban,
  FileText,
  User,
  Plus,
  Award,
  Briefcase,
  ArrowUp,
  ArrowDown,
  ImagePlus,
  Globe,
  Cloud,
  CloudOff,
  Loader2
} from 'lucide-react';

type AdminTab = 'hero' | 'about' | 'internships' | 'projects' | 'certifications' | 'contact' | 'inquiries' | 'settings';

interface NewProjectLangDraft {
  title: string;
  subtitle: string;
  role: string;
  period: string;
  overview: string;
  outcomesText: string;
  tagsText: string;
}

const emptyLangDraft = (): NewProjectLangDraft => ({
  title: '',
  subtitle: '',
  role: '',
  period: '',
  overview: '',
  outcomesText: '',
  tagsText: '',
});

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    isCloudAdmin,
    cloudSyncStatus,
    cloudSyncError,
    loginAdmin,
    loginWithGoogleAdmin,
    logoutAdmin,
    data,
    updateData,
    publishToCloud,
    resetData,
    inquiries,
    deleteInquiry,
    markInquiryRead,
  } = usePortfolio();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [googleAuthError, setGoogleAuthError] = useState<string | null>(null);
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('internships');
  const [editData, setEditData] = useState<PortfolioData>(data);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [confirmDeleteProjId, setConfirmDeleteProjId] = useState<string | null>(null);
  const [confirmDeleteCertId, setConfirmDeleteCertId] = useState<string | null>(null);
  const [confirmDeleteInqId, setConfirmDeleteInqId] = useState<string | null>(null);

  // Language selectors inside Admin editors
  const [heroEditLang, setHeroEditLang] = useState<Language>('ko');
  const [newProjLangTab, setNewProjLangTab] = useState<Language>('ko');
  const [itemEditLangs, setItemEditLangs] = useState<Record<string, Language>>({});
  const [certEditLang, setCertEditLang] = useState<Language>('ko');

  // Add Project / Internship Form state
  const [showAddFormTab, setShowAddFormTab] = useState<'internships' | 'projects' | null>(null);
  const [newProj, setNewProj] = useState<{
    category: ProjectItem['category'];
    title: string;
    subtitle: string;
    role: string;
    period: string;
    overview: string;
    outcomesText: string;
    tagsText: string;
    imageUrl: string;
    featured: boolean;
    en: NewProjectLangDraft;
    ja: NewProjectLangDraft;
  }>({
    category: 'internship',
    title: '',
    subtitle: '',
    role: '',
    period: '',
    overview: '',
    outcomesText: '',
    tagsText: '',
    imageUrl: '',
    featured: true,
    en: emptyLangDraft(),
    ja: emptyLangDraft(),
  });

  // Add Certification Form state (자격증명 - 취득일 + 연결 역량 + optional EN/JP)
  const [newCert, setNewCert] = useState<{
    name: string;
    date: string;
    category: CertificationItem['category'];
    skillCategoryId: SkillCompetencyId;
    enName: string;
    jaName: string;
  }>({
    name: '',
    date: '',
    category: 'cert',
    skillCategoryId: 'data-tech',
    enName: '',
    jaName: '',
  });

  // Sync editData when data changes or modal opens
  React.useEffect(() => {
    setEditData(data);
  }, [data, isAdminOpen]);

  if (!isAdminOpen) return null;

  const triggerToast = (msg: string = '저장 완료!') => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 2600);
  };

  const handleGoogleLogin = async () => {
    setGoogleAuthLoading(true);
    setGoogleAuthError(null);
    const res = await loginWithGoogleAdmin();
    setGoogleAuthLoading(false);
    if (!res.ok) {
      setGoogleAuthError(res.error || 'Google 로그인에 실패했습니다.');
    } else {
      triggerToast('실시간 웹 DB 관리자 인증 완료!');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (success) {
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const handleSave = () => {
    updateData(editData);
    triggerToast(isCloudAdmin ? '실시간 웹 DB 저장 완료!' : '로컬 저장 완료 (전체 반영은 Google 인증 필요)');
  };

  const handlePublishCloudNow = async () => {
    const ok = await publishToCloud(editData);
    triggerToast(ok ? '전체 방문자 화면에 즉시 반영되었습니다!' : '웹 DB 반영 중 오류가 발생했습니다.');
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    const ok = await resetData();
    setEditData(defaultPortfolioData);
    setConfirmReset(false);
    setIsResetting(false);
    if (isCloudAdmin) {
      triggerToast(
        ok
          ? '최신 기본 데이터로 복원 및 실시간 웹 DB 반영 완료!'
          : '로컬은 복원되었으나 웹 DB 반영 중 오류가 발생했습니다.'
      );
    } else {
      triggerToast('기본 데이터 복원 완료! (다른 방문자 반영은 Google 로그인 필요)');
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(editData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `gayeon_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as PortfolioData;
        if (!parsed.hero || !Array.isArray(parsed.projects) || !Array.isArray(parsed.certifications)) {
          triggerToast('올바른 포트폴리오 백업 JSON 파일이 아닙니다.');
          return;
        }
        setEditData(parsed);
        updateData(parsed);
        triggerToast('백업 데이터를 성공적으로 복원했습니다!');
      } catch {
        triggerToast('JSON 파일을 읽는 데 실패했습니다.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleLocalImageUpload = async (
    file: File | undefined,
    onSuccess: (dataUrl: string) => void,
    isPortrait = false
  ) => {
    if (!file) return;
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (isPdf) {
      triggerToast('PDF 첫 페이지를 이미지로 변환하고 있습니다...');
    }
    try {
      const compressed = await processImageFile(
        file,
        isPortrait
          ? { maxWidth: 720, maxHeight: 960, quality: 0.84 }
          : { maxWidth: 960, maxHeight: 720, quality: 0.82 }
      );
      onSuccess(compressed);
      triggerToast(
        isPdf
          ? 'PDF 1페이지가 이미지로 변환되어 적용되었습니다! (저장하기를 눌러 확정)'
          : '이미지가 적용되었습니다! (저장하기를 눌러 확정)'
      );
    } catch (err) {
      triggerToast(err instanceof Error ? err.message : '파일 업로드에 실패했습니다.');
    }
  };

  const openNewExperienceForm = (tab: 'internships' | 'projects') => {
    const category: ProjectItem['category'] = tab === 'internships' ? 'internship' : 'project';
    setNewProjLangTab('ko');
    setNewProj({
      category,
      title: '',
      subtitle: '',
      role: category === 'internship' ? '인턴' : '기획·참여',
      period: '',
      overview: '',
      outcomesText: '',
      tagsText: '',
      imageUrl: '',
      featured: true,
      en: emptyLangDraft(),
      ja: emptyLangDraft(),
    });
    setShowAddFormTab(tab);
  };

  const updateProjectField = (id: string, patch: Partial<ProjectItem>) => {
    setEditData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  const updateProjectLocalizedField = (
    id: string,
    lang: 'en' | 'ja',
    patch: Partial<LocalizedProjectFields>
  ) => {
    setEditData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => {
        if (p.id !== id) return p;
        return {
          ...p,
          translations: {
            ...p.translations,
            [lang]: {
              ...p.translations?.[lang],
              ...patch,
            },
          },
        };
      }),
    }));
  };

  const updateHeroLocalizedField = (lang: 'en' | 'ja', patch: Partial<LocalizedHeroFields>) => {
    setEditData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        translations: {
          ...prev.hero.translations,
          [lang]: {
            ...prev.hero.translations?.[lang],
            ...patch,
          },
        },
      },
    }));
  };

  const moveFilteredProject = (id: string, isInternshipTab: boolean, direction: 'up' | 'down') => {
    const matchingIndices: number[] = [];
    editData.projects.forEach((p, idx) => {
      if ((p.category === 'internship') === isInternshipTab) {
        matchingIndices.push(idx);
      }
    });

    const currentFullIdx = editData.projects.findIndex((p) => p.id === id);
    const posInGroup = matchingIndices.indexOf(currentFullIdx);
    if (posInGroup === -1) return;

    const targetPosInGroup = direction === 'up' ? posInGroup - 1 : posInGroup + 1;
    if (targetPosInGroup < 0 || targetPosInGroup >= matchingIndices.length) return;

    const targetFullIdx = matchingIndices[targetPosInGroup];
    const reordered = [...editData.projects];
    const temp = reordered[currentFullIdx];
    reordered[currentFullIdx] = reordered[targetFullIdx];
    reordered[targetFullIdx] = temp;

    const nextData: PortfolioData = { ...editData, projects: reordered };
    setEditData(nextData);
    updateData(nextData);
    triggerToast('노출 순서가 변경 및 저장되었습니다!');
  };

  const moveCertification = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= editData.certifications.length) return;

    const reordered = [...editData.certifications];
    const temp = reordered[idx];
    reordered[idx] = reordered[targetIdx];
    reordered[targetIdx] = temp;

    const nextData: PortfolioData = { ...editData, certifications: reordered };
    setEditData(nextData);
    updateData(nextData);
    triggerToast('자격증 순서가 변경 및 저장되었습니다!');
  };

  const buildLocalizedFromDraft = (draft: NewProjectLangDraft): LocalizedProjectFields | undefined => {
    const lines = draft.outcomesText.split('\n').map((s) => s.trim()).filter(Boolean);
    const tags = draft.tagsText.split(',').map((s) => s.trim()).filter(Boolean);
    const obj: LocalizedProjectFields = {};
    if (draft.title.trim()) obj.title = draft.title.trim();
    if (draft.subtitle.trim()) obj.subtitle = draft.subtitle.trim();
    if (draft.role.trim()) obj.role = draft.role.trim();
    if (draft.period.trim()) obj.period = draft.period.trim();
    if (draft.overview.trim()) obj.overview = draft.overview.trim();
    if (lines.length > 0) {
      obj.action = lines;
      obj.result = lines;
    }
    if (tags.length > 0) {
      obj.tags = tags;
      obj.skills = tags;
    }
    return Object.keys(obj).length > 0 ? obj : undefined;
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.title.trim()) return;

    const lines = newProj.outcomesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const tags = newProj.tagsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const enTrans = buildLocalizedFromDraft(newProj.en);
    const jaTrans = buildLocalizedFromDraft(newProj.ja);

    const createdItem: ProjectItem = {
      id: `proj-custom-${Date.now()}`,
      title: newProj.title.trim(),
      subtitle: newProj.subtitle.trim() || newProj.role.trim(),
      role: newProj.role.trim() || (newProj.category === 'internship' ? '인턴' : '프로젝트 담당'),
      period: newProj.period.trim() || '진행 기간 입력',
      category: newProj.category,
      featured: newProj.featured,
      tags: tags.length > 0 ? tags : [newProj.category === 'internship' ? '인턴십' : '프로젝트'],
      metrics: [
        { label: '구분', value: newProj.category === 'internship' ? '인턴 경험' : newProj.category === 'leadership' ? '학회·리더십' : newProj.category === 'global' ? '글로벌' : '프로젝트' },
        { label: '기간', value: newProj.period.trim() || '-' },
        { label: '역할', value: newProj.role.trim() || '담당' },
      ],
      overview: newProj.overview.trim() || newProj.subtitle.trim() || newProj.title.trim(),
      situation: newProj.overview.trim() || `${newProj.title.trim()} 수행 배경 및 과제`,
      task: newProj.subtitle.trim() || '주요 목표 달성 및 실무 완수',
      action: lines.length > 0 ? lines : ['핵심 실무 과제 기획 및 실행'],
      result: lines.length > 0 ? lines : ['성공적인 과업 완수 및 실무 역량 검증'],
      skills: tags.length > 0 ? tags : ['실무 기획', '문제 해결'],
      imageUrl:
        newProj.imageUrl.trim() ||
        (newProj.category === 'internship'
          ? '/src/assets/images/hr_analytics_workspace_1794448404200.jpg'
          : '/src/assets/images/team_collaboration_session_1794448404917.jpg'),
      ...(enTrans || jaTrans
        ? {
            translations: {
              ...(enTrans ? { en: enTrans } : {}),
              ...(jaTrans ? { ja: jaTrans } : {}),
            },
          }
        : {}),
    };

    const nextData: PortfolioData = {
      ...editData,
      projects: [createdItem, ...editData.projects],
    };
    setEditData(nextData);
    updateData(nextData);
    setShowAddFormTab(null);
    triggerToast(
      newProj.category === 'internship' ? '새 인턴 경험이 추가 및 저장되었습니다!' : '새 프로젝트가 추가 및 저장되었습니다!'
    );
  };

  const handleDeleteProject = (id: string) => {
    const nextData: PortfolioData = {
      ...editData,
      projects: editData.projects.filter((p) => p.id !== id),
    };
    setEditData(nextData);
    updateData(nextData);
    setConfirmDeleteProjId(null);
    triggerToast('항목이 삭제되었습니다.');
  };

  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.name.trim() || !newCert.date.trim()) return;

    const createdCert: CertificationItem = {
      id: `cert-custom-${Date.now()}`,
      name: newCert.name.trim(),
      date: newCert.date.trim(),
      category: newCert.category,
      skillCategoryId: newCert.skillCategoryId,
      ...(newCert.enName.trim() || newCert.jaName.trim()
        ? {
            translations: {
              ...(newCert.enName.trim() ? { en: { name: newCert.enName.trim(), date: newCert.date.trim() } } : {}),
              ...(newCert.jaName.trim() ? { ja: { name: newCert.jaName.trim(), date: newCert.date.trim() } } : {}),
            },
          }
        : {}),
    };

    const nextData: PortfolioData = {
      ...editData,
      certifications: [createdCert, ...editData.certifications],
    };
    setEditData(nextData);
    updateData(nextData);
    setNewCert({ name: '', date: '', category: 'cert', skillCategoryId: 'data-tech', enName: '', jaName: '' });
    triggerToast('자격증이 추가 및 저장되었습니다!');
  };

  const handleDeleteCertification = (id: string) => {
    const nextData: PortfolioData = {
      ...editData,
      certifications: editData.certifications.filter((c) => c.id !== id),
    };
    setEditData(nextData);
    updateData(nextData);
    setConfirmDeleteCertId(null);
    triggerToast('자격증이 삭제되었습니다.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-900/40 border border-blue-700/60 flex items-center justify-center text-blue-400">
              {isAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2 flex-wrap">
                <span>포트폴리오 관리자 콘솔 (Admin)</span>
                {isCloudAdmin ? (
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded inline-flex items-center gap-1">
                    {cloudSyncStatus === 'syncing' ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        웹 DB 동기화 중...
                      </>
                    ) : (
                      <>
                        <Cloud className="w-3 h-3" />
                        실시간 웹 DB 연동됨 (모든 방문자 반영)
                      </>
                    )}
                  </span>
                ) : isAuthenticated ? (
                  <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-700 px-2 py-0.5 rounded inline-flex items-center gap-1">
                    <CloudOff className="w-3 h-3" />
                    로컬 미리보기 모드 (내 브라우저에만 저장)
                  </span>
                ) : null}
              </h2>
              <p className="text-xs text-slate-400">
                인턴경험 · 프로젝트 · 자격증 순서 변경 및 실시간 웹 DB 콘텐츠 관리
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && !isCloudAdmin && (
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleAuthLoading}
                className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Google 관리자 로그인 후 모든 방문자에게 반영"
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>{googleAuthLoading ? '인증 중...' : 'Google 인증으로 웹 전체 반영'}</span>
              </button>
            )}
            {isCloudAdmin && (
              <button
                type="button"
                onClick={handlePublishCloudNow}
                className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                title="현재 순서와 내용을 전체 방문자 DB에 즉시 게시"
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>웹 DB 즉시 게시</span>
              </button>
            )}
            {saveToast && (
              <span className="text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-md flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> {saveToast}
              </span>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {cloudSyncError && isAuthenticated && (
          <div className="px-5 py-2.5 bg-red-950/80 border-b border-red-800 text-xs text-red-200">
            DB 동기화 오류: {cloudSyncError}
          </div>
        )}

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Admin Authentication Gate: Primary Google Cloud Admin + Fallback PIN */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full text-center space-y-6 my-auto">
            <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center mx-auto text-blue-400 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white">관리자 인증</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                순서 변경 및 자격증·프로젝트 추가 내용을 <strong className="text-white">다른 방문자 화면에도 실시간 반영</strong>하려면 등록된 Google 관리자 계정으로 로그인하세요.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleAuthLoading}
                className="w-full py-3.5 px-4 text-sm font-bold bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {googleAuthLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Cloud className="w-4 h-4" />
                )}
                <span>Google 계정으로 관리자 로그인 (웹 DB 실시간 반영)</span>
              </button>
              <div className="text-[11px] text-slate-500">
                허용된 관리자 계정: gayeon11267@gmail.com
              </div>
              {googleAuthError && (
                <p className="text-xs text-red-400 bg-red-950/60 border border-red-800 rounded-lg p-2.5">
                  {googleAuthError}
                </p>
              )}
            </div>

            <div className="pt-5 border-t border-slate-800 space-y-3">
              <div className="text-[11px] text-slate-500 font-medium">
                또는 현재 브라우저 임시 미리보기 (PIN: 1111)
              </div>
              <form onSubmit={handleLogin} className="flex gap-2">
                <input
                  type="password"
                  placeholder="PIN 입력 (1111)"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError(false);
                  }}
                  className="flex-1 text-center tracking-widest text-sm px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all cursor-pointer shrink-0"
                >
                  미리보기 열기
                </button>
              </form>
              {loginError && (
                <p className="text-xs text-red-400 font-medium">
                  비밀번호가 올바르지 않습니다. (1111을 입력하세요)
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-56 bg-slate-950 border-r border-slate-800 p-3 space-y-1 overflow-x-auto md:overflow-visible shrink-0 flex md:flex-col">
              {[
                { id: 'hero', label: '1. 기본 프로필 · 히어로', icon: User },
                { id: 'about', label: '2. 소개 및 핵심역량', icon: FileText },
                { id: 'internships', label: `3. 인턴경험 관리 (${editData.projects.filter((p) => p.category === 'internship').length})`, icon: Briefcase },
                { id: 'projects', label: `4. 프로젝트 관리 (${editData.projects.filter((p) => p.category !== 'internship').length})`, icon: FolderKanban },
                { id: 'certifications', label: '5. 자격증 관리', icon: Award },
                { id: 'contact', label: '6. 연락처 정보', icon: Mail },
                {
                  id: 'inquiries',
                  label: `7. 수신 제안함 (${inquiries.filter((i) => !i.read).length})`,
                  icon: Mail,
                  badge: inquiries.filter((i) => !i.read).length,
                },
                { id: 'settings', label: '설정 및 백업', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as AdminTab);
                      setShowAddFormTab(null);
                    }}
                    className={`flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded-lg text-left transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1 truncate">{tab.label}</span>
                    {Boolean(tab.badge) && (
                      <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-4 mt-auto border-t border-slate-800 hidden md:block">
                <button
                  onClick={logoutAdmin}
                  className="w-full px-3 py-2 text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors text-left flex items-center gap-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  관리자 로그아웃
                </button>
              </div>
            </div>

            {/* Active Tab Panel */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[75vh] space-y-6 bg-slate-900">
              {/* TAB 1: HERO SECTION (WITH KR/EN/JP & PROFILE IMAGE UPLOAD) */}
              {activeTab === 'hero' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-white">기본 프로필 & 히어로 카피</h3>
                      <p className="text-xs text-slate-400">
                        KR / EN / JP 언어별로 헤드라인과 직무 타이틀을 직접 편집하고 프로필 사진을 교체할 수 있습니다.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center p-0.5 bg-slate-950 border border-slate-700 rounded-lg">
                        {(['ko', 'en', 'ja'] as Language[]).map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setHeroEditLang(lang)}
                            className={`px-2.5 py-1 text-[11px] font-bold rounded-md cursor-pointer transition-all ${
                              heroEditLang === lang
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {lang.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={handleSave}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" /> 저장하기
                      </button>
                    </div>
                  </div>

                  {heroEditLang === 'ko' ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">이름 (한글)</label>
                          <input
                            type="text"
                            value={editData.hero.name}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                hero: { ...editData.hero, name: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">영문 이름</label>
                          <input
                            type="text"
                            value={editData.hero.englishName}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                hero: { ...editData.hero, englishName: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">생년월일 / 연령</label>
                          <input
                            type="text"
                            value={editData.hero.birthDate}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                hero: { ...editData.hero, birthDate: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">직무 타이틀 (Role)</label>
                          <input
                            type="text"
                            value={editData.hero.role}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                hero: { ...editData.hero, role: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">구직/지원 상태 라벨</label>
                          <input
                            type="text"
                            value={editData.hero.status}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                hero: { ...editData.hero, status: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          메인 카피 (Main Headline - 줄바꿈은 Enter)
                        </label>
                        <textarea
                          rows={2}
                          value={editData.hero.mainHeadline}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              hero: { ...editData.hero, mainHeadline: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          서브 카피 (Sub Headline)
                        </label>
                        <textarea
                          rows={2}
                          value={editData.hero.subHeadline}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              hero: { ...editData.hero, subHeadline: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </>
                  ) : (
                    (() => {
                      const langKey = heroEditLang as 'en' | 'ja';
                      const staticHero = translations[langKey].hero;
                      const customHero = editData.hero.translations?.[langKey] || {};
                      return (
                        <div className="space-y-4 p-4 bg-slate-950 border border-blue-500/40 rounded-xl">
                          <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                            <Globe className="w-4 h-4" />
                            <span>
                              {langKey === 'en' ? 'English (EN) 히어로 커스텀 편집' : '日本語 (JP) ヒーローカスタム編集'}
                            </span>
                            <span className="text-[11px] font-normal text-slate-400">
                              (비워두면 기본 번역 문구가 유지됩니다)
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1">직무 타이틀 (Role)</label>
                              <input
                                type="text"
                                placeholder={staticHero.role}
                                value={customHero.role || ''}
                                onChange={(e) => updateHeroLocalizedField(langKey, { role: e.target.value })}
                                className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1">지원 상태 라벨 (Status)</label>
                              <input
                                type="text"
                                placeholder={staticHero.status}
                                value={customHero.status || ''}
                                onChange={(e) => updateHeroLocalizedField(langKey, { status: e.target.value })}
                                className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">상단 배지 (Badge)</label>
                            <input
                              type="text"
                              placeholder={staticHero.badge}
                              value={customHero.badge || ''}
                              onChange={(e) => updateHeroLocalizedField(langKey, { badge: e.target.value })}
                              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">메인 카피 (Main Headline)</label>
                            <textarea
                              rows={2}
                              placeholder={staticHero.mainHeadline}
                              value={customHero.mainHeadline || ''}
                              onChange={(e) => updateHeroLocalizedField(langKey, { mainHeadline: e.target.value })}
                              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">서브 카피 (Sub Headline)</label>
                            <textarea
                              rows={2}
                              placeholder={staticHero.subHeadline}
                              value={customHero.subHeadline || ''}
                              onChange={(e) => updateHeroLocalizedField(langKey, { subHeadline: e.target.value })}
                              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                            />
                          </div>
                        </div>
                      );
                    })()
                  )}
                </div>
              )}

              {/* TAB 2: ABOUT SECTION */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">About Me & 3가지 핵심 역량</h3>
                    <button
                      onClick={handleSave}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" /> 저장하기
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-300">
                      소개 내러티브 문단
                    </label>
                    {editData.about.bioParagraphs.map((para, idx) => (
                      <textarea
                        key={idx}
                        rows={3}
                        value={para}
                        onChange={(e) => {
                          const updated = [...editData.about.bioParagraphs];
                          updated[idx] = e.target.value;
                          setEditData({
                            ...editData,
                            about: { ...editData.about, bioParagraphs: updated },
                          });
                        }}
                        className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    ))}
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="text-xs font-bold text-slate-400">
                      3대 핵심 가치 및 차별화 포인트
                    </div>
                    {editData.about.coreValues.map((val, vIdx) => (
                      <div key={val.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={val.title}
                            onChange={(e) => {
                              const updated = [...editData.about.coreValues];
                              updated[vIdx] = { ...updated[vIdx], title: e.target.value };
                              setEditData({
                                ...editData,
                                about: { ...editData.about, coreValues: updated },
                              });
                            }}
                            className="px-3 py-1.5 text-xs font-bold bg-slate-900 border border-slate-700 rounded text-white"
                          />
                          <input
                            type="text"
                            value={val.tagline}
                            onChange={(e) => {
                              const updated = [...editData.about.coreValues];
                              updated[vIdx] = { ...updated[vIdx], tagline: e.target.value };
                              setEditData({
                                ...editData,
                                about: { ...editData.about, coreValues: updated },
                              });
                            }}
                            className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-300"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={val.description}
                          onChange={(e) => {
                            const updated = [...editData.about.coreValues];
                            updated[vIdx] = { ...updated[vIdx], description: e.target.value };
                            setEditData({
                              ...editData,
                              about: { ...editData.about, coreValues: updated },
                            });
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3 & TAB 4: INTERNSHIPS / PROJECTS (SEPARATED + MULTILINGUAL + REORDER + IMAGE UPLOAD) */}
              {(activeTab === 'internships' || activeTab === 'projects') && (() => {
                const isInternshipTab = activeTab === 'internships';
                const tabItems = editData.projects.filter((p) =>
                  isInternshipTab ? p.category === 'internship' : p.category !== 'internship'
                );

                return (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-white">
                          {isInternshipTab ? '인턴경험 관리 (전용)' : '주요 프로젝트 · 대외활동 관리 (전용)'}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {isInternshipTab
                            ? `KR/EN/JP 다국어 입력 · 순서 위/아래 이동 · 이미지/PDF 업로드를 지원합니다. (총 ${tabItems.length}건)`
                            : `KR/EN/JP 다국어 입력 · 순서 위/아래 이동 · 이미지/PDF 업로드를 지원합니다. (총 ${tabItems.length}건)`}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {isInternshipTab ? (
                          <button
                            type="button"
                            onClick={() => openNewExperienceForm('internships')}
                            className="px-3.5 py-1.5 text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            <Briefcase className="w-3.5 h-3.5" /> + 인턴 경험 추가
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openNewExperienceForm('projects')}
                            className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" /> + 프로젝트 추가
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleSave}
                          className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" /> 전체 저장
                        </button>
                      </div>
                    </div>

                    {/* New Experience / Project Creation Form (With KR / EN / JP & Image Upload) */}
                    {showAddFormTab === activeTab && (
                      <form
                        onSubmit={handleAddProject}
                        className="p-5 bg-slate-950 border-2 border-blue-500/70 rounded-xl space-y-4 shadow-lg"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                          <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                            <Plus className="w-4 h-4" />
                            {isInternshipTab ? '새 인턴 경험 추가' : '새 프로젝트 / 활동 추가'}
                          </span>

                          <div className="flex items-center gap-2">
                            {/* Multilingual Form Language Selector */}
                            <div className="flex items-center p-0.5 bg-slate-900 border border-slate-700 rounded-lg">
                              {(['ko', 'en', 'ja'] as Language[]).map((lang) => (
                                <button
                                  key={lang}
                                  type="button"
                                  onClick={() => setNewProjLangTab(lang)}
                                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md cursor-pointer transition-all ${
                                    newProjLangTab === lang
                                      ? 'bg-blue-600 text-white'
                                      : 'text-slate-400 hover:text-white'
                                  }`}
                                >
                                  {lang === 'ko' ? 'KR (필수)' : lang === 'en' ? 'EN (선택)' : 'JP (선택)'}
                                </button>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => setShowAddFormTab(null)}
                              className="text-xs text-slate-400 hover:text-white cursor-pointer px-2"
                            >
                              취소
                            </button>
                          </div>
                        </div>

                        {newProjLangTab === 'ko' ? (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {!isInternshipTab && (
                                <div>
                                  <label className="block text-[11px] text-slate-400 mb-1">카테고리</label>
                                  <select
                                    value={newProj.category}
                                    onChange={(e) => setNewProj({ ...newProj, category: e.target.value as ProjectItem['category'] })}
                                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                  >
                                    <option value="project">프로젝트 · 대외활동</option>
                                    <option value="leadership">학회 · 리더십</option>
                                    <option value="global">해외연수 · 글로벌</option>
                                  </select>
                                </div>
                              )}

                              <div className={isInternshipTab ? 'sm:col-span-2' : ''}>
                                <label className="block text-[11px] text-slate-400 mb-1">
                                  {isInternshipTab ? '기업명 / 인턴 과정명 *' : '프로젝트 / 활동명 *'}
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder={isInternshipTab ? '예: OO기업 인사팀 채용연계형 인턴' : '예: HR 데이터 분석 대시보드 구축 프로젝트'}
                                  value={newProj.title}
                                  onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] text-slate-400 mb-1">기간</label>
                                <input
                                  type="text"
                                  placeholder="예: 2026.07 ~ 2026.10"
                                  value={newProj.period}
                                  onChange={(e) => setNewProj({ ...newProj, period: e.target.value })}
                                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] text-slate-400 mb-1">직무 / 역할</label>
                                <input
                                  type="text"
                                  placeholder={isInternshipTab ? '예: 피플팀 인턴' : '예: 프로젝트 팀장'}
                                  value={newProj.role}
                                  onChange={(e) => setNewProj({ ...newProj, role: e.target.value })}
                                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-slate-400 mb-1">한줄 부제목</label>
                                <input
                                  type="text"
                                  placeholder="예: 채용 운영 및 온보딩 프로세스 개선"
                                  value={newProj.subtitle}
                                  onChange={(e) => setNewProj({ ...newProj, subtitle: e.target.value })}
                                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">개요 (Overview)</label>
                              <textarea
                                rows={2}
                                placeholder="수행한 핵심 업무와 맥락을 간단히 적어주세요."
                                value={newProj.overview}
                                onChange={(e) => setNewProj({ ...newProj, overview: e.target.value })}
                                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">
                                주요 업무 및 성과 (줄바꿈으로 여러 항목 입력)
                              </label>
                              <textarea
                                rows={3}
                                placeholder={`지원자 서류·면접 일정 조율 및 안내\n엑셀 기반 채용 퍼널 지표 정리 및 보고`}
                                value={newProj.outcomesText}
                                onChange={(e) => setNewProj({ ...newProj, outcomesText: e.target.value })}
                                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                              />
                            </div>

                            {/* Local Image Upload in Creation Form */}
                            <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                {newProj.imageUrl && (
                                  <img
                                    src={newProj.imageUrl}
                                    alt="미리보기"
                                    className="w-12 h-9 rounded object-cover border border-slate-700"
                                  />
                                )}
                                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer">
                                  <ImagePlus className="w-3.5 h-3.5 text-blue-400" />
                                  <span>{newProj.imageUrl ? '이미지·PDF 변경' : '카드 이미지·PDF 선택 (로컬)'}</span>
                                  <input
                                    type="file"
                                    accept="image/*,.pdf,application/pdf"
                                    className="hidden"
                                    onChange={(e) => {
                                      handleLocalImageUpload(e.target.files?.[0], (dataUrl) =>
                                        setNewProj((prev) => ({ ...prev, imageUrl: dataUrl }))
                                      );
                                      e.target.value = '';
                                    }}
                                  />
                                </label>
                                {newProj.imageUrl && (
                                  <button
                                    type="button"
                                    onClick={() => setNewProj((prev) => ({ ...prev, imageUrl: '' }))}
                                    className="text-[11px] text-slate-400 hover:text-red-400 cursor-pointer"
                                  >
                                    제거
                                  </button>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500">
                                미선택 시 기본 이미지 적용 · PDF 업로드 시 1페이지 자동 변환
                              </span>
                            </div>
                          </>
                        ) : (
                          (() => {
                            const draftKey = newProjLangTab as 'en' | 'ja';
                            const draft = newProj[draftKey];
                            const setDraft = (patch: Partial<NewProjectLangDraft>) =>
                              setNewProj((prev) => ({
                                ...prev,
                                [draftKey]: { ...prev[draftKey], ...patch },
                              }));

                            return (
                              <div className="space-y-3 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800">
                                <p className="text-[11px] text-blue-300">
                                  {draftKey === 'en'
                                    ? '영문(EN) 모드에서 표시할 내용을 입력하세요. 비워두면 한국어 기본값이 표시됩니다.'
                                    : '일본어(JP) 모드에서 표시할 내용을 입력하세요. 비워두면 한국어 기본값이 표시됩니다.'}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-[11px] text-slate-400 mb-1">
                                      {draftKey === 'en' ? 'Title (EN)' : 'タイトル (JP)'}
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={newProj.title || '제목 입력'}
                                      value={draft.title}
                                      onChange={(e) => setDraft({ title: e.target.value })}
                                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-slate-400 mb-1">
                                      {draftKey === 'en' ? 'Period (EN)' : '期間 (JP)'}
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={newProj.period || '2026.07 - 2026.10'}
                                      value={draft.period}
                                      onChange={(e) => setDraft({ period: e.target.value })}
                                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-[11px] text-slate-400 mb-1">
                                      {draftKey === 'en' ? 'Role (EN)' : '役割 (JP)'}
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={newProj.role || 'People Operations Intern'}
                                      value={draft.role}
                                      onChange={(e) => setDraft({ role: e.target.value })}
                                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] text-slate-400 mb-1">
                                      {draftKey === 'en' ? 'Subtitle (EN)' : 'サブタイトル (JP)'}
                                    </label>
                                    <input
                                      type="text"
                                      placeholder={newProj.subtitle}
                                      value={draft.subtitle}
                                      onChange={(e) => setDraft({ subtitle: e.target.value })}
                                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-[11px] text-slate-400 mb-1">
                                    {draftKey === 'en' ? 'Overview (EN)' : '概要 (JP)'}
                                  </label>
                                  <textarea
                                    rows={2}
                                    placeholder={newProj.overview}
                                    value={draft.overview}
                                    onChange={(e) => setDraft({ overview: e.target.value })}
                                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] text-slate-400 mb-1">
                                    {draftKey === 'en' ? 'Key Outcomes (Line-separated)' : '主な成果 (改行区切り)'}
                                  </label>
                                  <textarea
                                    rows={2}
                                    placeholder={newProj.outcomesText}
                                    value={draft.outcomesText}
                                    onChange={(e) => setDraft({ outcomesText: e.target.value })}
                                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] text-slate-400 mb-1">
                                    {draftKey === 'en' ? 'Tags (Comma-separated)' : 'タグ (カンマ区切り)'}
                                  </label>
                                  <input
                                    type="text"
                                    placeholder={newProj.tagsText}
                                    value={draft.tagsText}
                                    onChange={(e) => setDraft({ tagsText: e.target.value })}
                                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                                  />
                                </div>
                              </div>
                            );
                          })()
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          {newProjLangTab === 'ko' && (
                            <div className="flex-1 min-w-[200px]">
                              <label className="block text-[11px] text-slate-400 mb-1">태그 (쉼표 구분)</label>
                              <input
                                type="text"
                                placeholder="예: 채용 운영, Excel, 데이터 정리"
                                value={newProj.tagsText}
                                onChange={(e) => setNewProj({ ...newProj, tagsText: e.target.value })}
                                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                              />
                            </div>
                          )}

                          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-2">
                            <input
                              type="checkbox"
                              checked={newProj.featured}
                              onChange={(e) => setNewProj({ ...newProj, featured: e.target.checked })}
                              className="rounded border-slate-600"
                            />
                            <span>홈 하이라이트에도 노출</span>
                          </label>

                          <button
                            type="submit"
                            className="ml-auto px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer"
                          >
                            추가 및 즉시 저장
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Filtered List with Reorder + Multilingual Tabs + Local Image Upload */}
                    <div className="space-y-5">
                      {tabItems.map((proj, idx) => {
                        const cardLang: Language = itemEditLangs[proj.id] || 'ko';
                        const setCardLang = (l: Language) =>
                          setItemEditLangs((prev) => ({ ...prev, [proj.id]: l }));

                        const staticFallback =
                          cardLang === 'ko'
                            ? undefined
                            : translations[cardLang].projects.projectList.find((tp) => tp.id === proj.id);
                        const customTrans =
                          cardLang === 'ko' ? undefined : proj.translations?.[cardLang];

                        return (
                          <div key={proj.id} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                            {/* Top Control Row */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-xs font-bold ${isInternshipTab ? 'text-emerald-400' : 'text-blue-400'}`}>
                                  {isInternshipTab ? 'INTERN' : 'PROJ'} {String(idx + 1).padStart(2, '0')}
                                </span>

                                {/* Reorder Buttons */}
                                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-md p-0.5">
                                  <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => moveFilteredProject(proj.id, isInternshipTab, 'up')}
                                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                    title="위로 이동"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={idx === tabItems.length - 1}
                                    onClick={() => moveFilteredProject(proj.id, isInternshipTab, 'down')}
                                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                    title="아래로 이동"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <select
                                  value={proj.category}
                                  onChange={(e) =>
                                    updateProjectField(proj.id, { category: e.target.value as ProjectItem['category'] })
                                  }
                                  className="px-2 py-0.5 text-[11px] bg-slate-900 border border-slate-700 rounded text-slate-200"
                                >
                                  <option value="internship">인턴 경험</option>
                                  <option value="leadership">학회 · 리더십</option>
                                  <option value="project">프로젝트 · 대외활동</option>
                                  <option value="global">해외연수 · 글로벌</option>
                                </select>

                                <label className="flex items-center gap-1 text-[11px] text-slate-400 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={proj.featured !== false}
                                    onChange={(e) => updateProjectField(proj.id, { featured: e.target.checked })}
                                  />
                                  <span>홈 노출</span>
                                </label>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Per-Item Multilingual Toggle */}
                                <div className="flex items-center p-0.5 bg-slate-900 border border-slate-700 rounded-lg">
                                  {(['ko', 'en', 'ja'] as Language[]).map((lang) => (
                                    <button
                                      key={lang}
                                      type="button"
                                      onClick={() => setCardLang(lang)}
                                      className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-all ${
                                        cardLang === lang
                                          ? 'bg-blue-600 text-white'
                                          : 'text-slate-400 hover:text-white'
                                      }`}
                                    >
                                      {lang.toUpperCase()}
                                    </button>
                                  ))}
                                </div>

                                {confirmDeleteProjId === proj.id ? (
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteProject(proj.id)}
                                      className="px-2.5 py-1 text-[11px] font-bold bg-red-600 hover:bg-red-500 text-white rounded cursor-pointer"
                                    >
                                      삭제 확인
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setConfirmDeleteProjId(null)}
                                      className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                                    >
                                      취소
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteProjId(proj.id)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] text-red-400 hover:text-red-300 bg-red-950/50 hover:bg-red-950 border border-red-900/60 rounded cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3" /> 삭제
                                  </button>
                                )}
                              </div>
                            </div>

                            {cardLang === 'ko' ? (
                              <>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block text-[11px] text-slate-400 mb-1">
                                      {isInternshipTab ? '기업명 / 과정명' : '프로젝트명'}
                                    </label>
                                    <input
                                      type="text"
                                      value={proj.title}
                                      onChange={(e) => updateProjectField(proj.id, { title: e.target.value })}
                                      className="w-full px-3 py-1.5 text-xs font-bold bg-slate-900 border border-slate-700 rounded text-white"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[11px] text-slate-400 mb-1">담당 역할</label>
                                    <input
                                      type="text"
                                      value={proj.role}
                                      onChange={(e) => updateProjectField(proj.id, { role: e.target.value })}
                                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-white"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[11px] text-slate-400 mb-1">기간</label>
                                    <input
                                      type="text"
                                      value={proj.period}
                                      onChange={(e) => updateProjectField(proj.id, { period: e.target.value })}
                                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-white"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-[11px] text-slate-400 mb-1">부제목</label>
                                  <input
                                    type="text"
                                    value={proj.subtitle}
                                    onChange={(e) => updateProjectField(proj.id, { subtitle: e.target.value })}
                                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-200"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] text-slate-400 mb-1">개요 (Overview)</label>
                                  <textarea
                                    rows={2}
                                    value={proj.overview}
                                    onChange={(e) => updateProjectField(proj.id, { overview: e.target.value })}
                                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-300"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] text-slate-400 mb-1">주요 성과 (줄바꿈 구분)</label>
                                  <textarea
                                    rows={2}
                                    value={proj.result.join('\n')}
                                    onChange={(e) =>
                                      updateProjectField(proj.id, {
                                        result: e.target.value.split('\n').map((l) => l.trim()).filter(Boolean),
                                      })
                                    }
                                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-300"
                                  />
                                </div>

                                {/* Card Image Upload & URL Row */}
                                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                                  {proj.imageUrl && (
                                    <img
                                      src={proj.imageUrl}
                                      alt={proj.title}
                                      className="w-14 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                                    />
                                  )}
                                  <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer shrink-0">
                                    <Upload className="w-3 h-3 text-blue-400" />
                                    <span>이미지·PDF 변경</span>
                                    <input
                                      type="file"
                                      accept="image/*,.pdf,application/pdf"
                                      className="hidden"
                                      onChange={(e) => {
                                        handleLocalImageUpload(e.target.files?.[0], (dataUrl) =>
                                          updateProjectField(proj.id, { imageUrl: dataUrl })
                                        );
                                        e.target.value = '';
                                      }}
                                    />
                                  </label>
                                  <input
                                    type="text"
                                    value={proj.imageUrl || ''}
                                    onChange={(e) => updateProjectField(proj.id, { imageUrl: e.target.value })}
                                    placeholder="이미지 경로 또는 URL"
                                    className="flex-1 min-w-[180px] px-2.5 py-1.5 text-[11px] bg-slate-900 border border-slate-700 rounded text-slate-400"
                                  />
                                </div>
                              </>
                            ) : (
                              (() => {
                                const langKey = cardLang as 'en' | 'ja';
                                return (
                                  <div className="space-y-3 bg-slate-900/40 p-3.5 rounded-lg border border-blue-500/30">
                                    <div className="text-[11px] text-blue-300 flex items-center gap-1.5">
                                      <Globe className="w-3.5 h-3.5" />
                                      <span>
                                        {langKey === 'en'
                                          ? 'English (EN) 번역 편집 — 비워두면 기존 영문 번역 또는 한국어가 표시됩니다.'
                                          : '日本語 (JP) 翻訳編集 — 空欄の場合は既存の翻訳または韓国語が表示されます。'}
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                      <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">
                                          {langKey === 'en' ? 'Title (EN)' : 'タイトル (JP)'}
                                        </label>
                                        <input
                                          type="text"
                                          placeholder={staticFallback?.title || proj.title}
                                          value={customTrans?.title ?? ''}
                                          onChange={(e) =>
                                            updateProjectLocalizedField(proj.id, langKey, { title: e.target.value })
                                          }
                                          className="w-full px-3 py-1.5 text-xs font-bold bg-slate-900 border border-slate-700 rounded text-white"
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">
                                          {langKey === 'en' ? 'Role (EN)' : '役割 (JP)'}
                                        </label>
                                        <input
                                          type="text"
                                          placeholder={staticFallback?.role || proj.role}
                                          value={customTrans?.role ?? ''}
                                          onChange={(e) =>
                                            updateProjectLocalizedField(proj.id, langKey, { role: e.target.value })
                                          }
                                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-white"
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">
                                          {langKey === 'en' ? 'Period (EN)' : '期間 (JP)'}
                                        </label>
                                        <input
                                          type="text"
                                          placeholder={staticFallback?.period || proj.period}
                                          value={customTrans?.period ?? ''}
                                          onChange={(e) =>
                                            updateProjectLocalizedField(proj.id, langKey, { period: e.target.value })
                                          }
                                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-white"
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-[11px] text-slate-400 mb-1">
                                        {langKey === 'en' ? 'Subtitle (EN)' : 'サブタイトル (JP)'}
                                      </label>
                                      <input
                                        type="text"
                                        placeholder={staticFallback?.subtitle || proj.subtitle}
                                        value={customTrans?.subtitle ?? ''}
                                        onChange={(e) =>
                                          updateProjectLocalizedField(proj.id, langKey, { subtitle: e.target.value })
                                        }
                                        className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-200"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-[11px] text-slate-400 mb-1">
                                        {langKey === 'en' ? 'Overview (EN)' : '概要 (JP)'}
                                      </label>
                                      <textarea
                                        rows={2}
                                        placeholder={staticFallback?.overview || proj.overview}
                                        value={customTrans?.overview ?? ''}
                                        onChange={(e) =>
                                          updateProjectLocalizedField(proj.id, langKey, { overview: e.target.value })
                                        }
                                        className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-300"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-[11px] text-slate-400 mb-1">
                                        {langKey === 'en' ? 'Key Outcomes (Line-separated)' : '主な成果 (改行区切り)'}
                                      </label>
                                      <textarea
                                        rows={2}
                                        placeholder={(staticFallback?.result || proj.result).join('\n')}
                                        value={customTrans?.result ? customTrans.result.join('\n') : ''}
                                        onChange={(e) =>
                                          updateProjectLocalizedField(proj.id, langKey, {
                                            result: e.target.value
                                              .split('\n')
                                              .map((l) => l.trim())
                                              .filter(Boolean),
                                          })
                                        }
                                        className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-300"
                                      />
                                    </div>
                                  </div>
                                );
                              })()
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* TAB 5: CERTIFICATIONS (MULTILINGUAL + REORDER + ADD/DELETE) */}
              {activeTab === 'certifications' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-white">자격증 및 어학 관리</h3>
                      <p className="text-xs text-slate-400">
                        자격증명과 취득일을 추가·순서 변경하고 KR/EN/JP 언어별 명칭도 관리할 수 있습니다. (총 {editData.certifications.length}건)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center p-0.5 bg-slate-950 border border-slate-700 rounded-lg">
                        {(['ko', 'en', 'ja'] as Language[]).map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setCertEditLang(lang)}
                            className={`px-2.5 py-1 text-[11px] font-bold rounded-md cursor-pointer transition-all ${
                              certEditLang === lang
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {lang.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" /> 변경사항 저장
                      </button>
                    </div>
                  </div>

                  {/* Quick Add Certification Form (with optional EN/JP) */}
                  <form
                    onSubmit={handleAddCertification}
                    className="p-5 bg-slate-950 border border-blue-600/60 rounded-xl space-y-3"
                  >
                    <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                      <Plus className="w-4 h-4" /> 새 자격증 추가 (자격증명 - 취득일)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                      <div className="sm:col-span-4">
                        <label className="block text-[11px] text-slate-400 mb-1">자격증명 (한국어) *</label>
                        <input
                          type="text"
                          required
                          placeholder="예: 사회조사분석사 2급 / SQLD"
                          value={newCert.name}
                          onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-slate-400 mb-1">취득일 *</label>
                        <input
                          type="text"
                          required
                          placeholder="예: 2026.08.20"
                          value={newCert.date}
                          onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-slate-400 mb-1">구분</label>
                        <select
                          value={newCert.category}
                          onChange={(e) => {
                            const nextCategory = e.target.value as CertificationItem['category'];
                            setNewCert({
                              ...newCert,
                              category: nextCategory,
                              skillCategoryId: nextCategory === 'lang' ? 'languages' : newCert.skillCategoryId === 'languages' ? 'data-tech' : newCert.skillCategoryId,
                            });
                          }}
                          className="w-full px-2.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        >
                          <option value="cert">자격증</option>
                          <option value="lang">어학</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-slate-400 mb-1">연결 역량 탭</label>
                        <select
                          value={newCert.skillCategoryId}
                          onChange={(e) =>
                            setNewCert({ ...newCert, skillCategoryId: e.target.value as SkillCompetencyId })
                          }
                          className="w-full px-2 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        >
                          <option value="data-tech">컴퓨터·직무</option>
                          <option value="hr-domain">채용·급여 실무</option>
                          <option value="languages">외국어·글로벌</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <button
                          type="submit"
                          className="w-full py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer"
                        >
                          + 추가
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <input
                          type="text"
                          placeholder="영문명 (선택, 예: SQL Developer (SQLD))"
                          value={newCert.enName}
                          onChange={(e) => setNewCert({ ...newCert, enName: e.target.value })}
                          className="w-full px-3 py-1.5 text-[11px] bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="일문명 (選択, 例: 社会調査分析士 2級)"
                          value={newCert.jaName}
                          onChange={(e) => setNewCert({ ...newCert, jaName: e.target.value })}
                          className="w-full px-3 py-1.5 text-[11px] bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
                        />
                      </div>
                    </div>
                  </form>

                  {/* Existing Certifications Rows */}
                  <div className="space-y-2.5">
                    {editData.certifications.map((cert, cIdx) => {
                      const staticCert =
                        certEditLang === 'ko'
                          ? undefined
                          : translations[certEditLang].skills.certifications.find((tc) => tc.id === cert.id);
                      const customCert =
                        certEditLang === 'ko' ? undefined : cert.translations?.[certEditLang];

                      return (
                        <div
                          key={cert.id}
                          className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center"
                        >
                          <div className="sm:col-span-1 flex items-center gap-0.5">
                            <button
                              type="button"
                              disabled={cIdx === 0}
                              onClick={() => moveCertification(cIdx, 'up')}
                              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="위로 이동"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={cIdx === editData.certifications.length - 1}
                              onClick={() => moveCertification(cIdx, 'down')}
                              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="아래로 이동"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="sm:col-span-4">
                            {certEditLang === 'ko' ? (
                              <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => {
                                  const updated = [...editData.certifications];
                                  updated[cIdx] = { ...updated[cIdx], name: e.target.value };
                                  setEditData({ ...editData, certifications: updated });
                                }}
                                className="w-full px-3 py-1.5 text-xs font-bold bg-slate-900 border border-slate-700 rounded text-white"
                              />
                            ) : (
                              <input
                                type="text"
                                placeholder={staticCert?.name || cert.name}
                                value={customCert?.name ?? ''}
                                onChange={(e) => {
                                  const langKey = certEditLang as 'en' | 'ja';
                                  const updated = [...editData.certifications];
                                  updated[cIdx] = {
                                    ...updated[cIdx],
                                    translations: {
                                      ...updated[cIdx].translations,
                                      [langKey]: {
                                        ...updated[cIdx].translations?.[langKey],
                                        name: e.target.value,
                                      },
                                    },
                                  };
                                  setEditData({ ...editData, certifications: updated });
                                }}
                                className="w-full px-3 py-1.5 text-xs font-bold bg-slate-900 border border-blue-500/40 rounded text-white"
                              />
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            {certEditLang === 'ko' ? (
                              <input
                                type="text"
                                value={cert.date}
                                onChange={(e) => {
                                  const updated = [...editData.certifications];
                                  updated[cIdx] = { ...updated[cIdx], date: e.target.value };
                                  setEditData({ ...editData, certifications: updated });
                                }}
                                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-200"
                              />
                            ) : (
                              <input
                                type="text"
                                placeholder={staticCert?.date || cert.date}
                                value={customCert?.date ?? ''}
                                onChange={(e) => {
                                  const langKey = certEditLang as 'en' | 'ja';
                                  const updated = [...editData.certifications];
                                  updated[cIdx] = {
                                    ...updated[cIdx],
                                    translations: {
                                      ...updated[cIdx].translations,
                                      [langKey]: {
                                        ...updated[cIdx].translations?.[langKey],
                                        date: e.target.value,
                                      },
                                    },
                                  };
                                  setEditData({ ...editData, certifications: updated });
                                }}
                                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-blue-500/40 rounded text-slate-200"
                              />
                            )}
                          </div>

                          <div className="sm:col-span-3">
                            <select
                              value={getCertificationSkillCategory(cert)}
                              onChange={(e) => {
                                const updated = [...editData.certifications];
                                updated[cIdx] = {
                                  ...updated[cIdx],
                                  skillCategoryId: e.target.value as SkillCompetencyId,
                                };
                                setEditData({ ...editData, certifications: updated });
                              }}
                              className="w-full px-2.5 py-1.5 text-[11px] bg-slate-900 border border-slate-700 rounded text-slate-200"
                              title="연결 역량 탭 선택"
                            >
                              <option value="data-tech">컴퓨터·직무 활용</option>
                              <option value="hr-domain">채용·급여 실무</option>
                              <option value="languages">외국어·글로벌</option>
                            </select>
                          </div>

                          <div className="sm:col-span-2 flex justify-end">
                            {confirmDeleteCertId === cert.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCertification(cert.id)}
                                  className="px-2 py-1 text-[11px] font-bold bg-red-600 hover:bg-red-500 text-white rounded-lg cursor-pointer"
                                >
                                  확인
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteCertId(null)}
                                  className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                                >
                                  취소
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteCertId(cert.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-400 hover:text-red-300 bg-red-950/50 hover:bg-red-950 border border-red-900/60 rounded-lg cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> 삭제
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 5: CONTACT INFO (No Street Address) */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">연락처 및 전환(CTA) 정보</h3>
                    <button
                      onClick={handleSave}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" /> 저장하기
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">이메일 주소</label>
                      <input
                        type="email"
                        value={editData.contact.email}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            contact: { ...editData.contact, email: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">전화번호</label>
                      <input
                        type="text"
                        value={editData.contact.phone}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            contact: { ...editData.contact, phone: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={editData.contact.linkedIn}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          contact: { ...editData.contact, linkedIn: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">클로징 헤드라인</label>
                    <input
                      type="text"
                      value={editData.contact.closingHeadline}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          contact: { ...editData.contact, closingHeadline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">클로징 서브 카피</label>
                    <textarea
                      rows={2}
                      value={editData.contact.closingSubcopy}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          contact: { ...editData.contact, closingSubcopy: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: RECEIVED INQUIRIES INBOX */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        수신된 커피챗 / 면접 제안 메시지함
                      </h3>
                      <p className="text-xs text-slate-400">
                        총 {inquiries.length}건의 제안 (미확인: {inquiries.filter((i) => !i.read).length}건)
                      </p>
                    </div>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      수신된 문의 내역이 없습니다.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className={`p-4 rounded-xl border transition-all ${
                            inq.read
                              ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                              : 'bg-slate-950 border-blue-600/80 text-white shadow-md'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">
                                {inq.name}
                              </span>
                              {inq.company && (
                                <span className="text-xs text-slate-400">
                                  ({inq.company})
                                </span>
                              )}
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                  inq.type === 'interview'
                                    ? 'bg-blue-900/60 text-blue-300 border border-blue-700'
                                    : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                                }`}
                              >
                                {inq.type === 'interview'
                                  ? '면접/채용 제안'
                                  : inq.type === 'coffee_chat'
                                  ? '커피챗'
                                  : '일반 문의'}
                              </span>
                            </div>

                            <span className="text-[11px] text-slate-500">
                              {new Date(inq.createdAt).toLocaleString('ko-KR')}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800/80 mb-3 whitespace-pre-wrap leading-relaxed">
                            {inq.message}
                          </p>

                          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                            <div className="flex items-center gap-4">
                              <span>이메일: <strong className="text-white">{inq.email}</strong></span>
                              {inq.phone && <span>연락처: <strong className="text-white">{inq.phone}</strong></span>}
                            </div>

                            <div className="flex items-center gap-2">
                              <a
                                href={`mailto:${inq.email}?subject=[회신] ${editData.hero.name} HR 스페셜리스트 - 제안에 감사드립니다`}
                                className="px-2.5 py-1 text-[11px] font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
                              >
                                이메일 회신
                              </a>
                              <button
                                onClick={() => markInquiryRead(inq.id, !inq.read)}
                                className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                              >
                                {inq.read ? '안읽음 처리' : '읽음 표시'}
                              </button>
                              {confirmDeleteInqId === inq.id ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      deleteInquiry(inq.id);
                                      setConfirmDeleteInqId(null);
                                      triggerToast('문의가 삭제되었습니다.');
                                    }}
                                    className="px-2 py-1 text-[11px] font-bold bg-red-600 hover:bg-red-500 text-white rounded cursor-pointer"
                                  >
                                    삭제 확인
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteInqId(null)}
                                    className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                                  >
                                    취소
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteInqId(inq.id)}
                                  className="p-1 text-slate-500 hover:text-red-400 cursor-pointer"
                                  title="삭제"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: SETTINGS & BACKUP */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-white">포트폴리오 설정 및 데이터 백업·복원</h3>

                  <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                    <div className="text-xs font-bold text-slate-300">
                      JSON 데이터 백업 다운로드 및 파일 복원
                    </div>
                    <p className="text-xs text-slate-400">
                      수정·추가·업로드된 모든 포트폴리오 데이터와 이미지를 JSON 파일로 저장하거나 다른 기기에서 불러와 즉시 복원할 수 있습니다.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={handleExportJSON}
                        className="px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-blue-400" />
                        <span>포트폴리오 백업 JSON 내보내기</span>
                      </button>

                      <label className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>백업 JSON 파일 불러오기</span>
                        <input
                          type="file"
                          accept=".json,application/json"
                          className="hidden"
                          onChange={handleImportJSON}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="p-5 bg-slate-950 border border-red-900/50 rounded-xl space-y-3">
                    <div className="text-xs font-bold text-red-400">
                      기본 데이터로 전체 복원 (초기화)
                    </div>
                    <p className="text-xs text-slate-400">
                      직접 추가·수정한 내용을 지우고 최신 채용·급여 실무 기본 데이터로 되돌립니다.
                      {isCloudAdmin && ' (확인 즉시 실시간 웹 DB에도 자동 반영됩니다)'}
                    </p>
                    {confirmReset ? (
                      <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800/80 space-y-3">
                        <div className="text-xs font-semibold text-red-200">
                          정말 최신 기본 데이터로 초기화하시겠습니까? (기존 수정 내역이 대체됩니다)
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            disabled={isResetting}
                            onClick={handleConfirmReset}
                            className="px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white rounded-lg flex items-center gap-1.5 cursor-pointer"
                          >
                            {isResetting ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <RotateCcw className="w-3.5 h-3.5" />
                            )}
                            <span>{isResetting ? '복원 및 DB 반영 중...' : '예, 지금 기본 데이터로 복원'}</span>
                          </button>
                          <button
                            type="button"
                            disabled={isResetting}
                            onClick={() => setConfirmReset(false)}
                            className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmReset(true)}
                        className="px-4 py-2 text-xs font-bold bg-red-950 hover:bg-red-900 border border-red-800 text-red-200 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>기본 데이터로 전체 복원 (초기화)</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
