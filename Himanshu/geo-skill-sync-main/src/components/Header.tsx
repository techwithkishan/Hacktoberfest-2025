import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Navigation className="w-8 h-8 text-primary-glow" />
          <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            OpportunityMap
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-foreground hover:text-primary-glow transition-smooth">
            Find Jobs
          </a>
          <a href="#" className="text-foreground hover:text-primary-glow transition-smooth">
            Match Projects
          </a>
          <a href="#" className="text-foreground hover:text-primary-glow transition-smooth">
            About
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="default" size="sm">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
};