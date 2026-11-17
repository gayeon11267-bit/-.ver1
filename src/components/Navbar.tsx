import React, { useState, useEffect } from 'react';
import { usePortfolio, PageTab } from '../context/PortfolioContext';
import { Language } from '../data/translations';
import { Lock, FileText, Menu, X, ArrowUpRight, Share2, Linkedin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    data,
    isAuthenticated,
    setIsAdminOpen,
    setIsResumeOpen,
    inquiries,
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    t,
  } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadCount = inquiries.filter((inq) => !inq.read).length;

  const navItems: { id: PageTab; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'internships', label: t.nav.internships },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'ko', label: 'KR' },
    { code: 'en', label: 'EN' },
    { code: 'ja', label: 'JP' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/20 py-3'
          : 'bg-[#0B1120] border-b border-slate-800/80 py-4'
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 min-w-0">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="group flex items-center gap-2.5 text-white hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-extrabold text-white text-xs shadow-sm group-hover:bg-blue-500 transition-colors shrink-0">
            HR
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-extrabold tracking-tight text-white leading-tight">
              {data.hero.englishName}
            </span>
            <span className="hidden sm:inline text-[10px] font-semibold text-blue-400 tracking-wider truncate">
              {language === 'ko'
                ? '신입 HR · 채용·급여 실무'
                : language === 'ja'
                ? '新卒人事（採用・給与実務）'
                : 'Entry-Level HR · Recruiting & Payroll'}
            </span>
          </div>
        </button>

        {/* Zone 2: Dedicated Page Tabs (Visual Tab Switcher) */}
        <nav className="hidden lg:flex items-center gap-0.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner shrink-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 xl:px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher, LinkedIn, Actions & Admin trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher (KR / EN / JP) */}
          <div className="flex items-center p-0.5 bg-slate-900 border border-slate-700/80 rounded-lg shrink-0">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-1.5 sm:px-2 py-1 text-[10px] sm:text-[11px] font-extrabold rounded-md transition-all cursor-pointer ${
                  language === lang.code
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`${lang.label} 언어로 전환`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* LinkedIn Direct Link Tab */}
          <a
            href={data.contact.linkedIn}
            target="_blank"
            rel="noreferrer"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-[#0A66C2] border border-slate-700 rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
            title="LinkedIn 프로필 바로가기"
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
            <span>LinkedIn</span>
          </a>

          {/* Copy URL with /About_GAYEON_LEE */}
          <button
            onClick={() => {
              const url = `${window.location.origin}/About_GAYEON_LEE`;
              navigator.clipboard.writeText(url);
              setCopiedUrl(true);
              setTimeout(() => setCopiedUrl(false), 2000);
            }}
            className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="포트폴리오 주소 복사"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-400" />
            <span>{copiedUrl ? t.nav.copiedUrl : t.nav.copyUrl}</span>
          </button>

          {/* Quick Resume Button */}
          <button
            onClick={() => setIsResumeOpen(true)}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
            title="이력서 열람 및 PDF 인쇄"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.nav.resume}</span>
          </button>

          {/* Primary CTA button: switches to Contact page */}
          <button
            onClick={() => setActiveTab('contact')}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-blue-500 text-white ring-2 ring-blue-400'
                : 'bg-white hover:bg-slate-100 text-slate-950'
            }`}
          >
            <span className="hidden sm:inline">{t.nav.propose}</span>
            <span className="sm:hidden">{language === 'ja' ? '面談' : language === 'ko' ? '제안' : 'Contact'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </button>

          {/* Admin Mode Trigger (Visible ONLY after owner is already authenticated) */}
          {isAuthenticated && (
            <button
              onClick={() => setIsAdminOpen(true)}
              className="relative p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
              title="관리자 콘솔"
              aria-label="관리자 콘솔"
            >
              <Lock className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-950 animate-pulse" />
              )}
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white shrink-0"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1120] border-b border-slate-800 px-6 py-4 space-y-2 animate-in fade-in duration-150">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            {/* Language toggle for mobile */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400 mr-1 font-bold">LANG:</span>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 text-xs font-bold rounded ${
                    language === lang.code ? 'bg-blue-600 text-white' : 'text-slate-400'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* LinkedIn for mobile */}
            <a
              href={data.contact.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-400 hover:text-white flex items-center gap-1 font-bold"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsResumeOpen(true);
              }}
              className="hover:text-white flex items-center gap-1.5 font-bold"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              {t.nav.resume}
            </button>
            {isAuthenticated && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="hover:text-white flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                {t.nav.admin}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
