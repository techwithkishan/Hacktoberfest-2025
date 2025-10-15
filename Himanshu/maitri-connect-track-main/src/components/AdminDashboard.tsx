import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  Phone,
  MapPin,
  Briefcase,
  Mail,
  UserCircle
} from "lucide-react";
import { toast } from "sonner";
import { db, getSupabase } from "@/lib/supabase";

interface AdminDashboardProps {
  adminData: any;
  onLogout: () => void;
}

export const AdminDashboard = ({ adminData, onLogout }: AdminDashboardProps) => {
  const [workers, setWorkers] = useState<any>({});
  const [sosAlerts, setSosAlerts] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any>({});

  useEffect(() => {
    // Load workers from localStorage
    const loadedWorkers = JSON.parse(localStorage.getItem('maitri-workers') || '{}');
    setWorkers(loadedWorkers);

    // Collect all active SOS alerts
    const alerts: any[] = [];
    Object.entries(loadedWorkers).forEach(([id, worker]: [string, any]) => {
      if (worker.sosAlerts && worker.sosAlerts.length > 0) {
        worker.sosAlerts.forEach((alert: any) => {
          if (!alert.resolved) {
            alerts.push({
              ...alert,
              workerId: id,
              workerName: worker.name,
              workerPhone: worker.phone,
              workerLocation: worker.homeState
            });
          }
        });
      }
    });
    setSosAlerts(alerts);

    // Poll for updates every 5 seconds
    const interval = setInterval(() => {
      const updated = JSON.parse(localStorage.getItem('maitri-workers') || '{}');
      setWorkers(updated);
      const loadedJobs = JSON.parse(localStorage.getItem('maitri-jobs') || '{}');
      setJobs(loadedJobs);
      
      const newAlerts: any[] = [];
      Object.entries(updated).forEach(([id, worker]: [string, any]) => {
        if (worker.sosAlerts && worker.sosAlerts.length > 0) {
          worker.sosAlerts.forEach((alert: any) => {
            if (!alert.resolved) {
              newAlerts.push({
                ...alert,
                workerId: id,
                workerName: worker.name,
                workerPhone: worker.phone,
                workerLocation: worker.homeState
              });
            }
          });
        }
      });
      setSosAlerts(newAlerts);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleResolveSOS = (workerId: string, alertIndex: number) => {
    const updatedWorkers = { ...workers };
    if (updatedWorkers[workerId].sosAlerts[alertIndex]) {
      updatedWorkers[workerId].sosAlerts[alertIndex].resolved = true;
      updatedWorkers[workerId].sosAlerts[alertIndex].resolvedAt = new Date().toISOString();
      localStorage.setItem('maitri-workers', JSON.stringify(updatedWorkers));
      setWorkers(updatedWorkers);
      toast.success("SOS alert resolved");
    }
  };

  const loadJobs = async () => {
    try {
      const sup = getSupabase();
      if (sup) {
        const j = await db.getJobs();
        // load applicants per job (normalized table)
        const jobsWithApplicants: any = {};
        for (const id of Object.keys(j)) {
          const job = j[id];
          const applicants = await db.getApplicants(job.id);
          // normalize into the job shape expected by UI
          job.applicants = Array.isArray(applicants) ? applicants.reduce((acc: any, a: any) => { acc[a.id || a.id] = a; return acc; }, {}) : (job.applicants || {});
          jobsWithApplicants[id] = job;
        }
        setJobs(jobsWithApplicants);
        return;
      }
    } catch (err) {
      console.error('Failed to load jobs from supabase, falling back', err);
    }
    const loadedJobs = JSON.parse(localStorage.getItem('maitri-jobs') || '{}');
    setJobs(loadedJobs);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleCreateJob = async () => {
    const title = prompt('Job title (e.g., Mason)');
    if (!title) return;
    const description = prompt('Short description / requirements') || '';
    const id = 'job-' + Date.now();
    const job = { id, title, description, createdAt: new Date().toISOString(), applicants: {}, status: 'open' };
    try {
      const sup = getSupabase();
      if (sup) {
        await db.createJob(job);
        await loadJobs();
        toast.success('Job created');
        return;
      }
    } catch (err) {
      console.error('createJob supabase error', err);
    }

    const newJobs = { ...jobs };
    newJobs[id] = job;
    localStorage.setItem('maitri-jobs', JSON.stringify(newJobs));
    setJobs(newJobs);
    toast.success('Job created');
  };

  const handleApproveApplicant = (jobId: string, applicantId: string) => {
    (async () => {
      try {
        const sup = getSupabase();
        if (sup) {
          await db.updateApplicant(jobId, applicantId, { status: 'approved' });
          await loadJobs();
          toast.success('Applicant approved');
          return;
        }

        const allJobs = JSON.parse(localStorage.getItem('maitri-jobs') || '{}');
        if (!allJobs[jobId]) return;
        allJobs[jobId].applicants[applicantId].status = 'approved';
        localStorage.setItem('maitri-jobs', JSON.stringify(allJobs));
        setJobs(allJobs);
        toast.success('Applicant approved');
      } catch (err) {
        console.error(err);
        toast.error('Failed to approve applicant');
      }
    })();
  };

  const workerArray = Object.entries(workers).map(([id, data]) => ({ id, ...data as any }));
  const availableWorkers = workerArray.filter(w => w.availability === 'available');
  const totalCheckIns = workerArray.reduce((sum, w) => sum + (w.checkIns?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto p-4 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {adminData.name} ({adminData.organization})
            </p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Total Workers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{workerArray.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                Available Workers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{availableWorkers.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                Active SOS Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{sosAlerts.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                Total Check-Ins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCheckIns}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="workers" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="workers">All Workers</TabsTrigger>
            <TabsTrigger value="sos" className="relative">
              SOS Alerts
              {sosAlerts.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {sosAlerts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <div className="flex items-center justify-between max-w-md">
              <h3 className="text-lg font-semibold">Job Portal</h3>
              <div className="flex gap-2">
                <Button onClick={handleCreateJob} size="sm">Create Job</Button>
                <Button onClick={loadJobs} variant="outline" size="sm">Refresh</Button>
              </div>
            </div>
          </div>

          {/* Workers List */}
          <TabsContent value="workers" className="space-y-4">
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle>Registered Workers</CardTitle>
                <CardDescription>View all registered migrant workers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workerArray.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No workers registered yet</p>
                  ) : (
                    workerArray.map((worker) => (
                      <Card key={worker.id} className="border-l-4 border-l-primary/50">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            {worker.photo && (
                              <img 
                                src={worker.photo} 
                                alt={worker.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                              />
                            )}
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{worker.name}</h3>
                                  <p className="text-sm text-muted-foreground font-mono">{worker.id}</p>
                                </div>
                                <Badge variant={
                                  worker.availability === 'available' ? 'default' : 
                                  worker.availability === 'busy' ? 'secondary' : 
                                  'outline'
                                }>
                                  {worker.availability || 'offline'}
                                </Badge>
                              </div>

                              <div className="grid md:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <UserCircle className="h-4 w-4 text-muted-foreground" />
                                  <span>{worker.age} years • {worker.gender}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span>{worker.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{worker.homeState}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                                  <span>{worker.skills}</span>
                                </div>
                              </div>

                              <div className="flex gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Check-ins:</span>{' '}
                                  <span className="font-medium">{worker.checkIns?.length || 0}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Last check-in:</span>{' '}
                                  <span className="font-medium">
                                    {worker.checkIns?.length > 0 
                                      ? new Date(worker.checkIns[worker.checkIns.length - 1].timestamp).toLocaleDateString()
                                      : 'Never'
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SOS Alerts */}
          <TabsContent value="sos" className="space-y-4">
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Active SOS Alerts
                </CardTitle>
                <CardDescription>Emergency alerts from workers requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sosAlerts.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No active SOS alerts</p>
                  ) : (
                    sosAlerts.map((alert, index) => (
                      <Card key={`${alert.workerId}-${index}`} className="border-l-4 border-l-destructive bg-destructive/5">
                        <CardContent className="pt-6">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg text-destructive">Emergency Alert</h3>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(alert.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <Badge variant="destructive">Active</Badge>
                            </div>

                            <div className="grid gap-2 text-sm">
                              <div className="flex items-center gap-2">
                                <UserCircle className="h-4 w-4" />
                                <span className="font-medium">{alert.workerName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <a href={`tel:${alert.workerPhone}`} className="text-primary hover:underline">
                                  {alert.workerPhone}
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{alert.workerLocation}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span className="text-muted-foreground">Worker ID: {alert.workerId}</span>
                              </div>
                            </div>

                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => {
                                const workerData = workers[alert.workerId];
                                const alertIdx = workerData?.sosAlerts?.findIndex((a: any) => 
                                  a.timestamp === alert.timestamp && !a.resolved
                                );
                                if (alertIdx !== -1) {
                                  handleResolveSOS(alert.workerId, alertIdx);
                                }
                              }}
                            >
                              Mark as Resolved
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle>Jobs Board</CardTitle>
                <CardDescription>Open positions and applicants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.keys(jobs).length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No jobs posted yet</p>
                  ) : (
                    Object.values(jobs).map((job: any) => (
                      <Card key={job.id} className="border-l-4 border-l-primary/50">
                        <CardContent>
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{job.title}</h4>
                              <p className="text-sm text-muted-foreground">{job.description}</p>
                              <p className="text-xs text-muted-foreground">Status: {job.status}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Button size="sm" onClick={() => { navigator.clipboard?.writeText(job.id); toast.success('Job id copied'); }}>Copy ID</Button>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h5 className="font-medium">Applicants</h5>
                            {Object.keys(job.applicants || {}).length === 0 ? (
                              <p className="text-sm text-muted-foreground">No applicants yet</p>
                            ) : (
                              Object.entries(job.applicants).map(([appId, app]: [string, any]) => (
                                <div key={appId} className="flex items-center justify-between border-t py-2">
                                  <div>
                                    <div className="font-medium">{app.name} ({app.maitriId || app.email})</div>
                                    <div className="text-sm text-muted-foreground">Applied: {new Date(app.appliedAt).toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">Status: {app.status}</div>
                                  </div>
                                  <div className="flex gap-2">
                                    {app.status !== 'approved' && (
                                      <Button size="sm" onClick={() => handleApproveApplicant(job.id, appId)}>Approve</Button>
                                    )}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
