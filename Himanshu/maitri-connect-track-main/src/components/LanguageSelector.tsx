import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
];

export const LanguageSelector = ({ currentLanguage, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5 text-muted-foreground" />
      <div className="flex gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={currentLanguage === lang.code ? "default" : "outline"}
            size="sm"
            onClick={() => onLanguageChange(lang.code)}
            className="min-w-[80px]"
          >
            {lang.nativeName}
          </Button>
        ))}
      </div>
    </div>
  );
};
