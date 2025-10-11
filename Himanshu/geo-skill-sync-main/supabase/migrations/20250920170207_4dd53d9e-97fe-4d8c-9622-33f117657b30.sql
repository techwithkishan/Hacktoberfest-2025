-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  distance_miles DECIMAL(5, 2),
  salary_min INTEGER,
  salary_max INTEGER,
  salary_display TEXT,
  job_type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT,
  skills TEXT[],
  posted_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_remote BOOLEAN DEFAULT false,
  external_url TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (jobs are public information)
CREATE POLICY "Jobs are viewable by everyone" 
ON public.jobs 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to insert jobs (for admin/data import)
CREATE POLICY "Authenticated users can insert jobs" 
ON public.jobs 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create policy for authenticated users to update jobs
CREATE POLICY "Authenticated users can update jobs" 
ON public.jobs 
FOR UPDATE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for location-based queries
CREATE INDEX idx_jobs_location ON public.jobs(latitude, longitude);
CREATE INDEX idx_jobs_is_remote ON public.jobs(is_remote);
CREATE INDEX idx_jobs_posted_date ON public.jobs(posted_date DESC);
CREATE INDEX idx_jobs_skills ON public.jobs USING GIN(skills);

-- Insert sample jobs with real coordinates
INSERT INTO public.jobs (title, company, location, latitude, longitude, distance_miles, salary_min, salary_max, salary_display, job_type, description, skills, is_remote, external_url, source) VALUES
('Frontend Developer', 'TechCorp', 'San Francisco, CA', 37.7749, -122.4194, 0, 80000, 120000, '$80k - $120k', 'Full-time', 'Build modern web applications using React and TypeScript. Work with a dynamic team on cutting-edge projects.', ARRAY['React', 'TypeScript', 'CSS'], false, 'https://example.com/job1', 'company_direct'),
('Full Stack Engineer', 'StartupXYZ', 'Remote', NULL, NULL, NULL, 90000, 140000, '$90k - $140k', 'Full-time', 'Work on cutting-edge projects with modern tech stack. Remote-first company with flexible hours.', ARRAY['Node.js', 'React', 'Python'], true, 'https://example.com/job2', 'company_direct'),
('UI/UX Designer', 'DesignHub', 'Oakland, CA', 37.8044, -122.2712, 8.3, 70000, 100000, '$70k - $100k', 'Full-time', 'Create beautiful and intuitive user experiences. Work with cross-functional teams.', ARRAY['Figma', 'Adobe Creative Suite', 'User Research'], false, 'https://example.com/job3', 'company_direct'),
('Backend Developer', 'CloudTech', 'Palo Alto, CA', 37.4419, -122.1430, 15.2, 95000, 130000, '$95k - $130k', 'Full-time', 'Build scalable backend systems and APIs. Experience with cloud platforms preferred.', ARRAY['Python', 'AWS', 'PostgreSQL'], false, 'https://example.com/job4', 'company_direct'),
('DevOps Engineer', 'ScaleUp Inc', 'San Jose, CA', 37.3382, -121.8863, 25.4, 100000, 150000, '$100k - $150k', 'Full-time', 'Manage infrastructure and deployment pipelines. Kubernetes and Docker experience required.', ARRAY['Kubernetes', 'Docker', 'AWS'], false, 'https://example.com/job5', 'company_direct'),
('Product Manager', 'InnovateCorp', 'Remote', NULL, NULL, NULL, 110000, 160000, '$110k - $160k', 'Full-time', 'Lead product strategy and roadmap. Work with engineering and design teams to deliver great products.', ARRAY['Product Strategy', 'Analytics', 'Agile'], true, 'https://example.com/job6', 'company_direct');