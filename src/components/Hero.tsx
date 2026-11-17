import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MapPin, ArrowUpRight, Download, GraduationCap } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data, setIsResumeOpen, setActiveTab, t, language } = usePortfolio();
  const { hero } = data;

  const heroCustom = language === 'ko' ? undefined : hero.translations?.[language];
  const currentBadge = language === 'ko' ? hero.badge : heroCustom?.badge?.trim() || t.hero.badge;
  const currentStatus = language === 'ko' ? hero.status : heroCustom?.status?.trim() || t.hero.status;
  const currentLocation = language === 'ko' ? hero.location : t.hero.location;
  const currentHeadline = language === 'ko' ? hero.mainHeadline : heroCustom?.mainHeadline?.trim() || t.hero.mainHeadline;
  const currentSubHeadline = language === 'ko' ? hero.subHeadline : heroCustom?.subHeadline?.trim() || t.hero.subHeadline;
  const pillars =
    language === 'ko' && hero.highlightPillars?.length === 3
      ? hero.highlightPillars.map((p) => ({ title: p.title, desc: p.summary }))
      : [
          { title: t.hero.pillar01Title, desc: t.hero.pillar01Desc },
          { title: t.hero.pillar02Title, desc: t.hero.pillar02Desc },
          { title: t.hero.pillar03Title, desc: t.hero.pillar03Desc },
        ];

  return (
    <div className="relative bg-[#0B1120] text-white overflow-hidden pt-12 pb-20 border-b border-slate-800">
      {/* Visual lighting background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-b from-blue-600/15 to-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Split Hero 2-Column Grid (Photo-free Clean Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Typographic Narrative & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Clean Kicker */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold tracking-wide">
                {currentBadge}
              </span>
              {currentLocation && (
                <>
                  <span aria-hidden="true" className="text-slate-600">/</span>
                  <span className="text-slate-300 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    {currentLocation}
                  </span>
                </>
              )}
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span className="text-emerald-400 font-bold">
                {currentStatus}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-[1.25]" style={{ textWrap: 'balance' }}>
                {currentHeadline.split('\n').map((line, idx) => (
                  <span key={idx} className="block">
                    {idx === 0 ? (
                      line
                    ) : (
                      <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-white bg-clip-text text-transparent">
                        {line}
                      </span>
                    )}
                  </span>
                ))}
              </h1>

              <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed font-normal max-w-2xl pt-1">
                {currentSubHeadline}
              </p>
            </div>

            {/* CTAs with direct page navigation */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setIsResumeOpen(true)}
                className="px-5 py-3.5 text-xs sm:text-sm font-extrabold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md hover:shadow-xl flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>{t.hero.ctaResume}</span>
              </button>

              <button
                onClick={() => setActiveTab('internships')}
                className="px-4 py-3.5 text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-700/70 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer hover:text-white"
              >
                <span>{t.hero.ctaInternships}</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className="px-4 py-3.5 text-xs sm:text-sm font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer hover:text-white"
              >
                <span>{t.hero.ctaProjects}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className="px-3.5 py-3.5 text-xs sm:text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{t.hero.ctaContact}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean Candidate Snapshot & KPI Summary Card (No Photo) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/85 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 backdrop-blur-sm">
              {/* Candidate Identity Header */}
              <div className="flex items-start justify-between gap-3 pb-5 border-b border-slate-800">
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {language === 'ja' ? 'イ・ガヨン' : language === 'en' ? 'Gayeon Lee' : hero.name}
                    </h2>
                    <span className="text-xs font-bold text-blue-400 tracking-wider">
                      {hero.englishName}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                    {t.hero.candidateCardRole}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded-md shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t.hero.candidateCardStatus}
                </span>
              </div>

              {/* Institutional KPI Strip */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="space-y-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight tabular-nums">
                    {t.hero.kpis.kpi1Value}
                  </div>
                  <div className="text-[11px] font-bold text-slate-200">{t.hero.kpis.kpi1Title}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{t.hero.kpis.kpi1Desc}</div>
                </div>

                <div className="space-y-1 border-l border-slate-800 pl-3">
                  <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight tabular-nums">
                    {t.hero.kpis.kpi2Value}
                  </div>
                  <div className="text-[11px] font-bold text-slate-200">{t.hero.kpis.kpi2Title}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{t.hero.kpis.kpi2Desc}</div>
                </div>

                <div className="space-y-1 border-l border-slate-800 pl-3">
                  <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight tabular-nums">
                    {t.hero.kpis.kpi3Value}
                  </div>
                  <div className="text-[11px] font-bold text-slate-200">{t.hero.kpis.kpi3Title}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{t.hero.kpis.kpi3Desc}</div>
                </div>
              </div>

              {/* Compact Academic & Birth Info Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  {t.contact.locationValue}
                </span>
                <span className="font-semibold text-slate-400 tabular-nums">
                  {language === 'ko' ? hero.birthDate : '2003.11.26'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Full-Width Highlight Pillars below Hero Split */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-400 tracking-wider">
                  PILLAR 0{idx + 1}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  CORE ASSET
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
