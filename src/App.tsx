import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { AdminModal } from './components/AdminModal';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

const MainView: React.FC = () => {
  const { activeTab, isResumeOpen } = usePortfolio();

  React.useEffect(() => {
    if (isResumeOpen) {
      document.body.classList.add('resume-printing');
    } else {
      document.body.classList.remove('resume-printing');
    }
    return () => {
      document.body.classList.remove('resume-printing');
    };
  }, [isResumeOpen]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      <div className="app-shell-print-hide flex-1 flex flex-col justify-between">
        {/* 1. Header with Dedicated Page Tab Switcher */}
        <Navbar />

        {/* 2. Dynamic Dedicated Page Routing */}
        <main className="flex-1">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'about' && <About />}
          {activeTab === 'internships' && <Projects mode="internships" />}
          {activeTab === 'projects' && <Projects mode="projects" />}
          {activeTab === 'skills' && <Skills />}
          {activeTab === 'contact' && <Contact />}
        </main>

        {/* 3. Footer */}
        <Footer />
      </div>

      {/* 4. Global Modals */}
      <div className="app-shell-print-hide">
        <ProjectModal />
        <AdminModal />
      </div>
      <ResumeModal />
    </div>
  );
};

interface ErrorBoundaryState {
  hasError: boolean;
}

class RootErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Portfolio render error:', error);
  }

  handleRecover = () => {
    try {
      localStorage.removeItem('gayeon_portfolio_data_v6');
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
            <h1 className="text-xl font-extrabold">화면을 불러오는 중 문제가 발생했습니다</h1>
            <p className="text-sm text-slate-400">
              캐시된 데이터 충돌로 화면 표시가 중단되었습니다. 아래 버튼을 누르면 최신 상태로 다시 불러옵니다.
            </p>
            <button
              type="button"
              onClick={this.handleRecover}
              className="px-5 py-2.5 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors cursor-pointer"
            >
              새로고침하여 복구
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <RootErrorBoundary>
      <PortfolioProvider>
        <MainView />
      </PortfolioProvider>
    </RootErrorBoundary>
  );
}
