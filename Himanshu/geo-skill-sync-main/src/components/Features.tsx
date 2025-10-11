import { Card } from "@/components/ui/card";
import { MapPin, Brain, Target, Zap, Users, Shield } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Location Intelligence",
    description: "Smart geo-location detection prioritizes local opportunities before suggesting remote options.",
    color: "text-primary-glow"
  },
  {
    icon: Brain,
    title: "AI Project Analysis",
    description: "Advanced NLP extracts skills from your GitHub projects and matches them to real job requirements.",
    color: "text-accent-glow"
  },
  {
    icon: Target,
    title: "Smart Matching",
    description: "Our algorithm ranks opportunities based on skill compatibility, location, and career goals.",
    color: "text-primary-glow"
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Live job feeds from LinkedIn, Internshala, and NCS ensure you never miss new opportunities.",
    color: "text-accent-glow"
  },
  {
    icon: Users,
    title: "Career Insights",
    description: "Discover which companies and industries are actively hiring for your skill set.",
    color: "text-primary-glow"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays secure with privacy-first design and transparent data handling practices.",
    color: "text-accent-glow"
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Intelligent Job Discovery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the future of job searching with AI-powered matching and location intelligence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="glass p-6 hover:shadow-elegant transition-smooth group">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-primary ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary-glow transition-smooth">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 glass rounded-2xl p-8 shadow-elegant">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <p className="text-muted-foreground">Active Job Listings</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-2">
                95%
              </div>
              <p className="text-muted-foreground">Match Accuracy</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-muted-foreground">Real-Time Updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};