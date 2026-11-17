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

export default function App() {
  return (
    <PortfolioProvider>
      <MainView />
    </PortfolioProvider>
  );
}
