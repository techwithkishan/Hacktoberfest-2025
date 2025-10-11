import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Briefcase, Star, Plus, X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id?: string;
  name: string;
  email: string;
  location: string;
  skills: string[];
  experience: string;
  jobPreferences: {
    jobTypes: string[];
    salaryMin: number;
    salaryMax: number;
    isRemote: boolean;
    preferredLocations: string[];
  };
  savedJobs: string[];
  appliedJobs: string[];
}

export const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    location: '',
    skills: [],
    experience: '',
    jobPreferences: {
      jobTypes: [],
      salaryMin: 0,
      salaryMax: 0,
      isRemote: false,
      preferredLocations: []
    },
    savedJobs: [],
    appliedJobs: []
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (profile.name) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  }, [profile]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // In a real app, this would save to Supabase
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addLocation = () => {
    if (newLocation.trim() && !profile.jobPreferences.preferredLocations.includes(newLocation.trim())) {
      setProfile(prev => ({
        ...prev,
        jobPreferences: {
          ...prev.jobPreferences,
          preferredLocations: [...prev.jobPreferences.preferredLocations, newLocation.trim()]
        }
      }));
      setNewLocation('');
    }
  };

  const removeLocation = (location: string) => {
    setProfile(prev => ({
      ...prev,
      jobPreferences: {
        ...prev.jobPreferences,
        preferredLocations: prev.jobPreferences.preferredLocations.filter(l => l !== location)
      }
    }));
  };

  const toggleJobType = (jobType: string) => {
    setProfile(prev => ({
      ...prev,
      jobPreferences: {
        ...prev.jobPreferences,
        jobTypes: prev.jobPreferences.jobTypes.includes(jobType)
          ? prev.jobPreferences.jobTypes.filter(t => t !== jobType)
          : [...prev.jobPreferences.jobTypes, jobType]
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-glow/20 flex items-center justify-center">
            <User className="w-6 h-6 text-primary-glow" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">User Profile</h1>
            <p className="text-muted-foreground">Manage your preferences and skills</p>
          </div>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "hero"}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="glass p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary-glow" />
            Basic Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                disabled={!isEditing}
                placeholder="Enter your location"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Experience</label>
              <Textarea
                value={profile.experience}
                onChange={(e) => setProfile(prev => ({ ...prev, experience: e.target.value }))}
                disabled={!isEditing}
                placeholder="Describe your experience..."
                className="min-h-20"
              />
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card className="glass p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary-glow" />
            Skills
          </h3>
          
          <div className="space-y-4">
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-primary-glow/10 text-primary-glow border-primary-glow/30">
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Job Preferences */}
        <Card className="glass p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary-glow" />
            Job Preferences
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Job Types</label>
              <div className="flex flex-wrap gap-2">
                {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                  <Button
                    key={type}
                    variant={profile.jobPreferences.jobTypes.includes(type) ? "hero" : "outline"}
                    size="sm"
                    onClick={() => isEditing && toggleJobType(type)}
                    disabled={!isEditing}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Min Salary</label>
                <Input
                  type="number"
                  value={profile.jobPreferences.salaryMin || ''}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    jobPreferences: {
                      ...prev.jobPreferences,
                      salaryMin: parseInt(e.target.value) || 0
                    }
                  }))}
                  disabled={!isEditing}
                  placeholder="50000"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Max Salary</label>
                <Input
                  type="number"
                  value={profile.jobPreferences.salaryMax || ''}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    jobPreferences: {
                      ...prev.jobPreferences,
                      salaryMax: parseInt(e.target.value) || 0
                    }
                  }))}
                  disabled={!isEditing}
                  placeholder="100000"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remote"
                checked={profile.jobPreferences.isRemote}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  jobPreferences: {
                    ...prev.jobPreferences,
                    isRemote: e.target.checked
                  }
                }))}
                disabled={!isEditing}
                className="rounded border-border"
              />
              <label htmlFor="remote" className="text-sm font-medium">
                Open to remote work
              </label>
            </div>
          </div>
        </Card>

        {/* Preferred Locations */}
        <Card className="glass p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-glow" />
            Preferred Locations
          </h3>
          
          <div className="space-y-4">
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Add a location..."
                  onKeyPress={(e) => e.key === 'Enter' && addLocation()}
                />
                <Button onClick={addLocation} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {profile.jobPreferences.preferredLocations.map((location) => (
                <Badge key={location} variant="outline" className="bg-accent-glow/10 text-accent-glow border-accent-glow/30">
                  {location}
                  {isEditing && (
                    <button
                      onClick={() => removeLocation(location)}
                      className="ml-2 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} className="min-w-32">
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

