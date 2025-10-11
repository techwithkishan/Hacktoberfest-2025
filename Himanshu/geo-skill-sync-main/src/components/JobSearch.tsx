import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Briefcase, Clock, DollarSign, ExternalLink, Navigation, Loader2, Filter, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { geolocationService, LocationData } from "@/services/geolocation";
import { jobApiService, JobSearchParams } from "@/services/jobApi";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  distance_miles: number | null;
  salary_display: string | null;
  job_type: string;
  description: string | null;
  skills: string[];
  posted_date: string;
  is_remote: boolean;
  external_url: string | null;
}

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const JobSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    isRemote: false,
    skills: [] as string[]
  });
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Fetch jobs from Supabase
  const fetchJobs = async (userLat?: number, userLng?: number) => {
    setLoading(true);
    try {
      let query = supabase
        .from('jobs')
        .select('*')
        .order('posted_date', { ascending: false });

      // Filter by search query if provided
      if (searchQuery.trim()) {
        query = query.or(`title.ilike.%${searchQuery}%,company.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      // Filter by location if provided
      if (location.trim()) {
        query = query.ilike('location', `%${location}%`);
      }

      // Filter by job type
      if (filters.jobType) {
        query = query.eq('job_type', filters.jobType);
      }

      // Filter by salary range
      if (filters.salaryMin) {
        query = query.gte('salary_min', parseInt(filters.salaryMin));
      }
      if (filters.salaryMax) {
        query = query.lte('salary_max', parseInt(filters.salaryMax));
      }

      // Filter by remote work
      if (filters.isRemote) {
        query = query.eq('is_remote', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error",
          description: "Failed to fetch jobs. Please try again.",
          variant: "destructive",
        });
        return;
      }

      let processedJobs = data || [];

      // Calculate distances if user location is available
      if (userLat && userLng) {
        processedJobs = processedJobs.map(job => {
          if (job.latitude && job.longitude) {
            const distance = calculateDistance(userLat, userLng, job.latitude, job.longitude);
            return { ...job, distance_miles: Math.round(distance * 10) / 10 };
          }
          return job;
        });

        // Sort by distance (local jobs first, then remote)
        processedJobs.sort((a, b) => {
          if (a.is_remote && !b.is_remote) return 1;
          if (!a.is_remote && b.is_remote) return -1;
          if (a.distance_miles && b.distance_miles) {
            return a.distance_miles - b.distance_miles;
          }
          return 0;
        });
      }

      setJobs(processedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle location detection
  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    try {
      const locationData = await geolocationService.getCurrentLocation();
      setCurrentLocation(locationData);
      setLocation(geolocationService.formatLocation(locationData));
      setIsDetectingLocation(false);
      fetchJobs(locationData.latitude, locationData.longitude);
    } catch (error) {
      setIsDetectingLocation(false);
      toast({
        title: "Location Error",
        description: error instanceof Error ? error.message : 'Failed to detect location',
        variant: "destructive",
      });
      fetchJobs();
    }
  };

  // Search jobs when search query changes
  const handleSearch = () => {
    if (currentLocation) {
      fetchJobs(currentLocation.latitude, currentLocation.longitude);
    } else {
      fetchJobs();
    }
  };

  // Auto-detect location on component mount
  useEffect(() => {
    handleDetectLocation();
  }, []);

  // Search jobs when filters change
  useEffect(() => {
    if (currentLocation) {
      fetchJobs(currentLocation.latitude, currentLocation.longitude);
    } else {
      fetchJobs();
    }
  }, [filters]);

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      const jobs = JSON.parse(saved);
      setSavedJobs(new Set(jobs.map((job: any) => job.id)));
    }
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const toggleSaveJob = (job: Job) => {
    const savedJobsList = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    if (savedJobs.has(job.id)) {
      // Remove from saved jobs
      const updatedJobs = savedJobsList.filter((savedJob: any) => savedJob.id !== job.id);
      localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
      setSavedJobs(prev => {
        const newSet = new Set(prev);
        newSet.delete(job.id);
        return newSet;
      });
      toast({
        title: "Job Removed",
        description: "Job has been removed from your saved list.",
      });
    } else {
      // Add to saved jobs
      const jobToSave = {
        ...job,
        saved_date: new Date().toISOString(),
        status: 'saved' as const,
        notes: ''
      };
      const updatedJobs = [...savedJobsList, jobToSave];
      localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
      setSavedJobs(prev => new Set([...prev, job.id]));
      toast({
        title: "Job Saved",
        description: "Job has been added to your saved list.",
      });
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Discover Local Opportunities
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find jobs near you or explore remote opportunities. Our AI prioritizes local matches first.
          </p>
        </div>

        {/* Search Form */}
        <div className="glass rounded-2xl p-6 mb-8 shadow-elegant">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Job title or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background/50 border-border"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 bg-background/50 border-border"
              />
            </div>
            <Button 
              variant="outline" 
              className="h-12" 
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
            >
              {isDetectingLocation ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Navigation className="w-5 h-5" />
              )}
              Detect Location
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="h-12 flex-1" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5" />
                Filters
              </Button>
              <Button 
                variant="hero" 
                className="h-12 flex-1" 
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Search
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Job Type</label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
                    className="w-full h-10 px-3 rounded-md border border-border bg-background/50"
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Min Salary</label>
                  <Input
                    type="number"
                    placeholder="e.g. 50000"
                    value={filters.salaryMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, salaryMin: e.target.value }))}
                    className="h-10 bg-background/50 border-border"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Max Salary</label>
                  <Input
                    type="number"
                    placeholder="e.g. 100000"
                    value={filters.salaryMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, salaryMax: e.target.value }))}
                    className="h-10 bg-background/50 border-border"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remote"
                    checked={filters.isRemote}
                    onChange={(e) => setFilters(prev => ({ ...prev, isRemote: e.target.checked }))}
                    className="rounded border-border"
                  />
                  <label htmlFor="remote" className="text-sm font-medium">
                    Remote Only
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground">
              Found <span className="text-primary-glow font-medium">{jobs.length} opportunities</span>
              {currentLocation && ` near ${currentLocation.city}, ${currentLocation.state}`}
            </p>
            {currentLocation && (
              <p className="text-xs text-muted-foreground mt-1">
                Location: {geolocationService.formatLocation(currentLocation)} 
                <span className="ml-2 text-green-400">• {currentLocation.source.toUpperCase()}</span>
                {jobs.some(job => job.distance_miles) && (
                  <span className="ml-2 text-blue-400">
                    • {jobs.filter(job => job.distance_miles).length} jobs within 50 miles
                  </span>
                )}
              </p>
            )}
            {!currentLocation && (
              <p className="text-xs text-muted-foreground mt-1">
                Showing all available jobs. Enable location detection for distance-based sorting.
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Button variant="ghost" size="sm">Distance</Button>
            <Button variant="ghost" size="sm">Relevance</Button>
          </div>
        </div>

        {/* Job Listings */}
        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading opportunities...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.id} className="glass hover:shadow-elegant transition-smooth cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
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
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleSaveJob(job)}
                        className={savedJobs.has(job.id) ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-primary-glow"}
                      >
                        <Heart className={`w-4 h-4 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => job.external_url && window.open(job.external_url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Apply
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                      {job.distance_miles && (
                        <span className="text-primary-glow">• {job.distance_miles} miles</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary_display || 'Salary not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{formatTimeAgo(job.posted_date)}</span>
                    </div>
                  </div>

                  {job.description && (
                    <p className="text-foreground mb-4 line-clamp-2">{job.description}</p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {job.skills?.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-primary-glow/10 text-primary-glow border-primary-glow/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        {jobs.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or location to find more opportunities.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};