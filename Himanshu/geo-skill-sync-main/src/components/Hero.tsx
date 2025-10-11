import { Button } from "@/components/ui/button";
import { MapPin, Zap, Target } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-subtle opacity-90" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <Zap className="w-4 h-4 text-primary-glow" />
            <span className="text-sm font-medium">AI-Powered Job Matching</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Find Your Perfect Job
            <br />
            <span className="text-primary-glow">Where You Are</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover location-aware opportunities and match your projects to real-world careers with our intelligent platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              <MapPin className="w-5 h-5" />
              Find Local Jobs
            </Button>
            <Button variant="glass" size="lg" className="w-full sm:w-auto">
              <Target className="w-5 h-5" />
              Match My Projects
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-glow rounded-full" />
              <span>Geo-Location Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-glow rounded-full" />
              <span>AI Project Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-glow rounded-full" />
              <span>Real-Time Matching</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary-glow/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent-glow/20 rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
};