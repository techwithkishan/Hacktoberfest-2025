import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IdCard } from "lucide-react";
import { isValidMaitriId } from "@/utils/maitriId";
import { toast } from "sonner";
import { translations, Language } from "@/utils/translations";

interface WorkerLoginProps {
  language: Language;
  onLogin: (maitriId: string, workerData: any) => void;
  onBack: () => void;
}

export const WorkerLogin = ({ language, onLogin, onBack }: WorkerLoginProps) => {
  const [maitriId, setMaitriId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Allow login by Maitri ID or by email (but not admin emails)
    const admins = JSON.parse(localStorage.getItem('maitri-admins') || '{"admin@maitri.org":{}}');

    if (email) {
      // prevent admin email usage
      if (Object.keys(admins).includes(email)) {
        toast.error('This email is reserved for admins. Use worker account or register with a different email.');
        return;
      }

      const sup = (await import('@/lib/supabase')).getSupabase();
      if (sup) {
        try {
          const { auth, db } = await import('@/lib/supabase');
          await auth.signIn(email, password);
          // lookup worker profile by email
          const all = await db.getWorkers();
          const found = Object.entries(all).find(([, w]: [string, any]) => (w.email || '').toLowerCase() === email.toLowerCase());
          if (!found) {
            toast.error('No profile found for this account');
            return;
          }
          const [id, workerData] = found as [string, any];
          toast.success('Login successful!');
          onLogin(id, workerData);
          return;
        } catch (err) {
          console.error(err);
          toast.error('Sign-in failed');
          return;
        }
      }

      const workers = JSON.parse(localStorage.getItem('maitri-workers') || '{}');
      // find by email
      const found = Object.entries(workers).find(([, w]: [string, any]) => (w.email || '').toLowerCase() === email.toLowerCase());
      if (!found) {
        toast.error('Email not found. Please register first.');
        return;
      }
      const [id, workerData] = found as [string, any];
      toast.success('Login successful!');
      onLogin(id, workerData);
      return;
    }

    if (!isValidMaitriId(maitriId)) {
      toast.error("Invalid Maitri ID format. Please check and try again.");
      return;
    }

    const workers = JSON.parse(localStorage.getItem('maitri-workers') || '{}');
    const workerData = workers[maitriId];

    if (!workerData) {
      toast.error("Maitri ID not found. Please register first.");
      return;
    }

    // prevent admin account maitriId collision (unlikely) but check email
    if (workerData.email && Object.keys(admins).includes(workerData.email)) {
      toast.error('This account is reserved for admins.');
      return;
    }

    toast.success("Login successful!");
    onLogin(maitriId, workerData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <Card className="w-full max-w-md shadow-[var(--shadow-card)]">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardTitle className="text-2xl">Worker Login</CardTitle>
          <CardDescription className="text-base">
            Enter your Maitri ID to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="maitriId" className="text-base flex items-center gap-2">
                <IdCard className="h-4 w-4" />
                Maitri ID
              </Label>
              <Input
                id="maitriId"
                placeholder="MT-TN-XXXXXX"
                value={maitriId}
                onChange={(e) => setMaitriId(e.target.value.toUpperCase())}
                className="min-h-[48px] text-base font-mono"
                
              />
              <p className="text-sm text-muted-foreground">
                Format: MT-TN-XXXXXX (e.g., MT-TN-1A3B5C)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Or sign in with Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-[48px] text-base"
              />
              <p className="text-sm text-muted-foreground">If you use email, leave the Maitri ID field blank.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Password (if using email)</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="min-h-[48px] text-base"
              />
            </div>

            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 min-h-[48px]"
                onClick={onBack}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 min-h-[48px]"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
