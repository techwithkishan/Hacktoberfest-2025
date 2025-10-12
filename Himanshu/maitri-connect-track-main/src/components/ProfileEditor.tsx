import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Save } from "lucide-react";
import { toast } from "sonner";

interface ProfileEditorProps {
  maitriId: string;
  workerData: any;
  onUpdate: (updatedData: any) => void;
  onClose: () => void;
}

export const ProfileEditor = ({ maitriId, workerData, onUpdate, onClose }: ProfileEditorProps) => {
  const [formData, setFormData] = useState({ ...workerData });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update localStorage
    const workers = JSON.parse(localStorage.getItem('maitri-workers') || '{}');
    workers[maitriId] = formData;
    localStorage.setItem('maitri-workers', JSON.stringify(workers));

    toast.success("Profile updated successfully!");
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container mx-auto p-4 md:p-8">
        <Card className="max-w-2xl mx-auto shadow-[var(--shadow-card)]">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardTitle className="text-2xl">Edit Your Profile</CardTitle>
            <CardDescription className="text-base">Update your information</CardDescription>
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
                    Change Photo
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
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="min-h-[48px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="min-h-[48px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="homeState">Home State/Village</Label>
                  <Input
                    id="homeState"
                    value={formData.homeState}
                    onChange={(e) => setFormData({ ...formData, homeState: e.target.value })}
                    className="min-h-[48px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="min-h-[48px]"
                  />
                </div>
              </div>

              {/* Work Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Primary Skills</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., Construction, Agriculture, Manufacturing"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="min-h-[48px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentEmployer">Current Employer/Contractor</Label>
                  <Input
                    id="currentEmployer"
                    value={formData.currentEmployer}
                    onChange={(e) => setFormData({ ...formData, currentEmployer: e.target.value })}
                    className="min-h-[48px]"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 min-h-[48px]"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 min-h-[48px]"
                >
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
