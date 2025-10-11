import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, DollarSign, ExternalLink, Heart, Search, Filter, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_display: string | null;
  job_type: string;
  description: string | null;
  skills: string[];
  posted_date: string;
  is_remote: boolean;
  external_url: string | null;
  saved_date: string;
  notes?: string;
  status: 'saved' | 'applied' | 'interview' | 'rejected' | 'offer';
}

export const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<SavedJob[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      const jobs = JSON.parse(saved);
      setSavedJobs(jobs);
      setFilteredJobs(jobs);
    }
  }, []);

  // Filter jobs based on search and status
  useEffect(() => {
    let filtered = savedJobs;

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    setFilteredJobs(filtered);
  }, [savedJobs, searchQuery, statusFilter]);

  const removeJob = (jobId: string) => {
    const updatedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updatedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
    toast({
      title: "Job Removed",
      description: "Job has been removed from your saved list.",
    });
  };

  const updateJobStatus = (jobId: string, status: SavedJob['status']) => {
    const updatedJobs = savedJobs.map(job =>
      job.id === jobId ? { ...job, status } : job
    );
    setSavedJobs(updatedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
    toast({
      title: "Status Updated",
      description: `Job status updated to ${status}.`,
    });
  };

  const addNote = (jobId: string, notes: string) => {
    const updatedJobs = savedJobs.map(job =>
      job.id === jobId ? { ...job, notes } : job
    );
    setSavedJobs(updatedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const getStatusColor = (status: SavedJob['status']) => {
    switch (status) {
      case 'saved': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'applied': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'interview': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'offer': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Saved Jobs</h1>
          <p className="text-muted-foreground">
            Manage your saved job opportunities and track your applications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass rounded-2xl p-6 mb-8 shadow-elegant">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search saved jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-background/50 border-border"
            />
          </div>
          
          {showFilters && (
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-12 px-3 rounded-md border border-border bg-background/50"
              >
                <option value="all">All Status</option>
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Showing <span className="text-primary-glow font-medium">{filteredJobs.length}</span> of {savedJobs.length} saved jobs
        </p>
      </div>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <Card className="glass p-12 text-center">
          <Heart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {savedJobs.length === 0 ? "No Saved Jobs" : "No Jobs Match Your Filters"}
          </h3>
          <p className="text-muted-foreground">
            {savedJobs.length === 0 
              ? "Start saving jobs you're interested in to track them here."
              : "Try adjusting your search criteria or filters."
            }
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="glass hover:shadow-elegant transition-smooth">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                      {job.is_remote && (
                        <Badge variant="secondary" className="bg-accent-glow/20 text-accent-glow border-accent-glow/30">
                          Remote
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground font-medium">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => job.external_url && window.open(job.external_url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Apply
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeJob(job.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary_display || 'Salary not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Saved {formatTimeAgo(job.saved_date)}</span>
                  </div>
                </div>

                {job.description && (
                  <p className="text-foreground mb-4 line-clamp-2">{job.description}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills?.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-primary-glow/10 text-primary-glow border-primary-glow/30">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Status Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <span className="text-sm font-medium">Update Status:</span>
                  {['saved', 'applied', 'interview', 'offer', 'rejected'].map((status) => (
                    <Button
                      key={status}
                      variant={job.status === status ? "hero" : "ghost"}
                      size="sm"
                      onClick={() => updateJobStatus(job.id, status as SavedJob['status'])}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>

                {/* Notes Section */}
                <div className="mt-4 pt-4 border-t border-border">
                  <label className="text-sm font-medium mb-2 block">Notes:</label>
                  <textarea
                    value={job.notes || ''}
                    onChange={(e) => addNote(job.id, e.target.value)}
                    placeholder="Add notes about this job opportunity..."
                    className="w-full p-3 rounded-md border border-border bg-background/50 resize-none"
                    rows={2}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

