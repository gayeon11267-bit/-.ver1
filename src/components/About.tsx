import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { BarChart3, Target, Users, CheckCircle, Quote, Download, GraduationCap } from 'lucide-react';

export const About: React.FC = () => {
  const { data, displayEducation, setActiveTab, setIsResumeOpen, t, language } = usePortfolio();
  const { about, hero } = data;

  const bioParagraphs = language === 'ko' && about.bioParagraphs?.length > 0 ? about.bioParagraphs : t.about.bioParagraphs;
  const coreValues = language === 'ko' && about.coreValues?.length > 0 ? about.coreValues : t.about.coreValues;

  const getIcon = (name: string) => {
    switch (name) {
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case 'Target':
        return <Target className="w-5 h-5 text-indigo-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-emerald-600" />;
      default:
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="animate-in fade-in duration-200">
      {/* Dedicated Page Header Banner */}
      <section className="bg-[#0B1120] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <span>DEDICATED PAGE</span>
                <span aria-hidden="true" className="text-slate-600">/</span>
                <span>{t.about.dedicatedTag}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {t.about.pageTitle}
              </h1>
              <p className="text-base text-slate-300 max-w-2xl font-normal">
                {t.about.pageSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsResumeOpen(true)}
                className="px-4 py-3 text-xs font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>{t.nav.resume}</span>
              </button>
              <button
                onClick={() => setActiveTab('internships')}
                className="px-4 py-3 text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-700/70 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{t.nav.internships} →</span>
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className="px-4 py-3 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{t.nav.projects} →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          {/* Narrative & Profile Matrix */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <Quote className="w-4 h-4" />
                <span>{t.about.statementKicker}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {t.about.statementTitle}
              </h2>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                {bioParagraphs.map((para, idx) => (
                  <p key={idx}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Quick Specification Box (No Home Address) */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-7 shadow-sm space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                {t.about.summaryKicker}
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">{t.about.candidateNameLabel}</span>
                  <span className="font-extrabold text-slate-900 text-base">
                    {language === 'ko' ? `${hero.name} (${hero.englishName})` : hero.englishName}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">{t.about.birthDateLabel}</span>
                  <span className="font-semibold text-slate-800">
                    {language === 'ko' ? hero.birthDate || t.about.birthDateValue : t.about.birthDateValue}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">{t.about.positionLabel}</span>
                  <span className="font-bold text-blue-600">{t.about.positionValue}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">{t.about.toolsLabel}</span>
                  <span className="font-medium text-slate-800">{t.about.toolsValue}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">{t.about.globalLabel}</span>
                  <span className="font-medium text-slate-800">{t.about.globalValue}</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">{t.about.degreeLabel}</span>
                  <span className="font-medium text-slate-800">{t.about.degreeValue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Background & Exchange */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {t.skills.eduTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {displayEducation.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 space-y-2.5 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>{edu.period}</span>
                    <span className="text-blue-600">{edu.status}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">{edu.school}</h4>
                  <p className="text-xs font-semibold text-slate-700">{edu.major}</p>
                  {edu.gpa && (
                    <div className="inline-block text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                      {edu.gpa}
                    </div>
                  )}
                  {edu.note && (
                    <p className="text-xs text-slate-500 pt-1 leading-relaxed">{edu.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3 Core Pillars (Why Gayeon Lee) */}
          <div className="space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {t.about.whyHireKicker}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t.about.whyHireTitle}
              </h3>
              <p className="text-sm text-slate-600">
                {t.about.whyHireDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreValues.map((value, idx) => (
                <div
                  key={value.id}
                  className="group bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getIcon(value.iconName)}
                      </div>
                      <span className="text-xs font-extrabold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-blue-600 mb-1">
                      {value.englishTitle}
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">
                      {value.title}
                    </h4>

                    <p className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-2 rounded-lg mb-4">
                      {value.tagline}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {value.description}
                    </p>
                  </div>

                  {/* Bullet points with fine checklist */}
                  <div className="pt-5 border-t border-slate-100 space-y-2.5">
                    <div className="text-xs font-bold text-slate-900 tracking-wide">
                      {t.about.evidenceKicker}
                    </div>
                    {value.bulletPoints.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
