import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Heart, 
  AlertCircle, 
  User, 
  Briefcase, 
  MapPin, 
  Phone,
  Calendar,
  CheckCircle2,
  Edit,
  Circle
} from "lucide-react";
import { toast } from "sonner";
import { translations, Language } from "@/utils/translations";
import { ProfileEditor } from "./ProfileEditor";
import { db, getSupabase } from "@/lib/supabase";

interface WorkerDashboardProps {
  maitriId: string;
  workerData: any;
  language: Language;
}

export const WorkerDashboard = ({ maitriId, workerData, language }: WorkerDashboardProps) => {
  const t = translations[language].dashboard;
  const [checkIns, setCheckIns] = useState(workerData.checkIns || []);
  const [sosAlerts, setSosAlerts] = useState(workerData.sosAlerts || []);
  const [availability, setAvailability] = useState(workerData.availability || 'offline');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [currentWorkerData, setCurrentWorkerData] = useState(workerData);
  const [jobs, setJobs] = useState<any>({});

  const handleCheckIn = () => {
    const newCheckIn = {
      timestamp: new Date().toISOString(),
      status: 'ok'
    };
    
    const updatedCheckIns = [...checkIns, newCheckIn];
    setCheckIns(updatedCheckIns);

    // Update localStorage
    const workers = JSON.parse(localStorage.getItem('maitri-workers') || '{}');
    workers[maitriId].checkIns = updatedCheckIns;
    localStorage.setItem('maitri-workers', JSON.stringify(workers));

    toast.success(t.checkInSuccess);
  };

  const handleSOS = () => {
    const newAlert = {
      timestamp: new Date().toISOString(),
      status: 'active',
      resolved: false
    };

    const updatedAlerts = [...sosAlerts, newAlert];
    setSosAlerts(updatedAlerts);

    // Update localStorage
    const workers = JSON.parse(localStorage.getItem('maitri-workers') || '{}');
    workers[maitriId].sosAlerts = updatedAlerts;
    localStorage.setItem('maitri-workers', JSON.stringify(workers));

    // Send email notification (simulated)
    toast.error(t.sosSuccess + " Admin and emergency contacts notified.");
  };

  const handleAvailabilityChange = (newAvailability: string) => {
    setAvailability(newAvailability);

    // Update localStorage
    const workers = JSON.parse(localStorage.getItem('maitri-workers') || '{}');
    workers[maitriId].availability = newAvailability;
    localStorage.setItem('maitri-workers', JSON.stringify(workers));

    toast.success(`Status updated to: ${newAvailability}`);
  };

  const handleProfileUpdate = (updatedData: any) => {
    setCurrentWorkerData(updatedData);
  };

  const loadJobs = async () => {
    try {
      const sup = getSupabase();
      if (sup) {
        const j = await db.getJobs();
        setJobs(j);
        return;
      }
    } catch (err) {
      console.error('Failed to load jobs from supabase', err);
    }
    const loadedJobs = JSON.parse(localStorage.getItem('maitri-jobs') || '{}');
    setJobs(loadedJobs);
  };

  const handleApplyToJob = (jobId: string) => {
    (async () => {
      try {
        const sup = getSupabase();
        const applicantId = maitriId || currentWorkerData.email || ('app-' + Date.now());
        const applicant = {
          id: applicantId,
          name: currentWorkerData.name,
          maitriId,
          email: currentWorkerData.email,
          appliedAt: new Date().toISOString(),
          status: 'applied'
        };

        if (sup) {
          await db.applyToJob(jobId, applicant);
          await loadJobs();
          toast.success('Applied to job');
          return;
        }

        const allJobs = JSON.parse(localStorage.getItem('maitri-jobs') || '{}');
        if (!allJobs[jobId]) {
          toast.error('Job not found');
          return;
        }
        const applicants = allJobs[jobId].applicants || {};
        if (applicants[applicantId]) {
          toast.error('You have already applied for this job');
          return;
        }
        applicants[applicantId] = applicant;
        allJobs[jobId].applicants = applicants;
        localStorage.setItem('maitri-jobs', JSON.stringify(allJobs));
        setJobs(allJobs);
        toast.success('Applied to job');
      } catch (err) {
        console.error(err);
        toast.error('Failed to apply');
      }
    })();
  };

  // load jobs on mount
  useEffect(() => {
    loadJobs();
    const iv = setInterval(() => { loadJobs().catch(console.error); }, 5000);
    return () => clearInterval(iv);
  }, []);

  const lastCheckIn = checkIns.length > 0 
    ? new Date(checkIns[checkIns.length - 1].timestamp).toLocaleDateString()
    : 'Never';

  if (isEditingProfile) {
    return (
      <ProfileEditor
        maitriId={maitriId}
        workerData={currentWorkerData}
        onUpdate={handleProfileUpdate}
        onClose={() => setIsEditingProfile(false)}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-4 gap-6 py-6">
      {/* Left sidebar (Instagram-style) */}
      <aside className="col-span-1 sticky top-20">
        <div className="space-y-4">
          <div className="flex flex-col items-center p-4 bg-card rounded">
            {currentWorkerData.photo ? (
              <img src={currentWorkerData.photo} className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted" />
            )}
            <div className="mt-3 text-center">
              <div className="font-semibold">{currentWorkerData.name}</div>
              <div className="text-sm text-muted-foreground">{currentWorkerData.homeState}</div>
            </div>
          </div>

          <nav className="bg-card p-3 rounded">
            <ul className="space-y-2">
              <li><Button variant="ghost" className="w-full justify-start">Dashboard</Button></li>
              <li><Button variant="ghost" className="w-full justify-start" onClick={() => setIsEditingProfile(true)}>Profile</Button></li>
              <li><Button variant="ghost" className="w-full justify-start">Applications</Button></li>
              <li><Button variant="ghost" className="w-full justify-start">Settings</Button></li>
              <li><Button variant="outline" className="w-full justify-start">Logout</Button></li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="col-span-3 space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-[var(--shadow-soft)]">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl">{t.welcome}, {currentWorkerData.name}!</CardTitle>
              <CardDescription className="text-primary-foreground/90 text-lg">
                {t.yourId}: <span className="font-bold text-xl">{maitriId}</span>
              </CardDescription>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setIsEditingProfile(true)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Availability Status Card */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Circle className="h-5 w-5" />
            Work Availability Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-4">
            <Select value={availability} onValueChange={handleAvailabilityChange}>
              <SelectTrigger className="min-h-[48px] flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Available for Work
                  </div>
                </SelectItem>
                <SelectItem value="busy">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    Currently Working
                  </div>
                </SelectItem>
                <SelectItem value="offline">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    Not Available
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground">
            Let employers and NGOs know if you're available for work opportunities
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 gap-4">
        <Button
          onClick={handleCheckIn}
          variant="secondary"
          className="min-h-[120px] flex flex-col gap-2 text-lg hover:scale-105 transition-transform"
        >
          <Heart className="h-12 w-12" />
          <div className="font-semibold">{t.checkIn}</div>
          <div className="text-sm opacity-90">{t.checkInDesc}</div>
        </Button>

        <Button
          onClick={handleSOS}
          variant="destructive"
          className="min-h-[120px] flex flex-col gap-2 text-lg hover:scale-105 transition-transform"
        >
          <AlertCircle className="h-12 w-12" />
          <div className="font-semibold">{t.sos}</div>
          <div className="text-sm opacity-90">{t.sosDesc}</div>
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {t.profile}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {currentWorkerData.photo && (
              <img 
                src={currentWorkerData.photo} 
                alt={currentWorkerData.name} 
                className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
              />
            )}
            <div className="space-y-1">
              <div className="font-semibold text-lg">{currentWorkerData.name}</div>
              <div className="text-sm text-muted-foreground">
                {currentWorkerData.age} years • {currentWorkerData.gender}
              </div>
            </div>
          </div>

          <div className="grid gap-3 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Home:</span>
              <span className="font-medium">{currentWorkerData.homeState}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Skills:</span>
              <span className="font-medium">{currentWorkerData.skills}</span>
            </div>

            {currentWorkerData.currentEmployer && (
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Employer:</span>
                <span className="font-medium">{currentWorkerData.currentEmployer}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">{currentWorkerData.phone}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            {t.status}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t.lastCheckIn}:</span>
            <Badge variant="secondary" className="text-sm">{lastCheckIn}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Check-ins:</span>
            <Badge variant="secondary" className="text-sm">{checkIns.length}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t.status}:</span>
            <Badge variant="default" className="bg-secondary text-secondary-foreground">
              {t.statusOk}
            </Badge>
          </div>
        </CardContent>
      </Card>

  {/* Jobs Board (for workers) */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Job Opportunities</CardTitle>
          <CardDescription>Open positions you can apply for</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(jobs).length === 0 ? (
            <p className="text-sm text-muted-foreground">No jobs posted yet</p>
          ) : (
            Object.values(jobs).map((job: any) => {
              const applicantId = maitriId || currentWorkerData.email || '';
              const applied = applicantId && job.applicants && job.applicants[applicantId];
              const skills = (currentWorkerData.skills || '').toLowerCase().split(/[,\s]+/).filter(Boolean);
              const matches = skills.length === 0 ? true : skills.some((s: string) => job.title.toLowerCase().includes(s) || job.description.toLowerCase().includes(s));

              return (
                <div key={job.id} className="border p-4 rounded mb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">{job.title}</div>
                      <div className="text-sm text-muted-foreground">{job.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">Posted: {new Date(job.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {applied ? (
                        <div className="text-sm">Status: <span className="font-medium">{applied.status}</span></div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleApplyToJob(job.id)}
                          disabled={availability !== 'available' || !matches}
                        >
                          Apply
                        </Button>
                      )}
                      {availability !== 'available' && <div className="text-xs text-muted-foreground">Set availability to "Available" to apply</div>}
                      {!matches && <div className="text-xs text-muted-foreground">Your skills don't match job requirements</div>}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
      </main>
    </div>
  );
};
