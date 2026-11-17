import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Hero } from './Hero';
import { ArrowRight, UserCheck, Briefcase, FolderKanban, Award, Mail } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { data, displayProjects, setActiveTab, setSelectedProjectId, t } = usePortfolio();

  const internshipHighlights = displayProjects.filter((p) => p.category === 'internship');
  const projectPool = displayProjects.filter((p) => p.category !== 'internship');
  const featuredProjectPool = projectPool.filter((p) => p.featured !== false);
  const projectHighlights = featuredProjectPool.length > 0 ? featuredProjectPool : projectPool.slice(0, 4);

  return (
    <div className="space-y-0 animate-in fade-in duration-200">
      {/* 1. Impactful Hero Section */}
      <Hero />

      {/* 2. Visual Portal Cards to Dedicated Pages */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                {t.home.portalKicker}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t.home.portalTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              {t.home.portalDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* Card 1: About */}
            <div
              onClick={() => setActiveTab('about')}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-500/80 p-6 rounded-3xl transition-all shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="w-11 h-11 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {t.home.portalAboutTitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {t.home.portalAboutDesc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>{t.home.openPage}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Internships */}
            <div
              onClick={() => setActiveTab('internships')}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-500/80 p-6 rounded-3xl transition-all shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {t.home.portalInternshipsTitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {t.home.portalInternshipsDesc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>{t.home.openPage}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Projects */}
            <div
              onClick={() => setActiveTab('projects')}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-500/80 p-6 rounded-3xl transition-all shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="w-11 h-11 rounded-2xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {t.home.portalProjectsTitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {t.home.portalProjectsDesc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>{t.home.openPage}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Skills */}
            <div
              onClick={() => setActiveTab('skills')}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-500/80 p-6 rounded-3xl transition-all shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="w-11 h-11 rounded-2xl bg-sky-100/70 text-sky-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {t.home.portalSkillsTitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {t.home.portalSkillsDesc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>{t.home.openPage}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 5: Contact */}
            <div
              onClick={() => setActiveTab('contact')}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-500/80 p-6 rounded-3xl transition-all shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {t.home.portalContactTitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {t.home.portalContactDesc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-amber-600">
                <span>{t.home.openPage}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3A. Corporate Internship Highlights */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">
                  {t.home.featuredInternshipsKicker}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {t.home.featuredInternshipsTitle}
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('internships')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
              >
                <span>{t.home.viewAllInternships}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internshipHighlights.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="bg-white border border-slate-200/90 hover:border-emerald-300 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold text-emerald-600 uppercase">
                        {t.projects.catInternship} · {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{proj.period}</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">
                      {proj.subtitle}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {proj.overview}
                    </p>

                    {proj.metrics && proj.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        {proj.metrics.slice(0, 3).map((m, mIdx) => (
                          <div key={mIdx}>
                            <div className="text-sm font-extrabold text-slate-900 tabular-nums truncate">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
                    >
                      {t.home.starModalBtn}
                    </button>
                    <button
                      onClick={() => setActiveTab('internships')}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t.home.openPage}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3B. Major Projects & Activities Highlights */}
          <div className="pt-12 border-t border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                  {t.home.featuredProjectsKicker}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {t.home.featuredProjectsTitle}
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('projects')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <span>{t.home.viewAllProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectHighlights.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="bg-white border border-slate-200/90 hover:border-blue-300 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold text-blue-600 uppercase">
                        {proj.category === 'leadership'
                          ? t.projects.catLeadership
                          : proj.category === 'global'
                          ? t.projects.catGlobal
                          : t.projects.catProject} · {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{proj.period}</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">
                      {proj.subtitle}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {proj.overview}
                    </p>

                    {proj.metrics && proj.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        {proj.metrics.slice(0, 3).map((m, mIdx) => (
                          <div key={mIdx}>
                            <div className="text-sm font-extrabold text-slate-900 tabular-nums truncate">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
                    >
                      {t.home.starModalBtn}
                    </button>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t.home.openPage}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Instant Proposal Banner */}
      <section className="py-16 bg-[#0B1120] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              {t.home.ctaBannerTitle}
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              {t.home.ctaBannerDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3.5 text-xs sm:text-sm font-extrabold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md hover:shadow-xl cursor-pointer"
            >
              {t.home.ctaBannerBtn}
            </button>
            <a
              href={`mailto:${data.contact.email}`}
              className="px-5 py-3.5 text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            >
              {t.home.ctaBannerEmail}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
