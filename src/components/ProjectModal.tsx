import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Calendar, UserCheck, CheckCircle2, TrendingUp, Layers, ChevronRight } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { displayProjects, selectedProjectId, setSelectedProjectId, t } = usePortfolio();

  if (!selectedProjectId) return null;

  const project = displayProjects.find((p) => p.id === selectedProjectId);
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1120]/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-[#0B1120] text-white p-6 sm:p-9 border-b border-slate-800">
          <button
            onClick={() => setSelectedProjectId(null)}
            className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label={t.projectModal.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs text-blue-400 mb-2">
            <span className="font-bold">{project.period}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-slate-300">{project.role}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {project.title}
          </h2>
          {project.subtitle && (
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              {project.subtitle}
            </p>
          )}

          {/* Quick Metrics Bar inside Modal Header */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 pt-6 border-t border-slate-800">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-9 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Visual Banner if present */}
          {project.imageUrl && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-72 relative bg-slate-100">
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Project Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.projectModal.overviewTitle}
            </h3>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200/90 font-normal">
              {project.overview}
            </p>
          </div>

          {/* STAR Methodology Breakdown */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>{t.projectModal.starTitle}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Situation */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="text-xs font-bold text-slate-500">
                  {t.projectModal.situationTitle}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {project.situation}
                </p>
              </div>

              {/* Task */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="text-xs font-bold text-slate-500">
                  {t.projectModal.taskTitle}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {project.task}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="text-xs font-bold text-blue-700">
                {t.projectModal.actionTitle}
              </div>
              <div className="space-y-2.5">
                {project.action.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="text-xs font-bold text-emerald-800">
                {t.projectModal.resultTitle}
              </div>
              <div className="space-y-2.5">
                {project.result.map((res, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Applied Skills & Tags */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">{t.projectModal.appliedSkillsTitle}</span>
              {project.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-bold text-slate-700 bg-slate-100 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
              onClick={() => setSelectedProjectId(null)}
              className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              {t.projectModal.closeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
