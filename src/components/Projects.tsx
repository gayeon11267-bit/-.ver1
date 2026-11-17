import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, CheckCircle2, Briefcase } from 'lucide-react';

interface ProjectsProps {
  mode?: 'internships' | 'projects';
}

export const Projects: React.FC<ProjectsProps> = ({ mode = 'projects' }) => {
  const { displayProjects, setSelectedProjectId, t } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const isInternshipMode = mode === 'internships';

  const categories = [
    { id: 'all', label: t.projects.catAll },
    { id: 'leadership', label: t.projects.catLeadership },
    { id: 'project', label: t.projects.catProject },
    { id: 'global', label: t.projects.catGlobal },
  ];

  const baseProjects = isInternshipMode
    ? displayProjects.filter((p) => p.category === 'internship')
    : displayProjects.filter((p) => p.category !== 'internship');

  const filteredProjects = isInternshipMode || activeCategory === 'all'
    ? baseProjects
    : baseProjects.filter((p) => p.category === activeCategory);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'internship':
        return t.projects.catInternship;
      case 'leadership':
        return t.projects.catLeadership;
      case 'global':
        return t.projects.catGlobal;
      default:
        return t.projects.catProject;
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
                <span>{isInternshipMode ? t.internships.dedicatedTag : t.projects.dedicatedTag}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {isInternshipMode ? t.internships.pageTitle : t.projects.pageTitle}
              </h1>
              <p className="text-base text-slate-300 max-w-2xl font-normal">
                {isInternshipMode ? t.internships.pageSubtitle : t.projects.pageSubtitle}
              </p>
            </div>

            {/* Category Filter in Header Banner (Projects & Activities mode only) */}
            {!isInternshipMode && (
              <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-700/80 rounded-2xl shrink-0 overflow-x-auto shadow-inner">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cards List */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          {filteredProjects.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
              <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">
                {t.internships.emptyText}
              </p>
            </div>
          ) : (
            filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Left Column: Visual Showcase Container */}
                <div className="lg:col-span-5 relative bg-slate-900 min-h-[300px] lg:min-h-full overflow-hidden flex flex-col justify-end p-8">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  {/* Contrast gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-slate-950/40 to-transparent pointer-events-none" />

                  {/* Overlay Meta */}
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-blue-400 font-bold">
                      <span>
                        {isInternshipMode ? t.internships.casePrefix : 'CASE'} {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true" className="text-slate-500">·</span>
                      <span className="text-slate-300">{project.period}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white">
                      {project.role}
                    </h3>
                  </div>
                </div>

                {/* Right Column: Narrative & Metrics */}
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Clean category kicker */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className={`font-bold uppercase ${isInternshipMode ? 'text-emerald-600' : 'text-blue-600'}`}>
                        {getCategoryLabel(project.category)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium">{project.period}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-slate-600 mb-4">
                      {project.subtitle}
                    </p>

                    <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                      {project.overview}
                    </p>

                    {/* High-Impact Numerical Metric Strip */}
                    <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200/90 rounded-2xl mb-6">
                      {project.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="space-y-0.5">
                          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                            {metric.value}
                          </div>
                          <div className="text-[11px] font-bold text-slate-500 truncate">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Contributions & Results */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-bold text-slate-900 tracking-wide">
                        {isInternshipMode ? t.internships.outcomesTitle : t.projects.outcomesTitle}
                      </div>
                      {project.result.slice(0, 2).map((res, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Controls: Tags & STAR Deep-Dive Modal Button */}
                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setSelectedProjectId(project.id)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow hover:shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>{isInternshipMode ? t.internships.starBtn : t.projects.starBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
