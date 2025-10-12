import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, User, Briefcase, Phone, CreditCard } from "lucide-react";
import { generateMaitriId } from "@/utils/maitriId";
import { toast } from "sonner";
import { translations, Language } from "@/utils/translations";
import { db } from "@/lib/supabase";

interface RegistrationFormProps {
  language: Language;
  onRegistrationComplete: (maitriId: string, workerData: any) => void;
}

export const RegistrationForm = ({ language, onRegistrationComplete }: RegistrationFormProps) => {
  const t = translations[language].registration;
  const [formData, setFormData] = useState({
    photo: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    gender: "",
    homeState: "",
    skills: "",
    currentEmployer: "",
    phone: "",
    aadhaar: ""
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const maitriId = generateMaitriId();
    
    const workerData = {
      email: formData.email,
      ...formData,
      maitriId,
      registrationDate: new Date().toISOString(),
      checkIns: [],
      sosAlerts: []
    };

    // Prevent registering with admin emails
    const admins = JSON.parse(localStorage.getItem('maitri-admins') || '{}');
    if (formData.email && Object.keys(admins).includes(formData.email)) {
      toast.error('This email is reserved for admins. Please use a different email.');
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // If Supabase is configured, register via Supabase Auth then upsert profile
    const sup = (await import('@/lib/supabase')).getSupabase();
    if (sup) {
      try {
        const { auth } = await import('@/lib/supabase');
        await auth.signUp(formData.email, formData.password || Math.random().toString(36).slice(2));
        // create profile record in workers table
        await db.upsertWorker(workerData);
        localStorage.setItem('maitri-jobs', localStorage.getItem('maitri-jobs') || '{}');
        toast.success(t.success + ' Check your email to confirm (if required).');
        onRegistrationComplete(maitriId, workerData);
        return;
      } catch (err: any) {
        console.error('Supabase signUp error', err);
        toast.error('Registration failed (supabase)');
        return;
      }
    }

    // fallback: Store in localStorage
    db.upsertWorker(workerData)
      .then(() => {
        localStorage.setItem('maitri-jobs', localStorage.getItem('maitri-jobs') || '{}');
        toast.success(t.success);
        onRegistrationComplete(maitriId, workerData);
      })
      .catch((err: any) => {
        console.error('Failed to save worker to DB', err);
        toast.error('Failed to save registration (check console)');
      });
  };

  return (
    <Card className="w-full max-w-2xl shadow-[var(--shadow-card)]">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="text-2xl">{t.title}</CardTitle>
        <CardDescription className="text-base">{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {formData.photo ? (
                <img src={formData.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-primary/20" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-4 border-dashed border-primary/30">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <Label htmlFor="photo" className="cursor-pointer">
              <Button type="button" variant="outline" className="min-h-[48px]" onClick={() => document.getElementById('photo')?.click()}>
                <Camera className="mr-2 h-5 w-5" />
                {t.photo}
              </Button>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </Label>
          </div>

          {/* Personal Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="min-h-[48px] text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="min-h-[48px] text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-base">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="min-h-[48px] text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                {t.name}
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="min-h-[48px] text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-base">{t.age}</Label>
              <Input
                id="age"
                type="number"
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="min-h-[48px] text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-base">{t.gender}</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger className="min-h-[48px] text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t.male}</SelectItem>
                  <SelectItem value="female">{t.female}</SelectItem>
                  <SelectItem value="other">{t.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="homeState" className="text-base">{t.homeState}</Label>
              <Input
                id="homeState"
                required
                value={formData.homeState}
                onChange={(e) => setFormData({ ...formData, homeState: e.target.value })}
                className="min-h-[48px] text-base"
              />
            </div>
          </div>

          {/* Work Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-base flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {t.skills}
              </Label>
              <Input
                id="skills"
                required
                placeholder="e.g., Construction, Agriculture, Manufacturing"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="min-h-[48px] text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentEmployer" className="text-base">{t.currentEmployer}</Label>
              <Input
                id="currentEmployer"
                value={formData.currentEmployer}
                onChange={(e) => setFormData({ ...formData, currentEmployer: e.target.value })}
                className="min-h-[48px] text-base"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {t.phone}
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="min-h-[48px] text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aadhaar" className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                {t.aadhaar}
              </Label>
              <Input
                id="aadhaar"
                value={formData.aadhaar}
                onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                className="min-h-[48px] text-base"
              />
            </div>
          </div>

          <Button type="submit" className="w-full min-h-[56px] text-lg font-semibold">
            {t.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
