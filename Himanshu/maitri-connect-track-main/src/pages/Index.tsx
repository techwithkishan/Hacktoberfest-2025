import { useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LandingPage } from "@/components/LandingPage";
import { RegistrationForm } from "@/components/RegistrationForm";
import { WorkerLogin } from "@/components/WorkerLogin";
import { WorkerDashboard } from "@/components/WorkerDashboard";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Language } from "@/utils/translations";

type Page = 'landing' | 'register' | 'login' | 'dashboard' | 'admin-login' | 'admin-dashboard';

const Index = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentMaitriId, setCurrentMaitriId] = useState<string>("");
  const [currentWorkerData, setCurrentWorkerData] = useState<any>(null);
  const [currentAdminData, setCurrentAdminData] = useState<any>(null);

  const handleRegistrationComplete = (maitriId: string, workerData: any) => {
    setCurrentMaitriId(maitriId);
    setCurrentWorkerData(workerData);
    setCurrentPage('dashboard');
  };

  const handleLogin = (maitriId: string, workerData: any) => {
    setCurrentMaitriId(maitriId);
    setCurrentWorkerData(workerData);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: 'register' | 'login' | 'admin') => {
    if (page === 'admin') {
      setCurrentPage('admin-login');
      return;
    }
    setCurrentPage(page);
  };

  const handleAdminLogin = (adminData: any) => {
    setCurrentAdminData(adminData);
    setCurrentPage('admin-dashboard');
  };

  const handleLogout = () => {
    setCurrentMaitriId("");
    setCurrentWorkerData(null);
    setCurrentAdminData(null);
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen">
      {/* Language Selector - Always visible */}
      <div className="fixed top-4 right-4 z-50 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <LanguageSelector currentLanguage={language} onLanguageChange={(lang) => setLanguage(lang as Language)} />
      </div>

      {/* Page Content */}
      {currentPage === 'landing' && (
        <LandingPage language={language} onNavigate={handleNavigate} />
      )}

      {currentPage === 'register' && (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
          <RegistrationForm language={language} onRegistrationComplete={handleRegistrationComplete} />
        </div>
      )}

      {currentPage === 'login' && (
        <WorkerLogin language={language} onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />
      )}

      {currentPage === 'dashboard' && currentWorkerData && (
        <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Logout
              </button>
            </div>
            <WorkerDashboard 
              maitriId={currentMaitriId} 
              workerData={currentWorkerData}
              language={language}
            />
          </div>
        </div>
      )}

      {currentPage === 'admin-login' && (
        <AdminLogin onLogin={handleAdminLogin} onBack={() => setCurrentPage('landing')} />
      )}

      {currentPage === 'admin-dashboard' && currentAdminData && (
        <AdminDashboard adminData={currentAdminData} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
