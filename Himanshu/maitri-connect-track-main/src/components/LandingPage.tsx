import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users } from "lucide-react";
import { translations, Language } from "@/utils/translations";

interface LandingPageProps {
  language: Language;
  onNavigate: (page: 'register' | 'login' | 'admin') => void;
}

export const LandingPage = ({ language, onNavigate }: LandingPageProps) => {
  const t = translations[language];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {t.appName}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {t.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 items-center">
            <Button 
              size="lg" 
              className="min-h-[56px] text-lg font-semibold shadow-[var(--shadow-soft)] hover:scale-105 transition-transform"
              onClick={() => onNavigate('register')}
            >
              {t.registerButton}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="min-h-[56px] text-lg font-semibold hover:scale-105 transition-transform"
              onClick={() => onNavigate('login')}
            >
              {t.loginButton}
            </Button>
            {/* Small Admin link so admin login is discoverable from home */}
            <Button
              size="sm"
              variant="ghost"
              className="text-sm text-muted-foreground"
              onClick={() => onNavigate('admin')}
            >
              Admin Login
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{t.features.uniqueId}</CardTitle>
              <CardDescription className="text-base">
                {t.features.uniqueIdDesc}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>{t.features.support}</CardTitle>
              <CardDescription className="text-base">
                {t.features.supportDesc}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>{t.features.tracking}</CardTitle>
              <CardDescription className="text-base">
                {t.features.trackingDesc}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* About Section */}
        <Card className="mt-16 max-w-3xl mx-auto shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-2xl">{t.aboutTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.aboutText}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
