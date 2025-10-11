import { useState, useEffect } from "react";
import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { JobSearch } from "./JobSearch";
import { ProjectMatcher } from "./ProjectMatcher";
import { UserProfile } from "./UserProfile";
import { SavedJobs } from "./SavedJobs";
import { AdminPanel } from "./AdminPanel";
import { Features } from "./Features";
import { Footer } from "./Footer";

export const MainApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [savedJobsCount, setSavedJobsCount] = useState(0);

  // Load saved jobs count from localStorage
  useEffect(() => {
    const savedJobs = localStorage.getItem('savedJobs');
    if (savedJobs) {
      const jobs = JSON.parse(savedJobs);
      setSavedJobsCount(jobs.length);
    }
  }, []);

  // Update saved jobs count when jobs are added/removed
  useEffect(() => {
    const handleStorageChange = () => {
      const savedJobs = localStorage.getItem('savedJobs');
      if (savedJobs) {
        const jobs = JSON.parse(savedJobs);
        setSavedJobsCount(jobs.length);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <JobSearch />
            <ProjectMatcher />
            <Features />
          </>
        );
      case 'jobs':
        return <JobSearch />;
      case 'projects':
        return <ProjectMatcher />;
      case 'saved':
        return <SavedJobs />;
      case 'profile':
        return <UserProfile />;
      case 'admin':
        return <AdminPanel />;
      default:
        return (
          <>
            <Hero />
            <JobSearch />
            <ProjectMatcher />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        savedJobsCount={savedJobsCount}
      />
      <main>
        {renderPage()}
      </main>
      {currentPage === 'home' && <Footer />}
    </div>
  );
};
