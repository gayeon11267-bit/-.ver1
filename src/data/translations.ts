import { ProjectItem, SkillCategory, CertificationItem, EducationItem } from '../types/portfolio';
import { defaultPortfolioData } from './defaultPortfolio';

export type Language = 'ko' | 'en' | 'ja';

export interface Translations {
  nav: {
    home: string;
    about: string;
    internships: string;
    projects: string;
    skills: string;
    contact: string;
    resume: string;
    propose: string;
    copyUrl: string;
    copiedUrl: string;
    admin: string;
    linkedin: string;
  };
  hero: {
    badge: string;
    name: string;
    englishName: string;
    role: string;
    mainHeadline: string;
    subHeadline: string;
    status: string;
    location: string;
    kpis: {
      kpi1Value: string;
      kpi1Title: string;
      kpi1Desc: string;
      kpi2Value: string;
      kpi2Title: string;
      kpi2Desc: string;
      kpi3Value: string;
      kpi3Title: string;
      kpi3Desc: string;
    };
    ctaResume: string;
    ctaInternships: string;
    ctaProjects: string;
    ctaContact: string;
    candidateCardRole: string;
    candidateCardStatus: string;
    pillar01Title: string;
    pillar01Desc: string;
    pillar02Title: string;
    pillar02Desc: string;
    pillar03Title: string;
    pillar03Desc: string;
  };
  home: {
    portalKicker: string;
    portalTitle: string;
    portalDesc: string;
    portalAboutTitle: string;
    portalAboutDesc: string;
    portalInternshipsTitle: string;
    portalInternshipsDesc: string;
    portalProjectsTitle: string;
    portalProjectsDesc: string;
    portalSkillsTitle: string;
    portalSkillsDesc: string;
    portalContactTitle: string;
    portalContactDesc: string;
    openPage: string;
    featuredKicker: string;
    featuredTitle: string;
    featuredInternshipsKicker: string;
    featuredInternshipsTitle: string;
    viewAllInternships: string;
    featuredProjectsKicker: string;
    featuredProjectsTitle: string;
    viewAllProjects: string;
    starModalBtn: string;
    ctaBannerTitle: string;
    ctaBannerDesc: string;
    ctaBannerBtn: string;
    ctaBannerEmail: string;
  };
  about: {
    dedicatedTag: string;
    pageTitle: string;
    pageSubtitle: string;
    statementKicker: string;
    statementTitle: string;
    bioParagraphs: string[];
    summaryKicker: string;
    candidateNameLabel: string;
    birthDateLabel: string;
    birthDateValue: string;
    positionLabel: string;
    positionValue: string;
    toolsLabel: string;
    toolsValue: string;
    globalLabel: string;
    globalValue: string;
    degreeLabel: string;
    degreeValue: string;
    whyHireKicker: string;
    whyHireTitle: string;
    whyHireDesc: string;
    evidenceKicker: string;
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
  internships: {
    dedicatedTag: string;
    pageTitle: string;
    pageSubtitle: string;
    casePrefix: string;
    outcomesTitle: string;
    starBtn: string;
    emptyText: string;
  };
  projects: {
    dedicatedTag: string;
    pageTitle: string;
    pageSubtitle: string;
    catAll: string;
    catInternship: string;
    catLeadership: string;
    catProject: string;
    catGlobal: string;
    outcomesTitle: string;
    starBtn: string;
    projectList: ProjectItem[];
  };
  projectModal: {
    overviewTitle: string;
    starTitle: string;
    situationTitle: string;
    taskTitle: string;
    actionTitle: string;
    resultTitle: string;
    appliedSkillsTitle: string;
    closeBtn: string;
  };
  skills: {
    dedicatedTag: string;
    pageTitle: string;
    pageSubtitle: string;
    tabData: string;
    tabHR: string;
    tabLang: string;
    simulatorKicker: string;
    simulatorTitle: string;
    simulatorDesc: string;
    simPayroll: string;
    simTax: string;
    simRecruiting: string;
    simPayrollFormula: string;
    simPayrollInput1: string;
    simPayrollInput2: string;
    simPayrollPension: string;
    simPayrollHealth: string;
    simPayrollEmployment: string;
    simPayrollTotalDed: string;
    simPayrollNetBeforeTax: string;
    simPayrollNote: string;
    simPayrollTaxBaseLabel: string;
    simTaxFormula: string;
    simTaxInput1: string;
    simTaxInput2: string;
    simTaxResult: string;
    simTaxNote: string;
    simTaxUnit: string;
    simTaxThresholdText: string;
    simRecruitFormula: string;
    simRecruitInput1: string;
    simRecruitInput2: string;
    simRecruitInput3: string;
    simRecruitResult1: string;
    simRecruitResult2: string;
    simRecruitNote: string;
    simRecruitHigh: string;
    simRecruitLow: string;
    certsTitle: string;
    matchedCertsLabel: string;
    matchedCertsEmpty: string;
    matchedCertsCountSuffix: string;
    eduTitle: string;
    education: EducationItem[];
    skillCategories: SkillCategory[];
    certifications: CertificationItem[];
    readinessLabel: string;
    readinessValue: string;
    issuerLabel: string;
  };
  contact: {
    dedicatedTag: string;
    pageTitle: string;
    pageSubtitle: string;
    directKicker: string;
    directTitle: string;
    emailLabel: string;
    phoneLabel: string;
    writeEmailBtn: string;
    locationValue: string;
    statusValue: string;
    formKicker: string;
    formTitle: string;
    formDesc: string;
    fieldName: string;
    fieldCompany: string;
    fieldEmail: string;
    fieldPhone: string;
    fieldType: string;
    typeInterview: string;
    typeCoffeeChat: string;
    typeProject: string;
    typeOther: string;
    fieldMessage: string;
    formNotice: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    additionalBtn: string;
    directMailBtn: string;
    closingSubcopy: string;
    placeholderName: string;
    placeholderCompany: string;
    placeholderPhone: string;
    placeholderMessage: string;
    copyEmailTitle: string;
    openProfileBtn: string;
  };
  resume: {
    title: string;
    printBtn: string;
    badge: string;
    summaryTitle: string;
    competenciesTitle: string;
    educationTitle: string;
    internshipsTitle: string;
    experiencesTitle: string;
    techSkillsTitle: string;
    certsTitle: string;
    outcomesHeader: string;
    emailLabel: string;
    phoneLabel: string;
    birthDateLabel: string;
    locationLabel: string;
    fileName: string;
    qrLabel: string;
    focusLabel: string;
    focusBalanced: string;
    focusHrm: string;
    focusHrd: string;
    focusGlobal: string;
    printTip: string;
    compactToggle: string;
    qrToggle: string;
    fileLangLabel: string;
  };
  transcriptModal: {
    badge: string;
    title: string;
    subtitle: string;
    institution: string;
    period: string;
    tabAll: string;
    tabCert: string;
    tabJaTranscript: string;
    tabEnTranscript: string;
    summaryUnits: string;
    summaryGrades: string;
    summaryStatus: string;
    downloadBtn: string;
    openNewTabBtn: string;
    closeBtn: string;
    fileName: string;
    viewTranscriptBtn: string;
    viewCredentialBtn: string;
    docNotice: string;
    docPagesSummary: string;
  };
}

export const translations: Record<Language, Translations> = {
  ko: {
    nav: {
      home: '홈',
      about: '소개·가치관',
      internships: '인턴십',
      projects: '프로젝트',
      skills: '스킬·자격',
      contact: '문의·커피챗',
      resume: '이력서 열람',
      propose: '면접 / 커피챗 제안',
      copyUrl: '주소 복사',
      copiedUrl: '주소 복사됨!',
      admin: '관리자',
      linkedin: 'LinkedIn',
    },
    hero: {
      badge: defaultPortfolioData.hero.badge,
      name: defaultPortfolioData.hero.name,
      englishName: defaultPortfolioData.hero.englishName,
      role: defaultPortfolioData.hero.role,
      mainHeadline: defaultPortfolioData.hero.mainHeadline,
      subHeadline: defaultPortfolioData.hero.subHeadline,
      status: defaultPortfolioData.hero.status,
      location: '',
      kpis: {
        kpi1Value: '4.13/4.5',
        kpi1Title: '건국대 경영학과',
        kpi1Desc: '학업 성실성 & 일본 교환학생(3.625/4.0)',
        kpi2Value: '2회 수료',
        kpi2Title: '실무 인턴십 검증',
        kpi2Desc: '(주)월급날 연말정산팀 · FNC엔터테인먼트',
        kpi3Value: 'N1 / IH',
        kpi3Title: '급여·데이터·어학',
        kpi3Desc: '연말정산2급 · 컴활2급 · GA4 · JLPT N1 · OPIc IH',
      },
      ctaResume: '이력서 열람 / PDF 다운로드',
      ctaInternships: '인턴십 경험 보기',
      ctaProjects: '주요 프로젝트 보기',
      ctaContact: '면접 / 커피챗 제안하기 →',
      candidateCardRole: '신입 HR · 채용 · 급여/연말정산 실무',
      candidateCardStatus: '신입 지원 중',
      pillar01Title: defaultPortfolioData.hero.highlightPillars[0].title,
      pillar01Desc: defaultPortfolioData.hero.highlightPillars[0].summary,
      pillar02Title: defaultPortfolioData.hero.highlightPillars[1].title,
      pillar02Desc: defaultPortfolioData.hero.highlightPillars[1].summary,
      pillar03Title: defaultPortfolioData.hero.highlightPillars[2].title,
      pillar03Desc: defaultPortfolioData.hero.highlightPillars[2].summary,
    },
    home: {
      portalKicker: 'PORTFOLIO SECTIONS',
      portalTitle: '원하시는 영역의 전용 페이지로 바로 이동하세요',
      portalDesc:
        '채용·급여 실무를 지향하는 신입 지원자 이가연(LEE GAYEON)의 소개·학력, 인턴십 현장 경험, 프로젝트, 직무능력 및 자격증을 독립 페이지에서 확인하실 수 있습니다.',
      portalAboutTitle: '소개 & 학력·가치관',
      portalAboutDesc: '건국대 경영학과(4.13/4.5), 서류·숫자 검증의 꼼꼼함 및 현장 소통력.',
      portalInternshipsTitle: '인턴십 경험',
      portalInternshipsDesc: '(주)월급날 연말정산팀 현장실습 & FNC엔터테인먼트 인턴십.',
      portalProjectsTitle: '주요 프로젝트 · 학회',
      portalProjectsDesc: 'KU-PITAL 인사학회 운영진, 가나가와대 교환학생 & 현장 운영 활동.',
      portalSkillsTitle: '스킬 & 자격·학력',
      portalSkillsDesc: 'Excel·GA4·노션·한글 실무 활용능력, 연말정산 2급 등 공인 자격증.',
      portalContactTitle: '문의 & 커피챗 제안',
      portalContactDesc: '채용·급여/인사운영 신입 채용 면접, 인턴십 및 직무 커피챗 제안 페이지.',
      openPage: '전용 페이지 열기',
      featuredKicker: 'KEY HIGHLIGHTS',
      featuredTitle: '인턴십 현장과 학회·프로젝트로 검증된 HR 실무 기본기',
      featuredInternshipsKicker: 'PART 01 · INTERNSHIP EXPERIENCE',
      featuredInternshipsTitle: '기업 실무 인턴십 경험',
      viewAllInternships: '인턴십 전용 페이지 보기',
      featuredProjectsKicker: 'PART 02 · PROJECTS & ACTIVITIES',
      featuredProjectsTitle: '학회 · 글로벌 교환학생 · 주요 프로젝트',
      viewAllProjects: '프로젝트 전용 페이지 보기',
      starModalBtn: 'STAR 상세 보기',
      ctaBannerTitle: '꼼꼼한 손발로 현장을 지키는 신입 HR 이가연과 함께하세요.',
      ctaBannerDesc:
        '채용 일정 조율·후보자 안내부터 급여·연말정산 서류 검증까지, 현장에서 바로 제 몫을 해내겠습니다. 면접이나 가벼운 커피챗 제안을 환영합니다.',
      ctaBannerBtn: '문의 & 커피챗 전용 페이지 이동',
      ctaBannerEmail: '직접 이메일 발송',
    },
    about: {
      dedicatedTag: '01. ABOUT & CORE VALUES',
      pageTitle: '소개 & 핵심 가치관',
      pageSubtitle: defaultPortfolioData.about.subtitle,
      statementKicker: 'CANDIDATE STATEMENT',
      statementTitle: '"꼼꼼한 서류 확인과 정확한 숫자로, 사람과 현장의 신뢰를 쌓습니다."',
      bioParagraphs: defaultPortfolioData.about.bioParagraphs,
      summaryKicker: 'CANDIDATE SUMMARY',
      candidateNameLabel: '지원자명',
      birthDateLabel: '생년월일 / 연령',
      birthDateValue: '2003년 11월 26일 (만 22세)',
      positionLabel: '희망 직무',
      positionValue: '신입 HR · 채용 운영 · 급여/연말정산 실무',
      toolsLabel: '핵심 실무 도구',
      toolsValue: 'Excel(상), Google Sheets, GA4, Notion, Word/한글, PPT',
      globalLabel: '어학 능력',
      globalValue: '일본어 JLPT N1 (110점) · 영어 OPIc IH',
      degreeLabel: '전공 학력',
      degreeValue: '건국대학교 경영학과 4학년 (4.13/4.5 · 2027.02 졸업예정)',
      whyHireKicker: 'CORE VALUE PILLARS',
      whyHireTitle: '채용·급여 실무 신입으로 이가연이 준비된 이유',
      whyHireDesc: '현장에 투입되었을 때 빠르고 정확하게 손발 역할을 해낼 수 있는 3가지 근거입니다.',
      evidenceKicker: '입증된 경험 & 실행 사례',
      coreValues: defaultPortfolioData.about.coreValues,
    },
    internships: {
      dedicatedTag: '02. INTERNSHIP EXPERIENCE',
      pageTitle: '인턴십 경험 (실무 경력)',
      pageSubtitle:
        '(주)월급날 연말정산팀 현장실습 인턴과 FNC엔터테인먼트 전략기획팀 미래내일 일경험 인턴십 상세 내역입니다.',
      casePrefix: 'INTERNSHIP 0',
      outcomesTitle: '주요 실무 업무 및 성과',
      starBtn: 'STAR 상세 분석 보기',
      emptyText: '등록된 인턴십 경험이 없습니다. 관리자 모드에서 추가할 수 있습니다.',
    },
    projects: {
      dedicatedTag: '03. PROJECTS & ACTIVITIES',
      pageTitle: '주요 프로젝트 & 활동',
      pageSubtitle:
        '교내 인사학회 KU-PITAL 창립·운영, 일본 가나가와대 교환학생 & 글로벌 특파원 30기, 정책기획·CRM 공모전 활동입니다.',
      catAll: '전체 프로젝트·활동',
      catInternship: '인턴 경험',
      catLeadership: '학회 · 리더십',
      catProject: '프로젝트 · 대외활동',
      catGlobal: '해외연수 · 글로벌',
      outcomesTitle: '주요 활동 및 검증된 성과',
      starBtn: 'STAR 상세 분석 보기',
      projectList: defaultPortfolioData.projects,
    },
    projectModal: {
      overviewTitle: 'PROJECT OVERVIEW (개요)',
      starTitle: 'STAR METHODOLOGY DEEP-DIVE',
      situationTitle: 'SITUATION (배경 및 문제 인식)',
      taskTitle: 'TASK (해결 과제 및 목표)',
      actionTitle: 'ACTION (구체적 실행 내역)',
      resultTitle: 'RESULT (주요 성과)',
      appliedSkillsTitle: 'APPLIED SKILLS (활용 역량):',
      closeBtn: '닫기',
    },
    skills: {
      dedicatedTag: '03. SKILLS, EDUCATION & CERTIFICATIONS',
      pageTitle: '직무능력 · 학력 & 자격사항',
      pageSubtitle: '공인 자격증과 현장 인턴십을 통해 검증된 급여·연말정산, 채용 일정 관리 및 데이터 처리 역량입니다.',
      tabData: '컴퓨터·직무 활용능력',
      tabHR: '채용·급여 실무 역량',
      tabLang: '외국어·글로벌 역량',
      simulatorKicker: 'RECRUITING & PAYROLL PRACTICE WORKBENCH',
      simulatorTitle: '채용 · 급여 현장 실무 계산기 (인터랙티브 체크)',
      simulatorDesc:
        '월 급여 4대보험 공제 계산, 연말정산 신용카드 공제, 채용 서류·면접 참석률 등 현장 실무 기본기를 직접 확인해 보실 수 있습니다.',
      simPayroll: '월 급여 4대보험 계산',
      simTax: '연말정산 공제 계산',
      simRecruiting: '채용·면접 참석률 체크',
      simPayrollFormula: '과세급여(월 급여 - 비과세 식대) 기준 근로자 부담분 4대보험 공제 산출',
      simPayrollInput1: '월 급여액 (만원)',
      simPayrollInput2: '비과세 식대 (만원 · 최대 20)',
      simPayrollPension: '국민연금 (4.5%)',
      simPayrollHealth: '건강·장기요양보험',
      simPayrollEmployment: '고용보험 (0.9%)',
      simPayrollTotalDed: '4대보험 공제 합계',
      simPayrollNetBeforeTax: '4대보험 차감 후 지급액 (소득세 제외)',
      simPayrollNote: '* 급여 명세서 검증 시 비과세 식대(월 20만 원 한도) 분리 여부와 10원 미만 절사 기준을 꼼꼼히 대조합니다.',
      simPayrollTaxBaseLabel: '과세 대상 급여 기준:',
      simTaxFormula: '연말정산 신용카드 등 사용금액 소득공제 (총급여 25% 초과분의 15%)',
      simTaxInput1: '총 급여액 (만원)',
      simTaxInput2: '신용카드 사용액 (만원)',
      simTaxResult: '예상 소득공제 대상액',
      simTaxNote: '* (주)월급날 연말정산팀 인턴십 및 연말정산 실무자 2급 자격을 통해 공제 검증 체계를 익혔습니다.',
      simTaxUnit: '만원',
      simTaxThresholdText: '공제 문턱 기준선(25%): 총급여의 25% 초과 사용분 적용',
      simRecruitFormula: '채용 전형별 전환율 및 면접 참석률(No-Show 예방) 트래킹',
      simRecruitInput1: '총 지원자 수 (명)',
      simRecruitInput2: '서류 합격·면접 안내 (명)',
      simRecruitInput3: '실제 면접 참석 (명)',
      simRecruitResult1: '서류 통과율',
      simRecruitResult2: '면접 참석률',
      simRecruitNote: '* 채용 운영 시 서류 합격 안내 직후 일정 확정 회신 확인 및 면접 D-1 리마인드 연락으로 노쇼를 최소화합니다.',
      simRecruitHigh: '안정적인 면접 참석 관리 수준 (D-1 안내 효과적)',
      simRecruitLow: '일정 재확인 및 면접 전날 리마인드 연락 강화 권장',
      certsTitle: '자격 및 면허취득 사항 (자격증명 · 취득일)',
      matchedCertsLabel: '해당 역량 보유 자격증',
      matchedCertsEmpty: '해당 역량에 연결된 자격증이 아직 없습니다.',
      matchedCertsCountSuffix: '건',
      eduTitle: '학력 및 해외연수 사항',
      readinessLabel: '실무 투입도:',
      readinessValue: '기본기 완비 · 현장 실무 검증 완료',
      issuerLabel: '취득일:',
      education: defaultPortfolioData.education,
      skillCategories: defaultPortfolioData.skillCategories,
      certifications: defaultPortfolioData.certifications,
    },
    contact: {
      dedicatedTag: '04. CONTACT & PROPOSAL',
      pageTitle: '문의 및 커피챗 제안',
      pageSubtitle: '채용 일정 조율과 급여·연말정산 서류 검증을 꼼꼼히 챙길 신입을 찾고 계신가요?',
      directKicker: 'REACH OUT DIRECTLY',
      directTitle: '신입 HR(채용·급여 실무) 이가연에게 직접 연락하기',
      emailLabel: '이메일 (E-mail)',
      phoneLabel: '휴대폰 (Mobile)',
      writeEmailBtn: '메일 작성',
      locationValue: '건국대학교 경영학과 (4학년 재학 · 2027.02 졸업예정)',
      statusValue: '채용·급여 실무 신입 정규직 / 채용연계형 인턴 지원 중',
      formKicker: 'INSTANT PROPOSAL FORM',
      formTitle: '면접 / 커피챗 제안서 작성',
      formDesc: '별도의 이메일 프로그램을 띄우지 않고, 본 페이지에서 바로 제안을 전달하실 수 있습니다.',
      fieldName: '담당자 성함 / 직함',
      fieldCompany: '회사명 / 소속 부서',
      fieldEmail: '회신받으실 이메일',
      fieldPhone: '전화번호 (선택)',
      fieldType: '제안 유형 선택',
      typeInterview: '신입 채용 / 면접',
      typeCoffeeChat: '캐주얼 커피챗',
      typeProject: '채용 연계형 인턴',
      typeOther: '기타 직무 문의',
      fieldMessage: '제안 내용 및 메시지',
      formNotice: '* 제출 시 관리자 확인 메시지함에 실시간 등록됩니다.',
      submitBtn: '제안서 전송하기',
      successTitle: '제안이 성공적으로 전달되었습니다!',
      successDesc:
        '이가연(LEE GAYEON) 수신함에 정상 접수되었습니다. 기재해주신 이메일 또는 연락처로 신속히 답변드리겠습니다.',
      additionalBtn: '추가 제안 작성하기',
      directMailBtn: '직접 이메일 발송하기',
      closingSubcopy:
        '채용 일정 조율·후보자 응대부터 급여·연말정산 자료 검증 및 마감까지, 현장에서 팀의 든든한 손발이 되어 정확하게 완수하겠습니다. 정규직 채용, 채용 연계형 인턴, 직무 커피챗 모두 환영합니다.',
      placeholderName: '홍길동 / 인사팀 담당자',
      placeholderCompany: '회사명 / 소속 부서',
      placeholderPhone: '010-0000-0000',
      placeholderMessage: '포지션, 팀 소개, 미팅 희망 일정 등을 자유롭게 적어주세요.',
      copyEmailTitle: '이메일 주소 복사',
      openProfileBtn: '프로필 열기 →',
    },
    resume: {
      title: 'LEE GAYEON (이가연) | 신입 HR · 채용·급여 실무 이력서',
      printBtn: '인쇄 / PDF 저장',
      badge: 'ENTRY-LEVEL HR · 채용 · 급여/연말정산 실무 지원자',
      summaryTitle: 'PROFESSIONAL SUMMARY (전문 요약)',
      competenciesTitle: 'CORE COMPETENCIES (핵심 역량)',
      educationTitle: 'EDUCATION & EXCHANGE (학력 및 해외연수)',
      internshipsTitle: 'INTERNSHIP EXPERIENCE (인턴십 경력)',
      experiencesTitle: 'PROJECTS & ACTIVITIES (학회 · 교환학생 · 프로젝트)',
      techSkillsTitle: 'SKILLS & TOOLS (직무능력 및 활용 프로그램)',
      certsTitle: 'CERTIFICATIONS & LANGUAGES (자격증 및 어학)',
      outcomesHeader: '주요 업무 및 성과:',
      emailLabel: 'E-mail:',
      phoneLabel: '휴대폰:',
      birthDateLabel: '생년월일:',
      locationLabel: '학적:',
      fileName: '이가연_이력서_신입HR_채용급여',
      qrLabel: '웹 포트폴리오 바로가기',
      focusLabel: '지원 직무 포커스',
      focusBalanced: '전체 균형',
      focusHrm: '채용 · 급여/HRM',
      focusHrd: 'HRD · 교육운영',
      focusGlobal: '글로벌 · 일본사업',
      printTip: '인쇄 창에서 대상을 "PDF로 저장"으로 선택하면 위 파일명(.pdf)으로 자동 저장됩니다.',
      compactToggle: '핵심 요약 모드',
      qrToggle: 'QR 코드',
      fileLangLabel: '저장 파일명',
    },
    transcriptModal: {
      badge: 'OFFICIAL ACADEMIC CREDENTIAL',
      title: '가나가와 대학교 교환학생 공식 성적증명서 및 수료증',
      subtitle: '일본 현지 파견 교환학생(2024.03~2024.08) 16학점 전 과목 秀(S)/優(A) · 3.625/4.0 이수 증빙',
      institution: '일본 가나가와 대학교 (Kanagawa University, Japan)',
      period: '2024년 3월 ~ 2024년 8월 (24.03.18 ~ 24.08.07 수료)',
      tabAll: '전체 서류 열람',
      tabCert: '01. 수료증 (修了証書)',
      tabJaTranscript: '02. 일문 성적증명서 (学業成績証明書)',
      tabEnTranscript: '03. 영문 성적표 (Transcript of Record)',
      summaryUnits: '16 / 16 학점 (평점 3.625/4.0)',
      summaryGrades: '秀(S) 6과목 · 優(A) 3과목',
      summaryStatus: '최우수 성적 이수 (무낙제)',
      downloadBtn: '통합본 PDF 전체 다운로드',
      openNewTabBtn: '새 탭에서 열기 & 인쇄/저장',
      closeBtn: '닫기',
      fileName: '이가연_가나가와대_교환학생_성적증명서_및_수료증.pdf',
      viewTranscriptBtn: '공식 성적표 & 수료증 원본 확인',
      viewCredentialBtn: '공식 증빙 서류 확인',
      docNotice: '공식 증빙 서류 통합본 (수료증서 + 일문 성적증명서 + 영문 성적표 총 3페이지)',
      docPagesSummary: '1P 수료증서 (修了証書) · 2P 일문 학업성적증명서 · 3P 영문 성적표 (Transcript of Record)',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      internships: 'Internships',
      projects: 'Projects',
      skills: 'Skills & Certs',
      contact: 'Contact',
      resume: 'View Resume',
      propose: 'Propose Interview',
      copyUrl: 'Copy Link',
      copiedUrl: 'Copied!',
      admin: 'Admin',
      linkedin: 'LinkedIn',
    },
    hero: {
      badge: 'Entry-Level HR · Recruiting & Payroll Practice',
      name: 'Gayeon Lee',
      englishName: 'LEE GAYEON',
      role: 'Entry-Level HR Associate Focused on Recruiting Operations & Payroll',
      mainHeadline: 'Verifying every detail accurately,\nSupporting people on the ground.',
      subHeadline:
        'Konkuk University Business Administration (4.13/4.5) senior who built reliable hands-on fundamentals through Year-End Tax Audit Internship at Payday Co., Data & Research Internship at FNC Entertainment, and 3 years coordinating schedules and HR workshops in KU-PITAL.',
      status: 'Seeking Entry-Level Recruiting & Payroll Ops Roles',
      location: '',
      kpis: {
        kpi1Value: '4.13/4.5',
        kpi1Title: 'Konkuk Univ. Business',
        kpi1Desc: 'Academic Rigor & Japan Exchange (3.625/4.0)',
        kpi2Value: '2 Terms',
        kpi2Title: 'Corporate Internships',
        kpi2Desc: 'Payday Co. (Tax/CS) & FNC Entertainment (Data/Research)',
        kpi3Value: 'N1 / IH',
        kpi3Title: 'Payroll & Language Certs',
        kpi3Desc: 'Payroll Tax Lv.2 · Excel · GA4 · JLPT N1 · OPIc IH',
      },
      ctaResume: 'View Resume / Download PDF',
      ctaInternships: 'Internships',
      ctaProjects: 'Key Projects',
      ctaContact: 'Schedule Interview / Coffee Chat →',
      candidateCardRole: 'Entry-Level HR · Recruiting & Payroll Ops',
      candidateCardStatus: 'Open to Opportunities',
      pillar01Title: 'Year-End Tax Audit & Data Cleaning Internships',
      pillar01Desc:
        'Completed Year-End Tax Audit internship at Payday Co. (1st/2nd cross-reviews & 1:1 CS) and FNC Entertainment internship (survey data cleaning & market research support).',
      pillar02Title: 'KU-PITAL HR Society Scheduling & Field Coordination',
      pillar02Desc:
        'Co-founded the Konkuk Univ. HR study circle in 2023, handled member scheduling, study materials, and HR workshop operations leading to official society promotion in 2025.',
      pillar03Title: 'Payroll Tools & Multilingual Field Support',
      pillar03Desc:
        'Certified in Payroll Tax Lv.2, Computer Specialist (Excel), and GA4, plus JLPT N1 (110) and OPIc IH for seamless bilingual candidate and employee guidance.',
    },
    home: {
      portalKicker: 'PORTFOLIO SECTIONS',
      portalTitle: 'Explore Dedicated Pages for Each Domain',
      portalDesc:
        'Review LEE GAYEON’s hands-on Recruiting & Payroll background, corporate internships, society operations, and verified credentials.',
      portalAboutTitle: 'About & Education',
      portalAboutDesc: 'Konkuk Univ. Business Admin (4.13/4.5), detail-oriented auditing, and coordination.',
      portalInternshipsTitle: 'Internships',
      portalInternshipsDesc: 'Payday Co. Year-End Tax Audit & FNC Entertainment internship experience.',
      portalProjectsTitle: 'Projects & Society',
      portalProjectsDesc: 'KU-PITAL HR society scheduling & workshops, Kanagawa exchange & outreach.',
      portalSkillsTitle: 'Skills, Education & Certs',
      portalSkillsDesc: 'Payroll 4-Insurance calc, Excel, GA4, Payroll Tax Lv.2, and academic credentials.',
      portalContactTitle: 'Contact & Coffee Chat',
      portalContactDesc: 'Direct inquiry and proposal form for entry-level Recruiting & Payroll roles.',
      openPage: 'Open Dedicated Page',
      featuredKicker: 'KEY HIGHLIGHTS',
      featuredTitle: 'Hands-on Readiness Proven Across Internships & Field Ops',
      featuredInternshipsKicker: 'PART 01 · INTERNSHIP EXPERIENCE',
      featuredInternshipsTitle: 'Corporate Internship Experience',
      viewAllInternships: 'View Internships Page',
      featuredProjectsKicker: 'PART 02 · PROJECTS & ACTIVITIES',
      featuredProjectsTitle: 'HR Society · Exchange · Key Projects',
      viewAllProjects: 'View All Projects Page',
      starModalBtn: 'View STAR Analysis',
      ctaBannerTitle: 'Looking for a reliable pair of hands for Recruiting & Payroll operations?',
      ctaBannerDesc:
        'Ready to support interview scheduling, candidate communication, and payroll/tax document verification with precision. Interviews and coffee chats are warmly welcomed.',
      ctaBannerBtn: 'Go to Contact Page',
      ctaBannerEmail: 'Send Direct Email',
    },
    about: {
      dedicatedTag: '01. ABOUT & CORE VALUES',
      pageTitle: 'About Me & Core Values',
      pageSubtitle: 'Fast on my feet, meticulous with documents and numbers, and attentive to people on the ground.',
      statementKicker: 'CANDIDATE STATEMENT',
      statementTitle: '"Checking every document and number carefully to build everyday trust with employees and candidates."',
      bioParagraphs: [
        'Hello! I am LEE GAYEON, an entry-level HR candidate focused on hands-on Recruiting Operations and Payroll/Year-End Tax practice—ready to support the daily details that keep HR teams running smoothly.',
        'While majoring in Business Administration at Konkuk University (GPA 4.13/4.50), I co-founded the KU-PITAL HR Academic Society in 2023 and coordinated member schedules, study sessions, and HRM workshops, contributing to its official accreditation in 2025. In corporate internships, I handled 1:1 employee tax deduction CS and 1st/2nd document cross-audits at Payday Co., and cleaned survey datasets and organized Japanese competitor files at FNC Entertainment.',
        'Through my academic exchange at Kanagawa University in Japan (GPA 3.625/4.0, all S/A grades) and service as a Mirae Asset Global Correspondent (30th cohort), I built strong cross-cultural communication and deadline discipline. Certified in Year-End Tax Specialist Lv.2, Computer Specialist Lv.2, GA4, JLPT N1 (110), and OPIc IH, I am ready to execute accurately from day one.',
      ],
      summaryKicker: 'CANDIDATE SUMMARY',
      candidateNameLabel: 'Candidate Name',
      birthDateLabel: 'Date of Birth',
      birthDateValue: 'Nov 26, 2003 (Age 22)',
      positionLabel: 'Target Role',
      positionValue: 'Entry-Level HR · Recruiting & Payroll Ops',
      toolsLabel: 'Core Tools',
      toolsValue: 'Excel (Advanced), Google Sheets, GA4, Notion, Word/Hangul, PPT',
      globalLabel: 'Languages',
      globalValue: 'Japanese JLPT N1 (110) · English OPIc IH',
      degreeLabel: 'Education',
      degreeValue: 'Konkuk Univ. Business Admin (4.13/4.5 · Expected Feb 2027)',
      whyHireKicker: 'CORE VALUE PILLARS',
      whyHireTitle: 'Why LEE GAYEON for Recruiting & Payroll Operations?',
      whyHireDesc: 'Three practical strengths demonstrated through hands-on audits, scheduling, and frontline support.',
      evidenceKicker: 'Verified Experience & Practical Proof',
      coreValues: [
        {
          id: 'data-driven',
          title: 'Hands-on Data & Document Accuracy',
          englishTitle: 'Detail-First Verification',
          tagline: 'Cross-checking figures and filings thoroughly rather than guessing',
          description:
            'Proficient in Excel (Advanced), GA4, and Google Sheets, cleanly auditing deduction submissions and cleaning large survey spreadsheets without omissions.',
          bulletPoints: [
            'Payday Co. Year-End Tax Intern: Conducted 1st & 2nd document cross-audits, flagged missing/incorrect filings, and guided employees on resubmissions',
            'FNC Entertainment Intern: Cleaned fandom satisfaction survey spreadsheets and compiled K-POP peer-group metrics',
            'Certified in Year-End Tax Specialist Lv.2, Computer Specialist Lv.2 (KCCI), and GA4',
          ],
          iconName: 'BarChart3',
        },
        {
          id: 'business-acumen',
          title: 'Field Operations & Schedule Coordination',
          englishTitle: 'Reliable Frontline Support',
          tagline: 'Keeping timelines, notices, and materials organized to deadline',
          description:
            'Grounded in Business Administration (4.13/4.5) and civic/internship support roles, delivering clear documentation and responsive coordination across teams.',
          bulletPoints: [
            'FNC Entertainment Intern: Researched Japanese market & competitor data to support internal briefing decks',
            'Gwangjin-gu & Suwon Civic Groups: Designed clear informational content and staffed citizen outreach booths in person',
            'KT wiz CRM Competition: Audited reward-point flow structures and edge-case abuse scenarios',
          ],
          iconName: 'Target',
        },
        {
          id: 'initiative',
          title: 'Proactive Ownership & Bilingual Support',
          englishTitle: 'Hands-on Initiative & Languages',
          tagline: 'Stepping up for operational details and adapting quickly across cultures',
          description:
            'From coordinating 3 years of KU-PITAL study schedules to conducting interviews in Japan, I follow through reliably from preparation to wrap-up.',
          bulletPoints: [
            'KU-PITAL HR Society Co-founder & Ops Member (2023.06–2026.05): Coordinated schedules, session materials, and on-site HRM workshops',
            'Kanagawa University Exchange Student (2024.03–2024.08, GPA 3.625/4.0): Completed 16 credits (All S/A) and field interviews',
            'JLPT N1 (110) & OPIc IH enabling smooth guidance and research support for global employees or candidates',
          ],
          iconName: 'Users',
        },
      ],
    },
    internships: {
      dedicatedTag: '02. INTERNSHIP EXPERIENCE',
      pageTitle: 'Corporate Internships',
      pageSubtitle:
        'Hands-on corporate work experience at Payday Co. (Year-End Tax Audit Team) and FNC Entertainment (Strategic Planning Team).',
      casePrefix: 'INTERNSHIP 0',
      outcomesTitle: 'Key Responsibilities & Verified Outcomes',
      starBtn: 'View STAR Analysis',
      emptyText: 'No internships recorded yet. You can add new internships from the Admin console.',
    },
    projects: {
      dedicatedTag: '03. PROJECTS & ACTIVITIES',
      pageTitle: 'Key Projects & Activities',
      pageSubtitle:
        'KU-PITAL HR society coordination, Kanagawa University exchange & Global Correspondent 30th cohort, and civic/CRM projects.',
      catAll: 'All Projects',
      catInternship: 'Internships',
      catLeadership: 'HR Society · Field Ops',
      catProject: 'Projects · Activities',
      catGlobal: 'Global Exchange',
      outcomesTitle: 'Key Contributions & Outcomes',
      starBtn: 'View STAR Analysis',
      projectList: [
        {
          id: 'proj-payday-intern',
          title: 'Payday Co. — Year-End Tax Team Field Intern',
          subtitle: 'Employee Year-End Tax CS Consultation & 1st/2nd Document Cross-Audits',
          role: 'Year-End Tax Team Field Intern',
          period: '2026.01 ~ 2026.02',
          category: 'internship',
          featured: true,
          tags: ['Year-End Tax Audit', '1st/2nd Review', 'Error Detection', 'Employee CS'],
          metrics: [
            { label: 'Core Scope', value: '1st/2nd Audit' },
            { label: 'Consultation', value: 'Employee CS' },
            { label: 'Credential', value: 'Tax Lv.2' },
          ],
          overview:
            'Worked as a field intern in the Year-End Tax Team at Payday Co., managing phone CS consultations on tax deduction rules and executing 1st and 2nd-stage cross-reviews of corporate filing documents.',
          situation:
            'High inquiry volume on deduction eligibility, rates, and required forms made rapid, accurate document screening and clear guidance critical during peak tax season.',
          task: 'Audit corporate deduction submissions systematically across two verification stages, detect missing or erroneous filings, and guide employees through timely corrections.',
          action: [
            'Handled inbound phone CS consultations explaining deduction eligibility, applicable rates, and required documents',
            'Performed 1st and 2nd reviews of corporate year-end tax batches to catch omissions, errors, and unsubmitted forms',
            'Conducted follow-up re-consultations with employees needing revisions and tracked timely resubmission',
          ],
          result: [
            'Completed 1st and 2nd multi-company tax document verification cleanly with accurate issue resolution',
            'Translated complex tax criteria into clear, empathetic explanations for diverse employees',
            'Earned the Year-End Tax Specialist Level 2 certification following practical field experience',
          ],
          skills: ['Year-End Tax Practice', 'Excel (Advanced)', 'Document Auditing', 'Employee CS'],
          imageUrl: '/src/assets/images/hr_analytics_workspace_1794448404200.jpg',
        },
        {
          id: 'proj-fnc-intern',
          title: 'FNC Entertainment — Strategic Planning Team Intern',
          subtitle: 'Survey Data Cleaning & Visualization · Japan Market Research Support',
          role: 'Intern (Mirae Naeil Work Experience)',
          period: '2025.10 ~ 2025.12',
          category: 'internship',
          featured: true,
          tags: ['Data Cleaning', 'Survey Charts', 'Peer Benchmarks', 'Japan Research Support'],
          metrics: [
            { label: 'Data Ops', value: 'Cleaning & Tabulation' },
            { label: 'Desk Research', value: 'Japan & Peers' },
            { label: 'Support', value: 'Briefing Decks' },
          ],
          overview:
            'Supported FNC Entertainment’s Strategic Planning Team by cleaning and visualizing large fandom satisfaction survey files, organizing K-POP peer-group metrics, researching Japanese market status, and compiling briefing materials.',
          situation:
            'Raw survey exports and overseas market notes needed thorough Excel cleanup and clear comparison tables so full-time team members could review findings efficiently.',
          task: 'Clean survey rows, organize peer metrics, gather Japanese market background facts, and prepare accurate slides for internal team briefings.',
          action: [
            'Cleaned, categorized, and visualized fandom satisfaction survey responses in Excel',
            'Compiled K-POP artist performance indicators alongside peer-group reference figures',
            'Collected global market figures and researched Japan market status and competitor basics',
            'Supported preparation of internal briefing slides with organized tables and charts',
          ],
          result: [
            'Delivered clean spreadsheets and clear charts on schedule for immediate team reference',
            'Applied JLPT N1 Japanese fluency to verify Japanese market sources accurately',
          ],
          skills: ['Data Cleaning & Charts', 'Desk Research', 'Document Support', 'Excel / PPT'],
          imageUrl: '/src/assets/images/hr_analytics_workspace_1794448404200.jpg',
        },
        {
          id: 'proj-academic-hr',
          title: 'Konkuk Univ. Business HR Academic Society (KU-PITAL)',
          subtitle: 'Co-Founding Member · Schedule Coordination & Study/HRM Workshop Ops',
          role: 'Co-Founder & Operations Member',
          period: '2023.06 ~ 2026.05',
          category: 'leadership',
          featured: true,
          tags: ['HR Society Co-founder', 'Schedule Coordination', 'Workshop Ops', 'Official Status'],
          metrics: [
            { label: 'Tenure', value: '~3 Years' },
            { label: 'Milestone', value: 'Official Society' },
            { label: 'Role', value: 'Schedule & Ops' },
          ],
          overview:
            'Co-founded the Business Department’s HR study circle in 2023, helped grow it into an accredited Academic Society in 2025, and managed semester schedules, member notices, study materials, and on-site HRM workshops.',
          situation:
            'As membership expanded from an informal circle into a formal academic society, steady schedule coordination, attendance tracking, and well-prepared workshop logistics became essential.',
          task: 'Coordinate meeting dates across members, distribute clear notices, organize HRM/recruiting case materials, and run study and workshop sessions smoothly on site.',
          action: [
            'Co-founded the HR study circle in 2023, supporting member recruitment and operational foundation through 2025 accreditation',
            'Coordinated semester session calendars, attendance confirmations, notices, and document archives',
            'Prepared and facilitated study sessions on HRM, recruiting, organizational behavior, and HR cases',
            'Handled logistics and on-site facilitation support for hands-on HRM workshops and competition teams',
          ],
          result: [
            'Earned official Business Department Academic Society promotion in 2025 through consistent operations',
            'Built three years of hands-on scheduling, announcement clarity, and group coordination habits',
          ],
          skills: ['Schedule Coordination', 'Workshop Logistics', 'Document Archiving', 'Team Support'],
          imageUrl: '/src/assets/images/team_collaboration_session_1794448404917.jpg',
        },
        {
          id: 'proj-global-exchange',
          title: 'Kanagawa University Exchange & Mirae Asset Global Correspondent 30th',
          subtitle: 'Exchange Program in Japan (3.625/4.0, All S/A) & On-site Global Correspondent',
          role: 'Exchange Student & Global Correspondent',
          period: '2024.01 ~ 2024.08',
          category: 'global',
          featured: true,
          tags: ['Japan Exchange', '3.625/4.0 · All S/A', 'Global Correspondent', 'JLPT N1'],
          metrics: [
            { label: 'Exchange GPA', value: '3.625 / 4.0' },
            { label: 'Credits Earned', value: '16 Cr · All S/A' },
            { label: 'Fellowship', value: 'Mirae Asset 30th' },
          ],
          overview:
            'Completed Japanese-taught business coursework at Kanagawa University with 16 credits of straight S/A grades (GPA 3.625/4.0), while serving as a Mirae Asset Park Hyeon Joo Foundation Global Correspondent conducting local interviews and publishing ESG/socioeconomic articles.',
          situation:
            'Completing university coursework conducted entirely in Japanese while independently sourcing local interviewees and producing insightful articles on Japanese social and ESG issues.',
          task: 'Excel academically in an international setting while planning, interviewing, and publishing credible field reports for Korean readers.',
          action: [
            'Completed Japanese-taught courses including Social Psychology, Risk Management, Social Marketing, Environmental Accounting, and Consumer Behavior',
            'Produced ESG, cultural, and social issue articles as a 30th-cohort Mirae Asset Global Correspondent',
            'Conducted direct local interviews in Japan on economic, political, and social topics to extract insights',
            'Authored and published structured feature articles on a personal blog for Korean audiences',
          ],
          result: [
            'Earned 6 S grades and 3 A grades across 16 credits (GPA 3.625/4.0) with official Presidential Certificate of Completion',
            'Completed Mirae Asset Global Correspondent 30th cohort with full field interview publication record',
            'Solidified bilingual professional readiness demonstrated by JLPT N1 (110) and OPIc IH',
          ],
          skills: ['Business Japanese (JLPT N1)', 'English (OPIc IH)', 'Field Interviews', 'Editorial Planning'],
          imageUrl: '/src/assets/images/team_collaboration_session_1794448404917.jpg',
        },
        {
          id: 'proj-gwangjin-policy',
          title: '2026 Gwangjin-gu University Student Policy Planning Group',
          subtitle: 'University Cooperation Expansion & Youth Policy / Promotional Content Planning',
          role: 'Policy Planning Committee Member',
          period: '2026.04 ~ 2026.05',
          category: 'project',
          featured: false,
          tags: ['Policy Proposal', 'Youth Agenda', 'PR Content Planning', 'Campus Cooperation'],
          metrics: [
            { label: 'Role', value: 'Committee' },
            { label: 'Focus', value: 'Policy Design' },
            { label: 'Target', value: 'University Youth' },
          ],
          overview:
            'Served on the Gwangjin-gu University Student Policy Planning Group, identifying youth-focused civic policy agendas and planning promotional materials tailored to university students.',
          situation:
            'Local municipal policies often suffered from low awareness and participation among university students residing or studying in the district.',
          task: 'Propose relatable policy agendas from a student perspective and shape clear promotional messaging for youth stakeholders.',
          action: [
            'Participated in planning meetings to strengthen Gwangjin-gu & university collaboration',
            'Analyzed local youth issues to formulate actionable policy proposals',
            'Planned and produced youth-friendly policy promotional content and outreach strategies',
          ],
          result: [
            'Formulated user-centered policy agendas and intuitive promotional content plans targeting university students',
            'Strengthened cross-stakeholder communication between municipal planners and campus communities',
          ],
          skills: ['Policy Planning', 'Audience Analysis', 'Content Strategy', 'Collaboration'],
          imageUrl: '/src/assets/images/team_collaboration_session_1794448404917.jpg',
        },
        {
          id: 'proj-suwon-youth',
          title: 'Suwon Special City Youth Autonomy Planning Group (3rd Cohort)',
          subtitle: 'Youth-Centered Policy Content Production & Offline Civic Outreach',
          role: 'Youth Planning Member (3rd Cohort)',
          period: '2025.07 ~ 2025.11',
          category: 'project',
          featured: false,
          tags: ['Card News & Blog', 'Offline Outreach', 'Civic Communication', 'Regional Policy'],
          metrics: [
            { label: 'Cohort', value: '3rd Completed' },
            { label: 'Channels', value: 'Card News/Blog' },
            { label: 'Field Event', value: 'Hwaseong Fest' },
          ],
          overview:
            'Reinterpreted Suwon Special City’s local autonomy policies through youth-friendly card news and blog posts, and led offline citizen outreach at major local events including the Suwon Hwaseong Cultural Festival.',
          situation:
            'Special City decentralization legislation was difficult for general citizens and youth to understand without accessible visual explanations.',
          task: 'Translate complex policy frameworks into engaging digital media and engage residents in person at community festivals.',
          action: [
            'Produced card news and blog content explaining the Special City Support Act from a youth perspective',
            'Participated in offline outreach booths during the Suwon Hwaseong Cultural Festival to raise civic awareness',
          ],
          result: [
            'Improved public comprehension of decentralization policies across both online and offline channels',
            'Built hands-on visual design (Canva/Miricanvas) and citizen communication skills',
          ],
          skills: ['Card News / Blogging', 'Event Operations', 'Policy Communication', 'Canva'],
          imageUrl: '/src/assets/images/team_collaboration_session_1794448404917.jpg',
        },
        {
          id: 'proj-greencrew',
          title: 'Suwon Environmental Education Supporters “Green Crew” (1st Cohort)',
          subtitle: 'Climate Action Citizen Campaign Booths & Eco-Practice Promotion',
          role: 'Green Crew 1st Cohort Supporter',
          period: '2023.06 ~ 2023.12',
          category: 'project',
          featured: false,
          tags: ['Campaign Ops', 'Education Booth', 'Blog PR', 'Local ESG'],
          metrics: [
            { label: 'Duration', value: '7 Months' },
            { label: 'Field Ops', value: 'Climate Booth' },
            { label: 'Outreach', value: 'Blog Stories' },
          ],
          overview:
            'Operated citizen climate-action education booths organized by the Suwon Environmental Education Center and published blog features encouraging practical carbon neutrality and recycling habits.',
          situation:
            'Community sustainability initiatives required interactive hands-on guidance alongside sustained online storytelling.',
          task: 'Guide citizens in proper waste sorting and eco-friendly habits on-site and amplify participation through digital recaps.',
          action: [
            'Supported field operations for the Citizen Climate Action Campaign and experiential events',
            'Ran environmental education booths guiding proper recycling and carbon-neutral daily habits',
            'Published event reviews and practical sustainability posts on a personal blog',
          ],
          result: [
            'Contributed to community environmental awareness and sustainable lifestyle adoption via online-offline outreach',
          ],
          skills: ['Event Facilitation', 'Public Communication', 'Editorial Blogging', 'ESG Outreach'],
          imageUrl: '/src/assets/images/team_collaboration_session_1794448404917.jpg',
        },
        {
          id: 'proj-ktwiz-crm',
          title: 'KT wiz Pro Baseball Club CRM Marketing Competition',
          subtitle: 'Team KU Land Slam · Proposed “Ttori Coin” Virtual Point System for WIZAPP',
          role: 'Strategy Planner (Team KU Land Slam)',
          period: '2022.08 ~ 2022.11',
          category: 'project',
          featured: false,
          tags: ['CRM Marketing', 'Data-Driven Strategy', 'Risk Management', 'Competition'],
          metrics: [
            { label: 'Proposed Model', value: 'Ttori Coin' },
            { label: 'Target App', value: 'WIZAPP CRM' },
            { label: 'Core Focus', value: 'Risk & Data' },
          ],
          overview:
            'Designed the “Ttori Coin” virtual reward point model and fan-data-driven CRM marketing and risk management strategy to boost engagement on KT wiz’s official WIZAPP.',
          situation:
            'Increasing active usage and retention on the team’s mobile app required a gamified loyalty structure tailored to baseball fans.',
          task: 'Build a segmented CRM engagement flow grounded in fan behavior data while safeguarding against point abuse and budget overruns.',
          action: [
            'Structured the “Ttori Coin” virtual reward point economy to activate WIZAPP engagement',
            'Designed targeted fan marketing campaigns informed by consumer usage data',
            'Formulated operational risk mitigation plans addressing reward abuse and cost control',
          ],
          result: [
            'Although falling short of finals, gained deep grounding in sports CRM mechanics, user data segmentation, and risk mitigation',
          ],
          skills: ['CRM Planning', 'Consumer Data Analysis', 'Risk Management', 'Marketing Strategy'],
          imageUrl: '/src/assets/images/hr_analytics_workspace_1794448404200.jpg',
        },
      ],
    },
    projectModal: {
      overviewTitle: 'PROJECT OVERVIEW',
      starTitle: 'STAR METHODOLOGY DEEP-DIVE',
      situationTitle: 'SITUATION (Context & Challenge)',
      taskTitle: 'TASK (Core Objective & Goal)',
      actionTitle: 'ACTION (Detailed Implementation)',
      resultTitle: 'RESULT (Measurable Outcomes)',
      appliedSkillsTitle: 'APPLIED SKILLS:',
      closeBtn: 'Close',
    },
    skills: {
      dedicatedTag: '03. SKILLS, EDUCATION & CERTIFICATIONS',
      pageTitle: 'Skills, Education & Certifications',
      pageSubtitle: 'Verified payroll, recruiting coordination, Excel/GA4 tools, and language credentials.',
      tabData: 'Computer & Office Tools',
      tabHR: 'Recruiting & Payroll Practice',
      tabLang: 'Languages & Global',
      simulatorKicker: 'RECRUITING & PAYROLL PRACTICE WORKBENCH',
      simulatorTitle: 'Recruiting & Payroll Practical Calculator (Interactive Demo)',
      simulatorDesc:
        'Test 4 major social insurance payroll deductions, year-end credit card tax deductions, and recruiting interview attendance tracking.',
      simPayroll: 'Monthly 4-Insurance Payroll',
      simTax: 'Year-End Tax Calc',
      simRecruiting: 'Recruiting Attendance',
      simPayrollFormula: 'Employee 4-Insurance Deductions on Taxable Pay (Monthly Pay - Tax-Free Meal Allowance)',
      simPayrollInput1: 'Monthly Gross Pay (10k KRW)',
      simPayrollInput2: 'Tax-Free Meal (10k KRW · Max 20)',
      simPayrollPension: 'National Pension (4.5%)',
      simPayrollHealth: 'Health & Long-Term Care',
      simPayrollEmployment: 'Employment Ins. (0.9%)',
      simPayrollTotalDed: 'Total 4-Insurance Deduction',
      simPayrollNetBeforeTax: 'Pay After 4-Insurance (Pre-Income Tax)',
      simPayrollNote: '* Verifying non-taxable meal separation (max 200k KRW/mo) and 10 KRW truncation rules in monthly payroll prep.',
      simPayrollTaxBaseLabel: 'Taxable Pay Base:',
      simTaxFormula: 'Credit card tax deduction calculation (15% on excess over 25% salary)',
      simTaxInput1: 'Annual Salary (10k KRW)',
      simTaxInput2: 'Credit Card Spending (10k KRW)',
      simTaxResult: 'Estimated Tax Deduction Base',
      simTaxNote: '* Grounded in Payday Co. Year-End Tax internship and Payroll Tax Specialist Level 2 certification.',
      simTaxUnit: '10k KRW',
      simTaxThresholdText: 'Deduction threshold (25%): Applied to spending exceeding 25% of annual salary',
      simRecruitFormula: 'Tracking Funnel Pass Rate & Interview Show-Up Rate (No-Show Prevention)',
      simRecruitInput1: 'Total Applicants',
      simRecruitInput2: 'Invited to Interview',
      simRecruitInput3: 'Actual Attendees',
      simRecruitResult1: 'Screening Pass Rate',
      simRecruitResult2: 'Interview Attendance Rate',
      simRecruitNote: '* Confirming reply receipts right after invitation and sending D-1 reminders minimizes interview no-shows.',
      simRecruitHigh: 'Strong Attendance Management (Effective D-1 Follow-up)',
      simRecruitLow: 'Recommend stronger D-1 confirmation calls/texts',
      certsTitle: 'Certifications & Languages (Credential · Date)',
      matchedCertsLabel: 'Verified Certifications for This Competency',
      matchedCertsEmpty: 'No certifications linked to this competency yet.',
      matchedCertsCountSuffix: ' verified',
      eduTitle: 'Education & Academic Exchange',
      readinessLabel: 'Operational Readiness:',
      readinessValue: 'Internship-verified · Ready for day-one execution',
      issuerLabel: 'Acquired:',
      education: [
        {
          id: 'edu-konkuk',
          school: 'Konkuk University',
          major: 'B.A. in Business Administration',
          period: '2022.03 ~ 2027.02',
          status: 'Expected Graduation (Senior)',
          gpa: '4.13 / 4.50',
          note: 'Operations Member at HR Academic Society KU-PITAL',
        },
        {
          id: 'edu-kanagawa',
          school: 'Kanagawa University (Japan)',
          major: 'Exchange Student (Business & Social Studies)',
          period: '2024.03 ~ 2024.08',
          status: 'Completed (24.03.18 ~ 24.08.07)',
          gpa: '3.625 / 4.0',
          note: '16 Credits All S/A Grades · Japanese-Taught Coursework',
        },
        {
          id: 'edu-maewon',
          school: 'Maewon High School',
          major: 'General Academic Track',
          period: '2019.03 ~ 2022.01',
          status: 'Graduated',
        },
      ],
      skillCategories: [
        {
          id: 'data-tech',
          name: 'Data & Office Tools',
          description: 'Verified spreadsheet modeling, analytics, and business documentation tools.',
          skills: [
            {
              name: 'Microsoft Excel (Advanced)',
              level: 95,
              description: 'Computer Specialist Lv.2 · Primary internship tool for formula-driven cross-audits and pivot summaries.',
              badge: 'Advanced · Internship Core',
            },
            {
              name: 'Google Analytics 4 (GA4) & Google Sheets',
              level: 90,
              description: 'Certified in Google Analytics 4 · Live collaborative spreadsheets and digital traffic analytics.',
              badge: 'Advanced · GA4 Certified',
            },
            {
              name: 'Hangul · MS Word · Notion',
              level: 90,
              description: 'Business reports, project operation manuals, and structured schedule bases in Notion.',
              badge: 'High / Mid · Documentation',
            },
            {
              name: 'PowerPoint · Canva · Miricanvas',
              level: 82,
              description: 'Presentation slide decks, data charts, and informational card-news design.',
              badge: 'Presentations & Design',
            },
          ],
        },
        {
          id: 'hr-domain',
          name: 'Recruiting & Payroll Practice',
          description: 'Hands-on recruiting coordination & payroll/tax fundamentals proven through internships and society work.',
          skills: [
            {
              name: 'Year-End Tax / Payroll Verification & Employee CS',
              level: 95,
              description: 'Payday Co. intern & Payroll Tax Lv.2 · 1st/2nd batch cross-checks, omission detection, and 1:1 employee phone guidance.',
              badge: 'Internship & Certified',
            },
            {
              name: 'Interview Scheduling & On-Site Coordination',
              level: 92,
              description: 'KU-PITAL & Civic Ops · Multi-participant scheduling, clear notices, and on-site session/workshop execution.',
              badge: '3-Year Ops Experience',
            },
            {
              name: 'Applicant / Survey Data Cleaning & Desk Research',
              level: 90,
              description: 'FNC Entertainment intern · Cleaned raw survey files in Excel, organized peer figures, and compiled Japanese research.',
              badge: 'Internship Proven',
            },
            {
              name: 'Business Admin Foundation (HRM & Labor Basics)',
              level: 92,
              description: 'Konkuk Univ. Business senior (4.13/4.5) grounded in HRM, recruiting/compensation, OB, and basic labor law.',
              badge: 'GPA 4.13 / 4.50',
            },
          ],
        },
        {
          id: 'languages',
          name: 'Languages & Global Communication',
          description: 'Multilingual readiness verified via certified exams, study abroad, and local reporting.',
          skills: [
            {
              name: 'Japanese (Business Fluent)',
              level: 96,
              description: 'JLPT N1 (110, 2025.08.12) · Completed Kanagawa Univ. exchange and conducted local market & interview research.',
              badge: 'JLPT N1 (110)',
            },
            {
              name: 'English (Business Proficient)',
              level: 90,
              description: 'OPIc IH (2026.07.04) · Business English communication and global desk research.',
              badge: 'OPIc IH',
            },
            {
              name: 'Korean (Native)',
              level: 100,
              description: 'Native proficiency in employee CS phone guidance, notices, reports, and candidate communication.',
              badge: 'Native',
            },
          ],
        },
      ],
      certifications: [
        { id: 'cert-opic-ih', name: 'OPIc IH', issuer: 'ACTFL', date: '2026.07.04', category: 'lang', skillCategoryId: 'languages' },
        { id: 'cert-ga4', name: 'GA4 (Google Analytics 4)', issuer: 'Google', date: '2026.04.10', category: 'cert', skillCategoryId: 'data-tech' },
        { id: 'cert-tax-2', name: 'Year-End Tax Specialist Lv.2', issuer: 'Korea Payroll Association', date: '2026.04.01', category: 'cert', skillCategoryId: 'hr-domain' },
        { id: 'cert-com-2', name: 'Computer Specialist in Spreadsheet & Database Lv.2', issuer: 'KCCI', date: '2025.08.26', category: 'cert', skillCategoryId: 'data-tech' },
        { id: 'cert-jlpt-n1', name: 'JLPT N1', issuer: 'Japan Foundation', date: '2025.08.12', score: '110', category: 'lang', skillCategoryId: 'languages' },
      ],
    },
    contact: {
      dedicatedTag: '04. CONTACT & PROPOSAL',
      pageTitle: 'Contact & Coffee Chat Proposal',
      pageSubtitle: 'Looking for a meticulous entry-level associate for Recruiting & Payroll operations?',
      directKicker: 'REACH OUT DIRECTLY',
      directTitle: 'Get in Touch with Entry-Level HR LEE GAYEON',
      emailLabel: 'Direct Email',
      phoneLabel: 'Mobile',
      writeEmailBtn: 'Compose Email',
      locationValue: 'Konkuk University · Business Admin (Expected Feb 2027)',
      statusValue: 'Open to Entry-Level Recruiting & Payroll Ops',
      formKicker: 'INSTANT PROPOSAL FORM',
      formTitle: 'Send Interview / Coffee Chat Proposal',
      formDesc: 'Send a proposal directly through this page without opening a separate email client.',
      fieldName: 'Your Name & Title',
      fieldCompany: 'Company / Team Name',
      fieldEmail: 'Your Reply Email',
      fieldPhone: 'Phone (Optional)',
      fieldType: 'Proposal Type',
      typeInterview: 'Full-time / Interview',
      typeCoffeeChat: 'Casual Coffee Chat',
      typeProject: 'Internship Opportunity',
      typeOther: 'General Inquiry',
      fieldMessage: 'Proposal Details & Message',
      formNotice: '* Sent directly to the candidate admin inbox in real-time.',
      submitBtn: 'Send Proposal Now',
      successTitle: 'Proposal Sent Successfully!',
      successDesc: 'Thank you! Your message has been safely delivered to LEE GAYEON’s inbox. I will reply promptly.',
      additionalBtn: 'Write Another Message',
      directMailBtn: 'Send Direct Email',
      closingSubcopy:
        'From interview scheduling and candidate guidance to payroll/tax verification and deadline tracking, I will serve as a dependable pair of hands on your HR team. Full-time roles, internships, and coffee chats are all welcome.',
      placeholderName: 'Jane Doe / Recruiting & Payroll Team',
      placeholderCompany: 'Company / Department',
      placeholderPhone: '010-0000-0000',
      placeholderMessage: 'Please share details regarding position, team introduction, or preferred schedule.',
      copyEmailTitle: 'Copy Email Address',
      openProfileBtn: 'Open Profile →',
    },
    resume: {
      title: 'LEE GAYEON | Entry-Level HR (Recruiting & Payroll) Resume',
      printBtn: 'Print / Save PDF',
      badge: 'ENTRY-LEVEL HR · RECRUITING & PAYROLL PRACTICE',
      summaryTitle: 'PROFESSIONAL SUMMARY',
      competenciesTitle: 'CORE COMPETENCIES',
      educationTitle: 'EDUCATION & EXCHANGE',
      internshipsTitle: 'INTERNSHIP EXPERIENCE',
      experiencesTitle: 'PROJECTS & ACTIVITIES',
      techSkillsTitle: 'SKILLS & TOOLS',
      certsTitle: 'CERTIFICATIONS & LANGUAGES',
      outcomesHeader: 'Key Contributions & Outcomes:',
      emailLabel: 'Email:',
      phoneLabel: 'Mobile:',
      birthDateLabel: 'Birth:',
      locationLabel: 'Academic Status:',
      fileName: 'LEE_GAYEON_Resume_EntryLevel_HR_Recruiting_Payroll',
      qrLabel: 'Scan for Web Portfolio',
      focusLabel: 'Target Role Focus',
      focusBalanced: 'Balanced',
      focusHrm: 'Recruiting · Payroll',
      focusHrd: 'HRD · Training Ops',
      focusGlobal: 'Global · Japan',
      printTip: 'Choose "Save as PDF" in the print dialog to export with the filename above.',
      compactToggle: 'Compact View',
      qrToggle: 'QR Code',
      fileLangLabel: 'Filename',
    },
    transcriptModal: {
      badge: 'OFFICIAL ACADEMIC CREDENTIAL',
      title: 'Kanagawa University Academic Transcript & Certificate',
      subtitle: 'Verified Proof: Completed 16 credits in Japan (2024.03–2024.08) with GPA 3.625/4.0 (All S / A)',
      institution: 'Kanagawa University, Yokohama, Japan',
      period: 'March 2024 – August 2024 (24.03.18 – 24.08.07 Completed)',
      tabAll: 'View Full Document',
      tabCert: '01. Certificate of Completion',
      tabJaTranscript: '02. Japanese Transcript (学業成績証明書)',
      tabEnTranscript: '03. English Transcript of Record',
      summaryUnits: '16 / 16 Credits (GPA 3.625/4.0)',
      summaryGrades: '6 Courses Grade S · 3 Courses Grade A',
      summaryStatus: 'Completed with Honors',
      downloadBtn: 'Download Full Combined PDF',
      openNewTabBtn: 'Open in New Tab & Print/Save',
      closeBtn: 'Close',
      fileName: 'LEE_GAYEON_Kanagawa_University_Exchange_Transcript_and_Certificate.pdf',
      viewTranscriptBtn: 'View Official Transcript & Certificate',
      viewCredentialBtn: 'View Official Credential',
      docNotice: 'Official Exchange Credentials Document (Certificate + Japanese & English Transcripts, 3 Pages Total)',
      docPagesSummary: 'P1 Certificate of Completion · P2 Japanese Transcript · P3 English Transcript of Record',
    },
  },
  ja: {
    nav: {
      home: 'ホーム',
      about: '自己紹介',
      internships: 'インターン',
      projects: 'プロジェクト',
      skills: 'スキル・資格',
      contact: 'お問い合わせ',
      resume: '履歴書閲覧',
      propose: '面談提案',
      copyUrl: 'URLコピー',
      copiedUrl: '完了！',
      admin: '管理者',
      linkedin: 'LinkedIn',
    },
    hero: {
      badge: '新卒 HR志望 · 採用・給与/年末調整実務',
      name: 'イ・ガヨン',
      englishName: 'LEE GAYEON',
      role: '丁寧な採用運営と給与・年末調整実務に強い新卒HR担当',
      mainHeadline: '丁寧な数字と書類の確認で、\n人と現場をしっかりと支えます。',
      subHeadline:
        '建国大学校経営学科（4.13/4.5）在学中に（株）ウォルグプナル年末調整チームおよびFNCエンターテインメントインターンを修了し、人事学会KU-PITAL運営役員として日程調整・現場運営を担い、現場HRの実務基礎を培った新卒候補者 LEE GAYEON です。',
      status: '新卒 採用・給与実務 / 人事運営ポジション応募中',
      location: '',
      kpis: {
        kpi1Value: '4.13/4.5',
        kpi1Title: '建国大学校 経営学科',
        kpi1Desc: '学業成績優秀 ＆ 神奈川大学交換留学（3.625/4.0）',
        kpi2Value: '2回修了',
        kpi2Title: '企業実務インターン',
        kpi2Desc: '（株）ウォルグプナル 年末調整 ・ FNCエンター データ/調査',
        kpi3Value: 'N1 / IH',
        kpi3Title: '給与・語学・PC資格',
        kpi3Desc: '年末調整実務者2級・Excel2級・GA4・JLPT N1・OPIc IH',
      },
      ctaResume: '履歴書閲覧 / PDF保存',
      ctaInternships: 'インターン経験を見る',
      ctaProjects: 'プロジェクトを見る',
      ctaContact: '面接・カジュアル面談を提案する →',
      candidateCardRole: '新卒人事 · 採用・給与現場実務',
      candidateCardStatus: '新卒応募中',
      pillar01Title: '年末調整チェック＆データ集計インターン修了',
      pillar01Desc:
        '（株）ウォルグプナル年末調整チーム（1・2次書類精査・勤労者CS対応）およびFNCエンターテインメント（アンケート精査・市場資料整理支援）を修了。',
      pillar02Title: 'HR学会 KU-PITAL 運営役員・日程調整',
      pillar02Desc:
        '2023年の創立メンバーから2025年の公式学会昇格まで、会員の日程調整、資料準備、HRMワークショップ現場運営を担当。',
      pillar03Title: '給与・オフィスツール＆日英現場コミュニケーション',
      pillar03Desc:
        '年末調整実務者2級・Excel2級・GA4を取得。JLPT N1（110点）・OPIc IHで多言語での応募者・社員案内にも対応可能。',
    },
    home: {
      portalKicker: 'PORTFOLIO SECTIONS',
      portalTitle: '各分野の専用ページをご覧ください',
      portalDesc:
        '採用・給与現場実務を志望する新卒候補者 LEE GAYEON（イ・ガヨン）の学歴・強み、インターン実務経験、プロジェクト、スキル・資格をご確認いただけます。',
      portalAboutTitle: '自己紹介・価値観',
      portalAboutDesc: '建国大学校経営学科（4.13/4.5）、書類・数字チェックの正確さと現場対応力。',
      portalInternshipsTitle: 'インターンシップ経験',
      portalInternshipsDesc: '（株）ウォルグプナル 年末調整チーム ＆ FNCエンターテインメント インターン。',
      portalProjectsTitle: 'プロジェクト・学会',
      portalProjectsDesc: 'KU-PITAL HR学会現場運営、神奈川大学交換留学 ＆ 市民・公募展活動。',
      portalSkillsTitle: 'スキル・資格・学歴',
      portalSkillsDesc: '社会保険給与計算・Excel・GA4、年末調整2級および大学・留学学歴。',
      portalContactTitle: 'お問い合わせ・面談提案',
      portalContactDesc: '新卒採用・給与/人事運営面接およびカジュアル面談のご提案窓口。',
      openPage: '専用ページを開く',
      featuredKicker: 'KEY HIGHLIGHTS',
      featuredTitle: 'インターン現場と学会運営で培った採用・給与実務の基礎力',
      featuredInternshipsKicker: 'PART 01 · INTERNSHIP EXPERIENCE',
      featuredInternshipsTitle: '企業実務インターンシップ経験',
      viewAllInternships: 'インターン専用ページへ',
      featuredProjectsKicker: 'PART 02 · PROJECTS & ACTIVITIES',
      featuredProjectsTitle: '学会・交換留学・主要プロジェクト',
      viewAllProjects: 'プロジェクト専用ページへ',
      starModalBtn: 'STAR詳細分析を見る',
      ctaBannerTitle: '採用と給与の現場を堅実に支える新卒 HR、LEE GAYEON をお迎えください。',
      ctaBannerDesc:
        '面接日程の調整や応募者対応から給与・年末調整書類の精査・締切管理まで、現場の手足となって正確に貢献いたします。面談のご提案をお待ちしております。',
      ctaBannerBtn: 'お問い合わせページへ',
      ctaBannerEmail: '直接メールを送信',
    },
    about: {
      dedicatedTag: '01. ABOUT & CORE VALUES',
      pageTitle: '自己紹介 & コア価値観',
      pageSubtitle: '手際が良く、書類と数字の確認が正確で、現場で誠実に対話できる新卒人材です。',
      statementKicker: 'CANDIDATE STATEMENT',
      statementTitle: '「正確な書類チェックと数字の確認で、人と現場の安心を支えます。」',
      bioParagraphs: [
        '初めまして！採用の日程調整や応募者対応から給与・年末調整書類の確認・締切管理まで、現場の実務を抜け漏れなく支える新卒HR志望の LEE GAYEON（イ・ガヨン）です。',
        '建国大学校経営学科（GPA 4.13/4.50）にて人事・組織を学びながら、2023年に人事学会KU-PITALの創立メンバーとして参画し、会員の日程調整や勉強会・ワークショップの現場運営を担い2025年の公式学会昇格に貢献しました。また（株）ウォルグプナル年末調整チームでは勤労者1対1電話相談（CS）および企業別控除書類1・2次精査を完遂し、FNCエンターテインメントインターンではアンケートデータのクレンジングと日本市場資料の整理を支援しました。',
        '日本の神奈川大学への交換留学（GPA 3.625/4.0、全科目 秀/優）および未来アセットグローバル特派員30期を通じて現地での交渉力と締切遵守の姿勢を磨きました。年末調整実務者2級、コンピュータ活用能力2級、GA4、JLPT N1（110点）、OPIc IHを土台に、入社初日から現場の即戦力として誠実に貢献いたします。',
      ],
      summaryKicker: 'CANDIDATE SUMMARY',
      candidateNameLabel: '候補者名',
      birthDateLabel: '生年月日 / 年齢',
      birthDateValue: '2003年11月26日（満22歳）',
      positionLabel: '志望職種',
      positionValue: '新卒 HR · 採用運営・給与/年末調整実務',
      toolsLabel: '実務ツール',
      toolsValue: 'Excel（上）、Google Sheets、GA4、Notion、Word/ハングル、PPT',
      globalLabel: '語学能力',
      globalValue: '日本語 JLPT N1（110点）· 英語 OPIc IH',
      degreeLabel: '学歴',
      degreeValue: '建国大学校 経営学科 4年（4.13/4.5・2027年2月卒業見込み）',
      whyHireKicker: 'CORE VALUE PILLARS',
      whyHireTitle: '採用・給与現場の担当者として LEE GAYEON が選ばばれる理由',
      whyHireDesc: '現場配属後すぐに手足となって正確に業務を進められる3つの実証された強みです。',
      evidenceKicker: '実証された経験と実践事例',
      coreValues: [
        {
          id: 'data-driven',
          title: '正確なデータ精査＆不備予防力',
          englishTitle: 'Hands-on Data Accuracy',
          tagline: '勘に頼らず書類と数値を最後まで突き合わせる丁寧さ',
          description:
            'Excel（上）、GA4、Googleスプレッドシート活用力を活かし、大量の控除書類やアンケート・応募データを抜け漏れなく整理・検証できます。',
          bulletPoints: [
            '（株）ウォルグプナル年末調整チームインターン：企業別書類1・2次クロスチェック、不備・未提出の識別、勤労者への再案内',
            'FNCエンターテインメントインターン：ファン満足度アンケートローデータのクレンジング・集計支援',
            '年末調整実務者2級・コンピュータ活用能力2級・GA4など実務直結の公認資格を保有',
          ],
          iconName: 'BarChart3',
        },
        {
          id: 'business-acumen',
          title: '現場志向の丁寧な業務サポート',
          englishTitle: 'Field Operations & Coordination',
          tagline: '日程調整・案内作成・締切管理まで抜け目なく整える実行力',
          description:
            '経営学の基礎知識（4.13/4.5）とインターン・自治体企画団の現場運営経験を通じ、関係者間の日程調整と分かりやすい案内作成を培いました。',
          bulletPoints: [
            'FNCエンターテインメント：日本進出状況および競合基礎資料のリサーチと社内報告資料の整理支援',
            '広津区大学生政策企画団・水原特例市青年企画団：案内カードニュース制作および市民対話ブースの現場運営',
            'KT wiz CRM公募展：ポイント運用の仕組みおよび不正利用ケースの点検',
          ],
          iconName: 'Target',
        },
        {
          id: 'initiative',
          title: '主体的な参加＆多言語コミュニケーション力',
          englishTitle: 'Proactive Ownership & Bilingual Agility',
          tagline: '必要な実務を自ら引き受け、多文化環境でも誠実にやり遂げる力',
          description:
            'HRサークルの日程・イベント運営から日本交換留学・現地インタビューまで、任された役割を最後まで誠実に完遂してきました。',
          bulletPoints: [
            'HR学会 KU-PITAL 創立メンバー・運営役員（2023.06~2026.05）：会員日程調整・資料準備・HRMワークショップ現場進行',
            '神奈川大学交換留学（2024.03~2024.08、GPA 3.625/4.0）：16単位全科目 秀/優 修得および現地インタビュー実施',
            'JLPT N1（110点）・OPIc IH保有により日本語・英語での候補者/社員案内や資料整理が可能',
          ],
          iconName: 'Users',
        },
      ],
    },
    internships: {
      dedicatedTag: '02. INTERNSHIP EXPERIENCE',
      pageTitle: 'インターンシップ経験',
      pageSubtitle:
        '（株）ウォルグプナル 年末調整チーム現場実習インターンおよびFNCエンターテインメント インターンシップの実務詳細です。',
      casePrefix: 'INTERNSHIP 0',
      outcomesTitle: '主な実務業務および成果',
      starBtn: 'STAR詳細分析を見る',
      emptyText: '登録されたインターンシップ経験がありません。管理者画面から追加できます。',
    },
    projects: {
      dedicatedTag: '03. PROJECTS & ACTIVITIES',
      pageTitle: '主要プロジェクト・活動',
      pageSubtitle:
        'KU-PITAL HR学会運営、神奈川大学交換留学＆グローバル特派員30期、現場運営プロジェクトの実績です。',
      catAll: 'すべての活動',
      catInternship: 'インターン経験',
      catLeadership: '学会・現場運営',
      catProject: 'プロジェクト・対外活動',
      catGlobal: '交換留学・グローバル',
      outcomesTitle: '主な活動および実証された成果',
      starBtn: 'STAR詳細分析を見る',
      projectList: [
        {
          id: 'proj-payday-intern',
          title: '（株）ウォルグプナル 年末調整チーム現場実習インターン',
          subtitle: '勤労者年末調整相談および企業別控除書類 1・2次精査・不備検証',
          role: '年末調整チーム 現場実習インターン',
          period: '2026.01 ~ 2026.02',
          category: 'internship',
          featured: true,
          tags: ['年末調整実務', '1・2次書類精査', '不備/未提出識別', '勤労者CS対応'],
          metrics: [
            { label: '担当業務', value: '1・2次精査' },
            { label: '相談窓口', value: 'CS電話対応' },
            { label: '保有資格', value: '年末調整2級' },
          ],
          overview:
            '年末調整集中期間に（株）ウォルグプナル年末調整チームの現場実習インターンとして勤務し、勤労者向け年末調整電話相談（CS）および企業別年末調整資料の1・2次精査・不備/未提出書類の識別業務を完遂しました。',
          situation:
            '各社勤労者からの控除適用可否・控除率・提出書類に関する問い合わせが集中し、書類漏れや誤提出に対する迅速で正確な再案内が求められる実務環境でした。',
          task:
            '税法基準に沿って企業別年末調整書類を1・2次で丁寧に交差確認して不備・未提出件を識別し、補完が必要な勤労者へ分かりやすく再相談を行う必要がありました。',
          action: [
            '勤労者対象の年末調整控除適用可否・控除率・必須提出書類に関する電話相談（CS対応）を遂行',
            '企業別年末調整資料の1次・2次段階別レビューによる控除項目の漏れおよび不備・未提出書類の識別',
            '補完が必要な勤労者への個別再相談実施および期限内の修正提出要請・締切管理',
          ],
          result: [
            '企業별大量年末調整書類に対する1・2次精密精査を通じ、不備および未提出件を漏れなく識別・補完',
            '複雑な控除基準を勤労者の目線に合わせて明確に説明し、安定したCS対応力を証明',
            '実務経験をベースに韓国ペイロール協会「年末調整実務者2級」資格を取得し専門性を深化',
          ],
          skills: ['年末調整実務', 'Excel（上）', '控除書類精査', '勤労者CS対応'],
          imageUrl: '/src/assets/images/hr_analytics_workspace_1794448404200.jpg',
        },
        {
          id: 'proj-fnc-intern',
          title: 'FNCエンターテインメント 戦略企画チームインターン',
          subtitle: '未来ネイル仕事経験インターン · アンケート精査・日本市場資料調査支援',
          role: '戦略企画チーム インターン',
          period: '2025.10 ~ 2025.12',
          category: 'internship',
          featured: true,
          tags: ['データ精査・集計', 'アンケート可視化', '指標整理', '日本資料調査支援'],
          metrics: [
            { label: 'データ実務', value: '精査・集計支援' },
            { label: '資料調査', value: '日本/競合調査' },
            { label: '業務支援', value: '報告資料整理' },
          ],
          overview:
            'FNCエンターテインメントにて、大量のファン満足度アンケートデータのクレンジング・可視化支援、K-POPピアグループ数値整理、日本市場状況の基礎リサーチおよび社内報告資料の整理支援を行いました。',
          situation:
            '多数のアンケートローデータや海外市場メモが散在しており、実務担当者がすぐ参照できるようExcelで整然と集計・整理するサポートが必要でした。',
          task:
            'アンケート回答の重複・誤記を精査して図表化し、ピア数値と日本市場の基礎情報を正確にまとめて報告資料作成を支援することが目標でした。',
          action: [
            'ファンダム満足度アンケートローデータのExcelクレンジング・分類・可視化整理',
            'K-POPアーティストおよび主要ピアグループ数値比較表の作成支援',
            'グローバル音楽市場数値の取りまとめおよび日本市場・競合基礎情報の調査',
            '整理したデータに基づく社内報告スライド作成支援',
          ],
          result: [
            'アンケートおよび市場資料を分かりやすく集計・整理し、実務チームへ期限通りに提供',
            'JLPT N1の日本語力を活かして日本現地資料を直接確認し、基礎調査の正確性を向上',
          ],
          skills: ['データ精査・可視化', '基礎リサーチ', '資料・スライド整理', 'Excel / PPT'],
          imageUrl: '/src/assets/images/hr_analytics_workspace_1794448404200.jpg',
        },
        {
          id: 'proj-academic-hr',
          title: '建国大学校 経営学科 人事学会 KU-PITAL',
          subtitle: 'サークル創立メンバー · 会員日程調整および勉強会・HRMワークショップ現場運営',
          role: '創立メンバー ＆ 運営役員',
          period: '2023.06 ~ 2026.05',
          category: 'leadership',
          featured: true,
          tags: ['HR学会創立', '日程・連絡調整', '勉強会・ワークショップ運営', '公式学会昇格'],
          metrics: [
            { label: '活動期間', value: '約3年間' },
            { label: '組織成長', value: '公式学会昇格' },
            { label: '担当実務', value: '日程・現場運営' },
          ],
          overview:
            '2023年に建国大学校経営学科の人事・組織サークル創立メンバーとして出発し、2025年の公式学会昇格に貢献。運営役員として学期ごとの日程調整、案内連絡、資料準備およびHRMワークショップの現場進行を実務的に担いました。',
          situation:
            'サークルから公式学会へ成長し会員が増えるにつれ、定期セッションの日程調整・出欠確認・資料アーカイブなどきめ細かな運営実務が不可欠となりました。',
          task:
            '会員同士の日程調整とアナウンスを丁寧に行い、採用・労務・HRM事例勉強会やワークショップの現場進行を滞りなく支えることでした。',
          action: [
            '2023年の創立メンバーとして新規募集案内・運営土台を整備し、2025年の公式学会昇格に貢献',
            '運営役員として学期別日程調整、出欠連絡、活動資料のアーカイブ管理を担当',
            '人事管理（HRM）・採用・組織行動（OB）関連資料の準備と勉強会の進行',
            '会員向けHRM実務ワークショップおよび公募展チームの現場調整・進行支援',
          ],
          result: [
            '地道な運営実績が評価され、2025年に建国大学校経営学科の公式学会へ昇格',
            '約3年間の日程調整・周知連絡・イベント進行を通じてHR現場の調整力を習得',
          ],
          skills: ['日程調整・連絡', 'ワークショップ運営', '資料・文書整理', 'チーム協働'],
          imageUrl: '/src/assets/images/team_collaboration_session_1794448404917.jpg',
        },
        {
          id: 'proj-global-exchange',
          title: '神奈川大学 交換留学 ＆ 未来アセット グローバル特派員30期',
          subtitle: '神奈川大学交換留学（3.625/4.0・全科目S/A）＆ 現地取材特派員',
          role: '交換留学生 ＆ グローバル特派員30期',
          period: '2024.01 ~ 2024.08',
          category: 'global',
          featured: true,
          tags: ['日本交換留学', '3.625/4.0 · 全科目S/A', 'グローバル特派員30期', 'JLPT N1'],
          metrics: [
            { label: '留学成績', value: '3.625 / 4.0' },
            { label: '修得単位', value: '16単位 全S/A' },
            { label: '対外活動', value: '特派員30期' },
          ],
          overview:
            '日本の神奈川大学交換留学生（2024.03~2024.08）として全科目日本語による専門講義16単位を全S/A（3.625/4.0）で修得するとともに、未来アセット朴炫柱財団グローバル特派員30期として現地取材・ESG/経済/社会記事を発信しました。',
          situation:
            '日本現地大学での日本語による専門講義の履修と同時に、現地インタビューを通じた社会・経済記事の執筆を計画通りやり遂げる必要がありました。',
          task:
            '高い学業水準を維持しながら、現地の取材交渉・インタビュー・記事発信を一貫して遂行することでした。',
          action: [
            '社会心理学、リスクマネジメント論、ソーシャルマーケティング、環境会計論、消費者行動論などすべて日本語で行われる専門科目を履修',
            '未来アセットグローバル特派員30期として留学中のESG・文化・社会テーマのコンテンツを企画制作',
            '日本の経済・政治・社会課題を選定し現地インタビューを直接実施して洞察を抽出',
            '韓国読者向けに日本の主要テーマを記事化し個人ブログへ発信',
          ],
          result: [
            '神奈川大学16単位 全科目 秀(S) 6科目・優(A) 3科目（GPA 3.625/4.0）および学長押印の公式修了証書を取得',
            '未来アセット朴炫柱財団グローバル特派員30期を無事修了し複数の現地インタビュー記事を公開',
            'JLPT N1（110点）およびOPIc IHで裏付けられた日英ビジネスコミュニケーション力を確立',
          ],
          skills: ['ビジネス日本語（JLPT N1）', '英語（OPIc IH）', '現地取材・リサーチ', '記事企画'],
          imageUrl: '/src/assets/images/team_collaboration_session_1794448404917.jpg',
        },
        {
          id: 'proj-gwangjin-policy',
          title: '2026 広津区 大学生政策企画団',
          subtitle: '大学協力拡大および大学生視点の政策提案・広報コンテンツ企画',
          role: '政策企画団 委員',
          period: '2026.04 ~ 2026.05',
          category: 'project',
          featured: false,
          tags: ['政策提案', '青年課題発掘', '広報コンテンツ企画', '地域連携'],
          metrics: [
            { label: '役割', value: '企画団委員' },
            { label: '業務', value: '政策課題発掘' },
            { label: '対象', value: '青年・大学生' },
          ],
          overview:
            '広津区の大学協力拡大と大学生の政策参加促進に向けた政策企画団委員として、青年視点の地域政策課題を発掘し大学生向けの広報コンテンツ企画・制作に参画しました。',
          situation:
            '自治体の施策が実際の対象である大学生・青年に十分届かず参加率が伸び悩む課題の解消が必要でした。',
          task:
            '青年視点で体感度の高い政策を提案し、大学生が直感的に理解できる広報企画を立案することでした。',
          action: [
            '広津区と大学の連携拡大・大学生政策参加促進に向けた定期企画会議へ参加',
            '青年目線で地域課題を分析し具体的な政策アジェンダを発掘・提案',
            '政策需要者である地域青年の目線に合わせた広報コンテンツの企画・制作',
          ],
          result: [
            '需要者（青年・大学生）中心の政策テーマを導出し分かりやすい広報案を具体化',
            '自治体と大学間の協力コミュニケーションおよびターゲット向け発信力を強化',
          ],
          skills: ['政策企画・提案', '需要者分析', '広報コンテンツ設計', 'チーム協業'],
          imageUrl: '/src/assets/images/team_collaboration_session_1794448404917.jpg',
        },
        {
          id: 'proj-suwon-youth',
          title: '水原特例市 自治分権青年企画団 3期',
          subtitle: '青年視点の政策コンテンツ制作およびオフライン市民啓発活動',
          role: '青年企画団 3期 団員',
          period: '2025.07 ~ 2025.11',
          category: 'project',
          featured: false,
          tags: ['カードニュース・ブログ', 'オフライン運営', '市民対話', '地域政策広報'],
          metrics: [
            { label: '期数', value: '3期修了' },
            { label: '媒体', value: 'ブログ/SNS' },
            { label: '現場活動', value: '水原華城文化祭' },
          ],
          overview:
            '水原市の自治分権政策を青年の視点でカードニュース・ブログ記事として発信し、水原華城文化祭などのオフラインイベント現場で市民への啓発活動を行いました。',
          situation:
            '特例市支援特別法や自治分権の制度は一般市民にとって難解であり、親しみやすい広報手段が求められていました。',
          task:
            '難解な制度をビジュアルコンテンツで分かりやすく翻訳し、現場での市民参加を引き出すことでした。',
          action: [
            '特例市支援特別法など主要テーマを整理し青年目線のカードニュースおよびブログ記事を制作・発信',
            '水原華城文化祭など市民向けオフライン行事に参加し現場啓発キャンペーンを実施',
          ],
          result: [
            'オンライン・オフライン双方でのコミュニケーションにより地域住民の政策理解向上に貢献',
            'Canva・Miricanvasによる広報物制作と対面での市民対応経験を蓄積',
          ],
          skills: ['カードニュース/ブログ制作', 'オフライン運営', '政策広報', 'Canva'],
          imageUrl: '/src/assets/images/team_collaboration_session_1794448404917.jpg',
        },
        {
          id: 'proj-greencrew',
          title: '水原市環境教育サポーターズ「グリーンクルー」1期',
          subtitle: '気候行動市民参加キャンペーンブース運営および環境実践広報',
          role: 'グリーンクルー 1期 サポーターズ',
          period: '2023.06 ~ 2023.12',
          category: 'project',
          featured: false,
          tags: ['キャンペーン運営', '体験ブース運営', 'ブログ広報', '地域ESG'],
          metrics: [
            { label: '期間', value: '7か月修了' },
            { label: '現場活動', value: '市民参加ブース' },
            { label: 'オンライン', value: 'ブログ発信' },
          ],
          overview:
            '水原市環境教育センター主催「気候行動市民参加キャンペーン」および体験イベントにて市民向け環境教育ブースを運営し、ブログ記事を通じて日常のカーボンニュートラル実践を発信しました。',
          situation:
            '市民が楽しみながら正しい分別排出や環境行動を学べる対面ブースと継続的な情報発信が必要でした。',
          task:
            '体験ブースで市民と直接対話しながら実践方法を案内し、イベント後のブログ発信で輪を広げることでした。',
          action: [
            '「気候行動市民参加キャンペーン」および体験イベントの現場運営に参画',
            '市民向け環境教育ブース運営および正しい分別排出・脱炭素生活の案内・広報',
            '開催後に参加レポートおよび日常のエコ実践コンテンツをブログに掲載',
          ],
          result: [
            '現場ブース運営とオンライン発信の連携により地域社会の環境意識向上と実践拡大に貢献',
          ],
          skills: ['イベント運営', '対面コミュニケーション', '記事執筆', 'ESG活動'],
          imageUrl: '/src/assets/images/team_collaboration_session_1794448404917.jpg',
        },
        {
          id: 'proj-ktwiz-crm',
          title: 'KT wiz プロ野球団 CRMマーケティング企画公募展',
          subtitle: 'チームKUランドスラム · 球団アプリ（WIZAPP）活性化仮想ポイント「ットリコイン」提案',
          role: '企画チーム員',
          period: '2022.08 ~ 2022.11',
          category: 'project',
          featured: false,
          tags: ['CRMマーケティング', 'データ基盤企画', 'リスク対応戦略', '公募展'],
          metrics: [
            { label: '提案モデル', value: 'ットリコイン' },
            { label: '対象アプリ', value: 'WIZAPP CRM' },
            { label: '主要観点', value: '構造/リスク' },
          ],
          overview:
            'KT wizプロ野球団公式アプリ（WIZAPP）の活性化を目的に、仮想ポイント制度「ットリコイン」および消費者データに基づくファン向けマーケティング・リスク管理戦略を企画しました。',
          situation:
            '公式アプリ上のファン滞在時間と再訪問率を高める参加型リワード設計が課題でした。',
          task:
            'ファンデータに基づくターゲット施策に加え、不正利用や運営コストを抑えるリスク管理案まで含めた実効性あるCRM企画をまとめることでした。',
          action: [
            '球団アプリ活性化に向けた仮想ポイント制度「ットリコイン」の構造設計',
            '消費者データに基づくファン層別プロモーション企画の策定',
            'ポイント悪用防止と運営コスト管理を考慮したリスク対応戦略の構築',
          ],
          result: [
            '決勝進出は惜しくも逃したものの、スポーツ球団CRM構造・データ基盤企画・リスク管理フレームを深く習得',
          ],
          skills: ['CRM企画', '消費者データ分析', 'リスク管理', 'マーケティング戦略'],
          imageUrl: '/src/assets/images/hr_analytics_workspace_1794448404200.jpg',
        },
      ],
    },
    projectModal: {
      overviewTitle: 'プロジェクト概要',
      starTitle: 'STAR手法に基づく詳細分析',
      situationTitle: 'SITUATION（背景と課題）',
      taskTitle: 'TASK（解決課題と目標）',
      actionTitle: 'ACTION（具体的な実行内容）',
      resultTitle: 'RESULT（主な成果）',
      appliedSkillsTitle: '活用スキル:',
      closeBtn: '閉じる',
    },
    skills: {
      dedicatedTag: '03. SKILLS, EDUCATION & CERTIFICATIONS',
      pageTitle: '職務能力 · 学歴 & 資格事項',
      pageSubtitle: '公認資格と現場インターンで培った給与・年末調整チェック、採用日程管理およびデータ処理力です。',
      tabData: 'コンピュータ・実務活用',
      tabHR: '採用・給与実務能力',
      tabLang: '外国語・グローバル能力',
      simulatorKicker: 'RECRUITING & PAYROLL PRACTICE WORKBENCH',
      simulatorTitle: '採用・給与現場実務 計算ツール（体験デモ）',
      simulatorDesc: '月給4大社会保険控除計算、年末調整カード控除、採用面接出席率の確認を直接テストできます。',
      simPayroll: '月給 4大保険計算',
      simTax: '年末調整 控除計算',
      simRecruiting: '採用・面接出席率確認',
      simPayrollFormula: '課税給与（月給 − 非課税食代）基準の労働者負担分 4大保険控除算出',
      simPayrollInput1: '月給総額（万ウォン）',
      simPayrollInput2: '非課税食代（万ウォン · 上限20）',
      simPayrollPension: '国民年金 (4.5%)',
      simPayrollHealth: '健康・長期療養保険',
      simPayrollEmployment: '雇用保険 (0.9%)',
      simPayrollTotalDed: '4大保険 控除合計',
      simPayrollNetBeforeTax: '4大保険控除後 支給額（所得税除く）',
      simPayrollNote: '※ 給与明細確認時は非課税食代（月20万ウォン上限）の区分および端数切り捨て基準を丁寧に照合します。',
      simPayrollTaxBaseLabel: '課税対象給与基準:',
      simTaxFormula: 'クレジットカード等利用金額 所得控除（総給与25%超過分の15%）',
      simTaxInput1: '総給与額（万ウォン）',
      simTaxInput2: 'カード利用額（万ウォン）',
      simTaxResult: '予想所得控除 対象額',
      simTaxNote: '※ （株）ウォルグプナル年末調整インターンおよび年末調整実務者2級資格を通じて控除検証体系を習得しました。',
      simTaxUnit: '万ウォン',
      simTaxThresholdText: '控除基準ライン（25％）：年間総給与の25％超過分に適用',
      simRecruitFormula: '選考通過率および面接出席率（No-Show防止）確認',
      simRecruitInput1: '総応募者数（名）',
      simRecruitInput2: '書類合格・面接案内（名）',
      simRecruitInput3: '実際の面接出席者（名）',
      simRecruitResult1: '書類通過率',
      simRecruitResult2: '面接出席率',
      simRecruitNote: '※ 案内後の返信確認および面接前日のリマインド連絡を徹底し、無断欠席を最小限に抑えます。',
      simRecruitHigh: '安定した面接出席管理水準（前日案内が効果的）',
      simRecruitLow: '日程再確認および前日リマインド連絡の強化を推奨',
      certsTitle: '資格および語学取得事項（資格名 · 取得日）',
      matchedCertsLabel: '該当分野の保有資格・語学',
      matchedCertsEmpty: 'この分野に登録された資格はまだありません。',
      matchedCertsCountSuffix: '件',
      eduTitle: '学歴および海外研修事項',
      readinessLabel: '実務投入準備度:',
      readinessValue: '基礎力完備・現場実務検証済',
      issuerLabel: '取得日:',
      education: [
        {
          id: 'edu-konkuk',
          school: '建国大学校（Konkuk University）',
          major: '経営学科',
          period: '2022.03 ~ 2027.02',
          status: '卒業見込み（4年在学）',
          gpa: '4.13 / 4.50',
          note: '経営学科 人事学会 KU-PITAL 運営役員',
        },
        {
          id: 'edu-kanagawa',
          school: '神奈川大学（KANAGAWA UNIVERSITY）',
          major: '日本交換留学（経営・地域社会科目履修）',
          period: '2024.03 ~ 2024.08',
          status: '修了（24.03.18 ~ 24.08.07）',
          gpa: '3.625 / 4.0',
          note: '16単位全科目 秀(S)/優(A)修得・すべて日本語による専門講義',
        },
        {
          id: 'edu-maewon',
          school: '梅園高等学校',
          major: '人文系',
          period: '2019.03 ~ 2022.01',
          status: '卒業',
        },
      ],
      skillCategories: [
        {
          id: 'data-tech',
          name: 'データ・事務ツール活用力',
          description: '公認資格と企業インターン現場で培ったデータ集計・文書作成・分析スキル。',
          skills: [
            {
              name: 'Microsoft Excel（水準：上）',
              level: 95,
              description: 'コンピュータ活用能力2級保有・インターン主要使用ツール、関数活用・大量データクロスチェックおよびピボット分析。',
              badge: '上・インターン主力',
            },
            {
              name: 'Google Analytics 4 (GA4) & Google Sheets',
              level: 90,
              description: 'GA4公式資格取得（Google）・スプレッドシート関数によるリアルタイム集計およびトラフィック分析。',
              badge: '上・GA4資格保有',
            },
            {
              name: 'ハングル · MS Word · Notion',
              level: 90,
              description: 'ビジネス報告書・日程表作成およびNotionを用いた資料・スケジュール管理。',
              badge: '上/中・文書作成',
            },
            {
              name: 'PowerPoint · Canva · Miricanvas',
              level: 82,
              description: '発表スライド・グラフ作成および案内用カードニュース制作。',
              badge: '資料/広報制作',
            },
          ],
        },
        {
          id: 'hr-domain',
          name: '採用・給与現場実務の基礎力',
          description: '年末調整・インターンおよびHR学会運営を通じて身につけた採用・給与現場の実務スキル。',
          skills: [
            {
              name: '年末調整・給与控除書類 1・2次検証 ＆ CS対応',
              level: 95,
              description: '（株）ウォルグプナル インターン ＆ 年末調整実務者2級・1/2次書類照合、不備識別、勤労者1対1電話案内。',
              badge: 'インターン＆資格完了',
            },
            {
              name: '採用・勉強会の日程調整および現場運営支援',
              level: 92,
              description: 'KU-PITAL運営役員・大外活動・複数名の日程調整、案内周知、勉強会やワークショップの現場進行サポート。',
              badge: '3年間現場運営',
            },
            {
              name: '応募・アンケートデータ精査および基礎調査整理',
              level: 90,
              description: 'FNCエンターテインメント インターン・アンケートローデータExcelクレンジング、数値整理、日本資料調査支援。',
              badge: 'インターン実務済',
            },
            {
              name: '経営学専攻基礎知識（人事・労務・報酬 4.13/4.50）',
              level: 92,
              description: '建国大学校経営学科4年・HRM、採用・報酬管理、組織行動論、労務基礎知識に基づく迅速な実務適応。',
              badge: 'GPA 4.13 / 4.50',
            },
          ],
        },
        {
          id: 'languages',
          name: 'グローバル語学力',
          description: '公認スコアと日本交換留学・現地取材で検証された多言語コミュニケーション力。',
          skills: [
            {
              name: '日本語（運用能力：上）',
              level: 96,
              description: 'JLPT N1（110点、2025.08.12取得）・神奈川大学交換留学（3.625/4.0）および現地取材・日本市場調査を遂行。',
              badge: 'JLPT N1（110点）',
            },
            {
              name: '英語（運用能力：上）',
              level: 90,
              description: 'OPIc IH（2026.07.04取得）・ビジネス英語での実務対応および海外資料リサーチ対応。',
              badge: 'OPIc IH',
            },
            {
              name: '韓国語（Native）',
              level: 100,
              description: '母国語・勤労者CS電話案内、案内通知、資料整理など状況に応じた丁寧で正確なコミュニケーション。',
              badge: 'Native',
            },
          ],
        },
      ],
      certifications: [
        { id: 'cert-opic-ih', name: 'OPIc IH', issuer: 'ACTFL', date: '2026.07.04', category: 'lang', skillCategoryId: 'languages' },
        { id: 'cert-ga4', name: 'GA4 (Google Analytics 4)', issuer: 'Google', date: '2026.04.10', category: 'cert', skillCategoryId: 'data-tech' },
        { id: 'cert-tax-2', name: '年末調整実務者 2級', issuer: '韓国ペイロール協会', date: '2026.04.01', category: 'cert', skillCategoryId: 'hr-domain' },
        { id: 'cert-com-2', name: 'コンピュータ活用能力 2級', issuer: '大韓商工会議所', date: '2025.08.26', category: 'cert', skillCategoryId: 'data-tech' },
        { id: 'cert-jlpt-n1', name: 'JLPT N1', issuer: '日本国際交流基金', date: '2025.08.12', score: '110点', category: 'lang', skillCategoryId: 'languages' },
      ],
    },
    contact: {
      dedicatedTag: '04. CONTACT & PROPOSAL',
      pageTitle: 'お問い合わせ & 面談のご提案',
      pageSubtitle: '採用調整や給与・年末調整書類のチェックを丁寧に任せられる新卒をお探しですか？',
      directKicker: 'REACH OUT DIRECTLY',
      directTitle: '新卒 HR（採用・給与実務）LEE GAYEON への直接連絡',
      emailLabel: 'メールアドレス',
      phoneLabel: '電話番号',
      writeEmailBtn: 'メールを作成',
      locationValue: '建国大学校 経営学科（4年在学 · 2027年2月卒業見込み）',
      statusValue: '新卒 採用・給与実務 / 人事運営ポジション応募中',
      formKicker: 'INSTANT PROPOSAL FORM',
      formTitle: '面接・カジュアル面談のご提案',
      formDesc: '別画面を開くことなく、本ページから直接メッセージをお送りいただけます。',
      fieldName: 'ご担当者様名・役職',
      fieldCompany: '会社名・所属部署',
      fieldEmail: 'ご返信用メールアドレス',
      fieldPhone: 'お電話番号（任意）',
      fieldType: 'ご提案の種類',
      typeInterview: '新卒採用 / 面接',
      typeCoffeeChat: 'カジュアル面談',
      typeProject: '採用直結型インターン',
      typeOther: 'その他のお問い合わせ',
      fieldMessage: 'メッセージ内容',
      formNotice: '* 送信と同時に管理者の受信ボックスへリアルタイム記録されます。',
      submitBtn: '提案メッセージを送信',
      successTitle: 'メッセージが正常に送信されました！',
      successDesc: 'LEE GAYEONの受信ボックスに無事届きました。記載いただいたご連絡先へ速やかにご返信いたします。',
      additionalBtn: '別のメッセージを作成',
      directMailBtn: '直接メールを送る',
      closingSubcopy:
        '採用日程の調整・候補者案内から給与・年末調整資料の確認・締切管理まで、現場でチームを支える誠実な手足として貢献いたします。正社員採用、インターン、カジュアル面談いずれも歓迎いたします。',
      placeholderName: '山田 太郎 / 採用・労務担当',
      placeholderCompany: '貴社名 / 所属部署',
      placeholderPhone: '010-0000-0000',
      placeholderMessage: 'ポジション、チーム紹介、ご希望の面談日程などをご自由にご記入ください。',
      copyEmailTitle: 'メールアドレスをコピー',
      openProfileBtn: 'プロフィールを開く →',
    },
    resume: {
      title: 'LEE GAYEON | 新卒HR（採用・給与実務）履歴書',
      printBtn: '印刷 / PDF保存',
      badge: '新卒 HR · 採用・給与/年末調整実務志望',
      summaryTitle: 'PROFESSIONAL SUMMARY（専門要約）',
      competenciesTitle: 'CORE COMPETENCIES（主要コンピテンシー）',
      educationTitle: 'EDUCATION & EXCHANGE（学歴および海外研修）',
      internshipsTitle: 'INTERNSHIP EXPERIENCE（インターン経歴）',
      experiencesTitle: 'PROJECTS & ACTIVITIES（学会・交換留学・プロジェクト）',
      techSkillsTitle: 'SKILLS & TOOLS（職務能力および活用ツール）',
      certsTitle: 'CERTIFICATIONS & LANGUAGES（資格および語学）',
      outcomesHeader: '主な業務と成果:',
      emailLabel: 'メール:',
      phoneLabel: '携帯:',
      birthDateLabel: '生年月日:',
      locationLabel: '学籍:',
      fileName: '李嘉妍_履歴書_新卒HR_採用給与実務',
      qrLabel: 'Webポートフォリオ',
      focusLabel: '志望領域フォーカス',
      focusBalanced: '全体バランス',
      focusHrm: '採用・給与/HRM',
      focusHrd: 'HRD・研修運営',
      focusGlobal: 'グローバル・日本事業',
      printTip: '印刷画面で「PDFに保存」を選択すると上記のファイル名(.pdf)で自動保存されます。',
      compactToggle: '要約モード',
      qrToggle: 'QRコード',
      fileLangLabel: '保存ファイル名',
    },
    transcriptModal: {
      badge: 'OFFICIAL ACADEMIC CREDENTIAL',
      title: '神奈川大学 交換留学 学業成績証明書および修了証書',
      subtitle: '日本交換留学（2024.03〜2024.08）履修16単位 全科目 秀・優（S・A）GPA 3.625/4.0 公式証明',
      institution: '日本 神奈川大学（Kanagawa University, Japan）',
      period: '2024年3月〜2024年8月（24.03.18〜24.08.07 修了）',
      tabAll: '全ページを閲覧',
      tabCert: '01. 修了証書（Certificate of Completion）',
      tabJaTranscript: '02. 学業成績証明書（日本語原本）',
      tabEnTranscript: '03. Transcript of Record（英文原本）',
      summaryUnits: '修得単位合計 16単位（3.625/4.0）',
      summaryGrades: '秀（S）6科目・優（A）3科目',
      summaryStatus: '落第なし・優秀成績にて修了',
      downloadBtn: '統合版PDF一括ダウンロード',
      openNewTabBtn: '別タブで開く・保存/印刷',
      closeBtn: '閉じる',
      fileName: '李嘉妍_神奈川大学_交換留学_学業成績証明書_および_修了証書.pdf',
      viewTranscriptBtn: '公式 成績証明書・修了証書原本を確認',
      viewCredentialBtn: '公式証明書を確認',
      docNotice: '交換留学 公式証明書類 統合版（修了証書＋日本語成績証明書＋英文成績証明書 計3ページ）',
      docPagesSummary: '1P 修了証書（Certificate of Completion）・2P 日本語学業成績証明書・3P 英文成績証明書',
    },
  },
};
