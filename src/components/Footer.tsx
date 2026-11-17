import React from 'react';
import { usePortfolio, PageTab } from '../context/PortfolioContext';
import { Language } from '../data/translations';
import { ArrowUp, Mail, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsAdminOpen, activeTab, setActiveTab, language, setLanguage, t } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageTab; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'internships', label: t.nav.internships },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-[#0B1120] text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-sm font-extrabold text-white flex items-center gap-2 justify-center md:justify-start">
              <span>{data.hero.englishName}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-medium">
                {language === 'ko'
                  ? '신입 HR · 채용·급여 실무 포트폴리오'
                  : language === 'ja'
                  ? '新卒人事（採用・給与実務）ポートフォリオ'
                  : 'Entry-Level HR · Recruiting & Payroll'}
              </span>
            </div>
            <p className="text-slate-400">
              {language === 'ko'
                ? '꼼꼼한 숫자와 서류 확인으로, 사람과 현장을 든든하게 잇습니다.'
                : language === 'ja'
                ? '丁寧な数字と書類の確認で、人と現場をしっかりと支えます。'
                : 'Verifying every detail accurately, supporting people on the ground.'}
            </p>
          </div>

          {/* Quick Page Nav Links in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-300">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-colors cursor-pointer ${
                  activeTab === item.id ? 'text-blue-400 font-extrabold' : 'hover:text-white text-slate-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            {/* Language switch */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 rounded-lg p-0.5">
              {(['ko', 'en', 'ja'] as Language[]).map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer ${
                    language === code ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            <a
              href={`mailto:${data.contact.email}`}
              className="hover:text-white transition-colors flex items-center gap-1.5 font-bold"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{data.contact.email}</span>
            </a>
            <a
              href={data.contact.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 font-bold"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="맨 위로"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-slate-500 text-[11px]">
          <div
            onDoubleClick={() => setIsAdminOpen(true)}
            className="select-none"
          >
            © {new Date().getFullYear()} {data.hero.englishName}. All rights reserved.
          </div>
          <div className="text-slate-500">
            Multilingual (KR / EN / JP) · 100% Pretendard Typography
          </div>
        </div>
      </div>
    </footer>
  );
};
