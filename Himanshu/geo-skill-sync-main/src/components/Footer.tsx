import { Navigation, Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-gradient-subtle">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Navigation className="w-6 h-6 text-primary-glow" />
              <span className="text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
                OpportunityMap
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              AI-powered job discovery platform that connects your projects to career opportunities.
            </p>
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary-glow cursor-pointer transition-smooth" />
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary-glow cursor-pointer transition-smooth" />
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary-glow cursor-pointer transition-smooth" />
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary-glow transition-smooth">Job Search</a></li>
              <li><a href="#" className="hover:text-primary-glow transition-smooth">Project Matcher</a></li>
              <li><a href="#" className="hover:text-primary-glow transition-smooth">Career Insights</a></li>
              <li><a href="#" className="hover:text-primary-glow transition-smooth">API Access</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary-glow transition-smooth">About Us</a></li>
              <li><a href="#" className="hover:text-primary-glow transition-smooth">Careers</a></li>
              <li><a href="#" className="hover:text-primary-glow transition-smooth">Blog</a></li>
              <li><a href="#" className="hover:text-primary-glow transition-smooth">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary-glow transition-smooth">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-glow transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-glow transition-smooth">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-glow transition-smooth">Status</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 OpportunityMap. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with AI • Powered by Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
};