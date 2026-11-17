import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { PortfolioData, ProjectItem, InquiryMessage } from '../types/portfolio';

export const ADMIN_EMAIL = 'gayeon11267@gmail.com';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'portfolio', 'main'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
void testConnection();

/** Strip undefined values recursively on plain objects/arrays without touching Firestore FieldValue sentinels */
function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => stripUndefined(item)) as unknown as T;
  }
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v !== undefined) {
        out[k] = stripUndefined(v);
      }
    }
    return out as T;
  }
  return value;
}

function sanitizeId(rawId: string, fallbackPrefix = 'item'): string {
  const cleaned = rawId.replace(/[^a-zA-Z0-9_\-]/g, '-').slice(0, 120);
  return cleaned.length > 0 ? cleaned : `${fallbackPrefix}-${Date.now()}`;
}

function clampString(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val.slice(0, maxLen);
}

function clampStringArray(arr: unknown, maxItems: number, maxItemLen = 1000): string[] {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter((x): x is string => typeof x === 'string')
    .slice(0, maxItems)
    .map((s) => s.slice(0, maxItemLen));
}

export function buildProjectPayload(item: ProjectItem, orderIndex: number) {
  const safeId = sanitizeId(item.id, 'proj');
  const safeCategory: ProjectItem['category'] = ['leadership', 'internship', 'project', 'global', 'special'].includes(
    item.category
  )
    ? item.category
    : 'project';

  const payload: Record<string, unknown> = {
    id: safeId,
    orderIndex: Math.max(0, Math.min(10000, Math.floor(orderIndex))),
    title: clampString(item.title, 300) || 'Untitled',
    subtitle: clampString(item.subtitle, 500),
    role: clampString(item.role, 300),
    period: clampString(item.period, 120),
    category: safeCategory,
    tags: clampStringArray(item.tags, 20, 80),
    metrics: Array.isArray(item.metrics)
      ? item.metrics.slice(0, 10).map((m) => ({
          label: clampString(m?.label, 100),
          value: clampString(m?.value, 100),
        }))
      : [],
    overview: clampString(item.overview, 3000),
    situation: clampString(item.situation, 3000),
    task: clampString(item.task, 3000),
    action: clampStringArray(item.action, 30, 800),
    result: clampStringArray(item.result, 30, 800),
    skills: clampStringArray(item.skills, 30, 120),
    featured: item.featured !== false,
    updatedAt: serverTimestamp(),
  };

  if (typeof item.imageUrl === 'string' && item.imageUrl.trim().length > 0) {
    payload.imageUrl = item.imageUrl.slice(0, 400000);
  }

  if (item.translations && typeof item.translations === 'object') {
    payload.translations = stripUndefined(item.translations);
  }

  return { safeId, payload };
}

export async function publishPortfolioToCloud(data: PortfolioData, uid: string): Promise<void> {
  const configPath = 'portfolio/main';
  const projectsPath = 'portfolio_projects';

  try {
    const existingSnapshot = await getDocs(collection(db, projectsPath));
    const batch = writeBatch(db);

    const nextIds = new Set<string>();

    data.projects.forEach((proj, idx) => {
      const { safeId, payload } = buildProjectPayload(proj, idx);
      nextIds.add(safeId);
      batch.set(doc(db, projectsPath, safeId), payload);
    });

    existingSnapshot.docs.forEach((docSnap) => {
      if (!nextIds.has(docSnap.id)) {
        batch.delete(doc(db, projectsPath, docSnap.id));
      }
    });

    const sanitizedConfig = stripUndefined({
      hero: {
        ...data.hero,
        profileImage: clampString(data.hero.profileImage, 400000),
      },
      about: data.about,
      education: Array.isArray(data.education) ? data.education.slice(0, 30) : [],
      skillCategories: Array.isArray(data.skillCategories) ? data.skillCategories.slice(0, 20) : [],
      certifications: Array.isArray(data.certifications) ? data.certifications.slice(0, 80) : [],
      contact: data.contact,
      updatedBy: uid,
    });

    const configPayload = {
      ...sanitizedConfig,
      updatedAt: serverTimestamp(),
    };

    batch.set(doc(db, 'portfolio', 'main'), configPayload);
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, configPath);
  }
}

export async function submitInquiryToCloud(
  inquiry: Omit<InquiryMessage, 'id' | 'createdAt' | 'read'>
): Promise<string> {
  const inquiryId = sanitizeId(`inq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, 'inq');
  const docPath = `inquiries/${inquiryId}`;

  const safeType: InquiryMessage['type'] = ['interview', 'coffee_chat', 'project', 'other'].includes(inquiry.type)
    ? inquiry.type
    : 'other';

  const payload: Record<string, unknown> = {
    name: clampString(inquiry.name.trim(), 120) || '익명',
    company: clampString((inquiry.company || '').trim(), 160),
    email: clampString(inquiry.email.trim(), 200),
    type: safeType,
    message: clampString(inquiry.message.trim(), 4000),
    read: false,
    createdAt: serverTimestamp(),
  };

  if (inquiry.phone && inquiry.phone.trim()) {
    payload.phone = clampString(inquiry.phone.trim(), 50);
  }

  try {
    await setDoc(doc(db, 'inquiries', inquiryId), payload);
    return inquiryId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, docPath);
  }
}

export async function updateInquiryReadInCloud(id: string, read: boolean): Promise<void> {
  const safeId = sanitizeId(id, 'inq');
  const docPath = `inquiries/${safeId}`;
  try {
    await updateDoc(doc(db, 'inquiries', safeId), { read });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

export async function deleteInquiryInCloud(id: string): Promise<void> {
  const safeId = sanitizeId(id, 'inq');
  const docPath = `inquiries/${safeId}`;
  try {
    await deleteDoc(doc(db, 'inquiries', safeId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}
