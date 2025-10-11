import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JobSearch } from "@/components/JobSearch";
import { ProjectMatcher } from "@/components/ProjectMatcher";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <JobSearch />
      <ProjectMatcher />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
