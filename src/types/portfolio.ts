export interface LocalizedProjectFields {
  title?: string;
  subtitle?: string;
  role?: string;
  period?: string;
  overview?: string;
  situation?: string;
  task?: string;
  action?: string[];
  result?: string[];
  tags?: string[];
  skills?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  category: 'leadership' | 'internship' | 'project' | 'global' | 'special';
  tags: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  situation: string;
  task: string;
  action: string[];
  result: string[];
  skills: string[];
  imageUrl?: string;
  featured?: boolean;
  translations?: {
    en?: LocalizedProjectFields;
    ja?: LocalizedProjectFields;
  };
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    description: string;
    badge?: string;
  }[];
}

export interface LocalizedCertFields {
  name?: string;
  date?: string;
}

export type SkillCompetencyId = 'data-tech' | 'hr-domain' | 'languages';

export interface CertificationItem {
  id: string;
  name: string;
  issuer?: string;
  date: string;
  score?: string;
  category: 'cert' | 'lang' | 'edu';
  skillCategoryId?: SkillCompetencyId;
  translations?: {
    en?: LocalizedCertFields;
    ja?: LocalizedCertFields;
  };
}

export interface EducationItem {
  id: string;
  school: string;
  major: string;
  period: string;
  status: string;
  gpa?: string;
  note?: string;
}

export interface InquiryMessage {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  type: 'interview' | 'coffee_chat' | 'project' | 'other';
  message: string;
  createdAt: string;
  read: boolean;
}

export interface LocalizedHeroFields {
  badge?: string;
  role?: string;
  mainHeadline?: string;
  subHeadline?: string;
  status?: string;
}

export interface PortfolioData {
  hero: {
    badge: string;
    name: string;
    englishName: string;
    birthDate: string;
    role: string;
    mainHeadline: string;
    subHeadline: string;
    profileImage: string;
    status: string;
    location: string;
    highlightPillars: {
      number: string;
      title: string;
      summary: string;
    }[];
    translations?: {
      en?: LocalizedHeroFields;
      ja?: LocalizedHeroFields;
    };
  };
  about: {
    title: string;
    subtitle: string;
    bioParagraphs: string[];
    coreValues: {
      id: string;
      title: string;
      englishTitle: string;
      tagline: string;
      description: string;
      bulletPoints: string[];
      iconName: string;
    }[];
  };
  education: EducationItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  certifications: CertificationItem[];
  contact: {
    closingHeadline: string;
    closingSubcopy: string;
    email: string;
    phone: string;
    linkedIn: string;
    location: string;
    availableStatus: string;
  };
}
