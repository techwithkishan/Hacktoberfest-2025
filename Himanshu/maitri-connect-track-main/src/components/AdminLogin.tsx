import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface AdminLoginProps {
  onLogin: (adminData: any) => void;
  onBack: () => void;
}

export const AdminLogin = ({ onLogin, onBack }: AdminLoginProps) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo credentials - in production, use proper authentication
    const admins = JSON.parse(
      localStorage.getItem('maitri-admins') || JSON.stringify({
        'admin@maitri.org': { email: 'admin@maitri.org', password: 'admin123', name: 'Admin User', organization: 'Maitri NGO' },
        'admin@migrantworker.com': { email: 'admin@migrantworker.com', password: 'admin123', name: 'Migrant Admin', organization: 'Employer' }
      })
    );

    const admin = Object.values(admins).find(
      (a: any) => a.email === credentials.email && a.password === credentials.password
    );

    if (!admin) {
      toast.error("Invalid credentials. Demo: admin@maitri.org / admin123 OR admin@migrantworker.com / admin123");
      return;
    }

    toast.success("Admin login successful!");
    onLogin(admin);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <Card className="w-full max-w-md shadow-[var(--shadow-card)]">
        <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <ShieldCheck className="h-6 w-6" />
            Admin/NGO Login
          </CardTitle>
          <CardDescription className="text-base">
            Access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@maitri.org"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="min-h-[48px] text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="min-h-[48px] text-base"
                required
              />
            </div>

            <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
              Demo: admin@maitri.org / admin123
            </p>

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
