import React, { useState, useEffect, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Language, translations } from '../data/translations';
import { ProjectItem, CertificationItem, EducationItem } from '../types/portfolio';
import { QRCodeSVG } from 'qrcode.react';
import { X, Printer, Globe, QrCode, Copy, Check, SlidersHorizontal, Sparkles } from 'lucide-react';

type ResumeFocusMode = 'balanced' | 'hrm' | 'hrd' | 'global';

export const ResumeModal: React.FC = () => {
  const { data, displayProjects, displayCertifications, displayEducation, isResumeOpen, setIsResumeOpen, t, language } = usePortfolio();

  const [focusMode, setFocusMode] = useState<ResumeFocusMode>('balanced');
  const [fileLang, setFileLang] = useState<Language>(language);
  const [showQr, setShowQr] = useState<boolean>(true);
  const [compactMode, setCompactMode] = useState<boolean>(false);
  const [copiedFilename, setCopiedFilename] = useState<boolean>(false);

  // Sync filename language with site language whenever language changes or modal opens
  useEffect(() => {
    setFileLang(language);
  }, [language, isResumeOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isResumeOpen) {
        setIsResumeOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isResumeOpen, setIsResumeOpen]);

  const portfolioUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/About_GAYEON_LEE`
    : 'https://About_GAYEON_LEE';

  const baseFileName = translations[fileLang].resume.fileName;
  const focusSuffix =
    focusMode === 'hrm' ? '_HRM' : focusMode === 'hrd' ? '_HRD' : focusMode === 'global' ? '_GLOBAL' : '';
  const recommendedBaseName = `${baseFileName}${focusSuffix}`;
  const recommendedPdfName = `${recommendedBaseName}.pdf`;

  const bioParagraphs =
    language === 'ko' && data.about.bioParagraphs?.length > 0
      ? data.about.bioParagraphs
      : t.about.bioParagraphs;
  const rawCoreValues =
    language === 'ko' && data.about.coreValues?.length > 0
      ? data.about.coreValues
      : t.about.coreValues;
  const skillCategories =
    language === 'ko' && data.skillCategories?.length > 0
      ? data.skillCategories
      : t.skills.skillCategories;

  // Focus-aware sorting helpers (non-mutating)
  const prioritizedInternships = useMemo<ProjectItem[]>(() => {
    const list = displayProjects.filter((p) => p.category === 'internship');
    if (focusMode === 'balanced') return list;
    const score = (p: ProjectItem) => {
      const text = `${p.id} ${p.title} ${p.subtitle} ${p.role}`.toLowerCase();
      if (focusMode === 'global') {
        if (text.includes('fnc') || text.includes('글로벌') || text.includes('일본') || text.includes('global') || text.includes('japan')) return 10;
        return 1;
      }
      if (focusMode === 'hrm') {
        if (text.includes('payday') || text.includes('월급날') || text.includes('연말정산') || text.includes('인사')) return 10;
        if (text.includes('fnc')) return 6;
        return 1;
      }
      if (focusMode === 'hrd') {
        if (text.includes('fnc') || text.includes('전략') || text.includes('설문')) return 8;
        return 3;
      }
      return 0;
    };
    return [...list].sort((a, b) => score(b) - score(a));
  }, [displayProjects, focusMode]);

  const prioritizedProjects = useMemo<ProjectItem[]>(() => {
    const list = displayProjects.filter((p) => p.category !== 'internship');
    if (focusMode === 'balanced') return list;
    const score = (p: ProjectItem) => {
      const text = `${p.id} ${p.title} ${p.subtitle} ${p.category} ${p.overview}`.toLowerCase();
      if (focusMode === 'global') {
        if (p.category === 'global' || text.includes('kanagawa') || text.includes('가나가와') || text.includes('일본') || text.includes('exchange')) return 12;
        if (text.includes('ku-pital') || text.includes('academic-hr')) return 5;
        return 1;
      }
      if (focusMode === 'hrd') {
        if (text.includes('ku-pital') || text.includes('academic-hr') || p.category === 'leadership') return 12;
        if (text.includes('정책') || text.includes('청년') || text.includes('서포터즈')) return 7;
        return 2;
      }
      if (focusMode === 'hrm') {
        if (text.includes('ku-pital') || text.includes('academic-hr')) return 10;
        if (text.includes('crm') || text.includes('정책')) return 5;
        return 1;
      }
      return 0;
    };
    return [...list].sort((a, b) => score(b) - score(a));
  }, [displayProjects, focusMode]);

  const prioritizedEducation = useMemo<EducationItem[]>(() => {
    if (focusMode !== 'global') return displayEducation;
    return [...displayEducation].sort((a, b) => {
      const aGlobal = a.id.includes('kanagawa') || a.school.toLowerCase().includes('kanagawa') || a.school.includes('가나가와') ? 1 : 0;
      const bGlobal = b.id.includes('kanagawa') || b.school.toLowerCase().includes('kanagawa') || b.school.includes('가나가와') ? 1 : 0;
      return bGlobal - aGlobal;
    });
  }, [displayEducation, focusMode]);

  const prioritizedCoreValues = useMemo(() => {
    if (focusMode === 'balanced') return rawCoreValues;
    const score = (id: string, title: string) => {
      const text = `${id} ${title}`.toLowerCase();
      if (focusMode === 'hrm' && (text.includes('data') || text.includes('데이터'))) return 10;
      if (focusMode === 'hrd' && (text.includes('initiative') || text.includes('조직') || text.includes('리더'))) return 10;
      if (focusMode === 'global' && (text.includes('initiative') || text.includes('글로벌') || text.includes('global'))) return 10;
      if (text.includes('business') || text.includes('전략')) return 6;
      return 2;
    };
    return [...rawCoreValues].sort((a, b) => score(b.id, b.title) - score(a.id, a.title));
  }, [rawCoreValues, focusMode]);

  const prioritizedCertifications = useMemo<CertificationItem[]>(() => {
    if (focusMode === 'balanced') return displayCertifications;
    const score = (c: CertificationItem) => {
      const text = `${c.name} ${c.category}`.toLowerCase();
      if (focusMode === 'global') {
        if (c.category === 'lang' || text.includes('jlpt') || text.includes('jpt') || text.includes('toeic')) return 10;
        return 1;
      }
      if (focusMode === 'hrm') {
        if (text.includes('erp') || text.includes('인사') || text.includes('컴퓨터') || text.includes('excel')) return 10;
        return 2;
      }
      if (focusMode === 'hrd') {
        if (text.includes('한자') || text.includes('erp') || c.category === 'cert') return 8;
        return 3;
      }
      return 0;
    };
    return [...displayCertifications].sort((a, b) => score(b) - score(a));
  }, [displayCertifications, focusMode]);

  const activeSkillList = useMemo(() => {
    if (focusMode === 'hrm') {
      // Combine HR/Domain category (if present) and Data Tools
      const hrCat = skillCategories[1];
      const dataCat = skillCategories[0];
      return [...(hrCat?.skills || []).slice(0, 3), ...(dataCat?.skills || []).slice(0, 3)];
    }
    if (focusMode === 'global') {
      const langCat = skillCategories[2];
      const dataCat = skillCategories[0];
      return [...(langCat?.skills || []).slice(0, 3), ...(dataCat?.skills || []).slice(0, 3)];
    }
    if (focusMode === 'hrd') {
      const hrCat = skillCategories[1];
      const dataCat = skillCategories[0];
      return [...(hrCat?.skills || []).slice(0, 2), ...(dataCat?.skills || []).slice(0, 3)];
    }
    return skillCategories[0]?.skills || [];
  }, [skillCategories, focusMode]);

  const sectionOrder: Array<'summary' | 'education' | 'competencies' | 'internships' | 'projects' | 'skillsAndCerts'> = useMemo(() => {
    switch (focusMode) {
      case 'hrm':
        return ['summary', 'competencies', 'internships', 'skillsAndCerts', 'education', 'projects'];
      case 'hrd':
        return ['summary', 'competencies', 'projects', 'internships', 'education', 'skillsAndCerts'];
      case 'global':
        return ['summary', 'education', 'internships', 'projects', 'skillsAndCerts', 'competencies'];
      default:
        return ['summary', 'education', 'competencies', 'internships', 'projects', 'skillsAndCerts'];
    }
  }, [focusMode]);

  if (!isResumeOpen) return null;

  const handlePrint = () => {
    const previousTitle = document.title;
    document.title = recommendedBaseName;

    let restored = false;
    const restoreTitle = () => {
      if (restored) return;
      restored = true;
      document.title = previousTitle;
    };

    window.addEventListener('afterprint', restoreTitle, { once: true });
    setTimeout(() => {
      window.print();
    }, 60);
    setTimeout(restoreTitle, 5000);
  };

  const handleCopyFilename = () => {
    navigator.clipboard.writeText(recommendedPdfName);
    setCopiedFilename(true);
    setTimeout(() => setCopiedFilename(false), 2000);
  };

  const focusOptions: { id: ResumeFocusMode; label: string }[] = [
    { id: 'balanced', label: t.resume.focusBalanced },
    { id: 'hrm', label: t.resume.focusHrm },
    { id: 'hrd', label: t.resume.focusHrd },
    { id: 'global', label: t.resume.focusGlobal },
  ];

  const fileLangOptions: { code: Language; label: string }[] = [
    { code: 'ko', label: 'KR' },
    { code: 'en', label: 'EN' },
    { code: 'ja', label: 'JP' },
  ];

  const renderSection = (key: typeof sectionOrder[number]) => {
    switch (key) {
      case 'summary':
        return (
          <section key="summary" className="space-y-2.5 break-inside-avoid">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 break-after-avoid">
              {t.resume.summaryTitle}
            </h2>
            {(compactMode ? bioParagraphs.slice(0, 1) : bioParagraphs.slice(0, 2)).map((para, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {para}
              </p>
            ))}
          </section>
        );

      case 'education':
        return (
          <section key="education" className="space-y-3 break-inside-avoid">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 break-after-avoid">
              {t.resume.educationTitle}
            </h2>
            <div className="space-y-2.5">
              {prioritizedEducation.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs break-inside-avoid">
                  <div>
                    <span className="font-bold text-slate-900">{edu.school}</span>
                    <span className="text-slate-600"> · {edu.major}</span>
                    {edu.gpa && <span className="ml-1.5 font-bold text-blue-700">({edu.gpa})</span>}
                  </div>
                  <div className="text-slate-500 font-medium whitespace-nowrap">
                    {edu.period} · <span className="text-slate-700 font-semibold">{edu.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'competencies':
        return (
          <section key="competencies" className="space-y-2.5 break-inside-avoid">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 break-after-avoid">
              {t.resume.competenciesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {prioritizedCoreValues.map((val, idx) => (
                <div
                  key={val.id}
                  className={`p-4 rounded-xl border break-inside-avoid ${
                    focusMode !== 'balanced' && idx === 0
                      ? 'bg-blue-50/70 border-blue-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900 mb-1">{val.title}</div>
                  <p className="text-[11px] text-slate-600 leading-snug">{val.tagline}</p>
                </div>
              ))}
            </div>
          </section>
        );

      case 'internships':
        return (
          <section key="internships" className="space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 break-after-avoid">
              {t.resume.internshipsTitle}
            </h2>

            <div className="space-y-5">
              {prioritizedInternships.map((proj) => {
                const outcomes = compactMode ? proj.result?.slice(0, 2) : proj.result;
                return (
                  <div key={proj.id} className="space-y-1.5 break-inside-avoid">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {proj.title}{' '}
                        {proj.subtitle && <span className="text-xs font-normal text-slate-600">· {proj.subtitle}</span>}
                      </h3>
                      <div className="text-xs text-slate-500 whitespace-nowrap font-medium">
                        {proj.period}
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-emerald-700">
                      {proj.role}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {proj.overview}
                    </p>

                    {outcomes && outcomes.length > 0 && (
                      <div className="space-y-1 pl-1 pt-0.5">
                        <div className="text-[11px] font-bold text-slate-800">{t.resume.outcomesHeader}</div>
                        {outcomes.map((res, rIdx) => (
                          <div key={rIdx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{res}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'projects':
        return (
          <section key="projects" className="space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 break-after-avoid">
              {t.resume.experiencesTitle}
            </h2>

            <div className="space-y-5">
              {(compactMode ? prioritizedProjects.slice(0, 4) : prioritizedProjects).map((proj) => {
                const outcomes = compactMode ? proj.result?.slice(0, 2) : proj.result;
                return (
                  <div key={proj.id} className="space-y-1.5 break-inside-avoid">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {proj.title}{' '}
                        {proj.subtitle && <span className="text-xs font-normal text-slate-600">· {proj.subtitle}</span>}
                      </h3>
                      <div className="text-xs text-slate-500 whitespace-nowrap font-medium">
                        {proj.period}
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-blue-800">
                      {proj.role}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {proj.overview}
                    </p>

                    {outcomes && outcomes.length > 0 && (
                      <div className="space-y-1 pl-1 pt-0.5">
                        <div className="text-[11px] font-bold text-slate-800">{t.resume.outcomesHeader}</div>
                        {outcomes.map((res, rIdx) => (
                          <div key={rIdx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{res}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'skillsAndCerts':
        return (
          <section key="skillsAndCerts" className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 break-inside-avoid">
            <div className="space-y-2.5 break-inside-avoid">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 break-after-avoid">
                {t.resume.techSkillsTitle}
              </h2>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                {activeSkillList.map((skill, idx) => (
                  <li key={idx}>
                    • <strong>{skill.name}:</strong> {skill.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5 break-inside-avoid">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 break-after-avoid">
                {t.resume.certsTitle}
              </h2>
              <div className="space-y-2 text-xs text-slate-700">
                {prioritizedCertifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-bold text-slate-900">{cert.name}</span>
                    <span className="text-slate-600 text-[11px] font-semibold tabular-nums">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div
      className="resume-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1120]/80 backdrop-blur-md overflow-y-auto"
      onClick={() => setIsResumeOpen(false)}
    >
      <div
        className="resume-modal-shell relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-4 border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Optimization & Print Action Bar (Hidden on Print) */}
        <div className="p-4 sm:p-5 bg-[#0B1120] text-white no-print border-b border-slate-800 space-y-3 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-bold text-blue-400 shrink-0">RESUME & PROFILE</span>
              <span className="text-xs text-slate-400 truncate">| {t.resume.title}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Language Switcher for Exported PDF Filename */}
              <div className="flex items-center gap-0.5 p-1 bg-slate-900 border border-slate-700 rounded-xl">
                <span className="px-2 text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-blue-400" />
                  <span className="hidden sm:inline">{t.resume.fileLangLabel}:</span>
                </span>
                {fileLangOptions.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setFileLang(opt.code)}
                    className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                      fileLang === opt.code
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.resume.printBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsResumeOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Row 2: Job Focus Presets, Toggles & PDF Filename Guide */}
          <div className="pt-3 border-t border-slate-800/90 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3 h-3 text-blue-400" />
                <span>{t.resume.focusLabel}:</span>
              </span>
              {focusOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFocusMode(opt.id)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                    focusMode === opt.id
                      ? 'bg-white text-slate-950 border-white shadow-xs'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setCompactMode(!compactMode)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                  compactMode
                    ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/60'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>{t.resume.compactToggle}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowQr(!showQr)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                  showQr
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500/60'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <QrCode className="w-3 h-3" />
                <span>{t.resume.qrToggle}</span>
              </button>
            </div>
          </div>

          {/* Row 3: Recommended PDF Save Filename & Print Guide */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-slate-400 font-bold shrink-0">PDF:</span>
              <span className="text-blue-300 font-bold truncate">{recommendedPdfName}</span>
              <button
                type="button"
                onClick={handleCopyFilename}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer shrink-0"
                title="추천 파일명 복사"
              >
                {copiedFilename ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedFilename ? '복사됨' : '복사'}</span>
              </button>
            </div>
            <span className="text-slate-400">{t.resume.printTip}</span>
          </div>
        </div>

        {/* Printable Resume Document Canvas (No Street Address) */}
        <div className="resume-print-canvas p-8 sm:p-12 overflow-y-auto bg-white text-slate-900 space-y-8">
          {/* Header with Contact & Portfolio QR Code */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-5 break-inside-avoid">
            <div className="space-y-1">
              <div className="text-xs font-bold text-blue-700 tracking-wider">
                {t.resume.badge}
                {focusMode !== 'balanced' && (
                  <span className="ml-2 text-slate-500">
                    · {focusOptions.find((f) => f.id === focusMode)?.label}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {data.hero.name} <span className="text-lg font-bold text-slate-500">({data.hero.englishName})</span>
              </h1>
              <p className="text-sm font-semibold text-slate-600">
                {language === 'ko'
                  ? data.hero.role
                  : data.hero.translations?.[language]?.role?.trim() || t.hero.role}
              </p>
            </div>

            <div className="flex items-end gap-4 sm:justify-end">
              <div className="text-xs text-slate-600 space-y-1 sm:text-right font-medium">
                <div>
                  {t.resume.birthDateLabel}{' '}
                  <strong className="text-slate-900">
                    {language === 'ko' ? data.hero.birthDate : t.about.birthDateValue}
                  </strong>
                </div>
                <div>
                  {t.resume.emailLabel} <strong className="text-slate-900">{data.contact.email}</strong>
                </div>
                <div>
                  {t.resume.locationLabel} {t.contact.locationValue}
                </div>
              </div>

              {showQr && (
                <div className="flex flex-col items-center p-2 bg-white border border-slate-200 rounded-xl shadow-2xs shrink-0">
                  <QRCodeSVG
                    value={portfolioUrl}
                    size={64}
                    level="M"
                    bgColor="#FFFFFF"
                    fgColor="#0F172A"
                  />
                  <span className="mt-1 text-[9px] font-extrabold text-slate-700 tracking-tight whitespace-nowrap">
                    {t.resume.qrLabel}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamically Reordered Sections Based on Target Role Focus */}
          {sectionOrder.map((sectionKey) => renderSection(sectionKey))}

          <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-400 font-bold break-inside-avoid">
            {data.hero.englishName} · Entry-Level HR (Recruiting & Payroll) Resume · {portfolioUrl.replace(/^https?:\/\//, '')}
          </div>
        </div>
      </div>
    </div>
  );
};
