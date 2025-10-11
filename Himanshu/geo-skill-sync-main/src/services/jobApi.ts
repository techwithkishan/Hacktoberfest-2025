import axios from 'axios';

export interface JobApiResponse {
  jobs: any[];
  total: number;
  page: number;
  hasMore: boolean;
}

export interface JobSearchParams {
  query?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  jobType?: string;
  skills?: string[];
  salaryMin?: number;
  salaryMax?: number;
  isRemote?: boolean;
  page?: number;
  limit?: number;
}

class JobApiService {
  // Mock job APIs - in production, these would be real API endpoints
  private mockJobs = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      latitude: 37.7749,
      longitude: -122.4194,
      salary_min: 120000,
      salary_max: 160000,
      salary_display: '$120k - $160k',
      job_type: 'Full-time',
      description: 'We are looking for a senior React developer to join our team...',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      posted_date: new Date().toISOString(),
      is_remote: false,
      external_url: 'https://example.com/job1',
      source: 'linkedin'
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      latitude: null,
      longitude: null,
      salary_min: 90000,
      salary_max: 130000,
      salary_display: '$90k - $130k',
      job_type: 'Full-time',
      description: 'Join our remote-first team as a full stack engineer...',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      posted_date: new Date(Date.now() - 86400000).toISOString(),
      is_remote: true,
      external_url: 'https://example.com/job2',
      source: 'ncs'
    }
  ];

  async searchJobs(params: JobSearchParams): Promise<JobApiResponse> {
    try {
      // In a real implementation, this would make API calls to:
      // - LinkedIn Jobs API
      // - NCS (National Career Service) API
      // - Internshala API
      // - Other job board APIs

      let filteredJobs = [...this.mockJobs];

      // Apply filters
      if (params.query) {
        const query = params.query.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query)
        );
      }

      if (params.location) {
        const location = params.location.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(location)
        );
      }

      if (params.skills && params.skills.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          params.skills!.some(skill => 
            job.skills.some(jobSkill => 
              jobSkill.toLowerCase().includes(skill.toLowerCase())
            )
          )
        );
      }

      if (params.isRemote !== undefined) {
        filteredJobs = filteredJobs.filter(job => job.is_remote === params.isRemote);
      }

      if (params.salaryMin) {
        filteredJobs = filteredJobs.filter(job => 
          job.salary_min && job.salary_min >= params.salaryMin!
        );
      }

      if (params.salaryMax) {
        filteredJobs = filteredJobs.filter(job => 
          job.salary_max && job.salary_max <= params.salaryMax!
        );
      }

      // Calculate distance if coordinates provided
      if (params.latitude && params.longitude) {
        filteredJobs = filteredJobs.map(job => {
          if (job.latitude && job.longitude) {
            const distance = this.calculateDistance(
              params.latitude!,
              params.longitude!,
              job.latitude,
              job.longitude
            );
            return { ...job, distance_miles: Math.round(distance * 10) / 10 };
          }
          return job;
        });

        // Sort by distance
        filteredJobs.sort((a, b) => {
          if (a.is_remote && !b.is_remote) return 1;
          if (!a.is_remote && b.is_remote) return -1;
          if (a.distance_miles && b.distance_miles) {
            return a.distance_miles - b.distance_miles;
          }
          return 0;
        });
      }

      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

      return {
        jobs: paginatedJobs,
        total: filteredJobs.length,
        page,
        hasMore: endIndex < filteredJobs.length
      };
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw new Error('Failed to search jobs');
    }
  }

  async getJobById(id: string) {
    try {
      // In production, this would fetch from the actual job API
      const job = this.mockJobs.find(j => j.id === id);
      if (!job) {
        throw new Error('Job not found');
      }
      return job;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw new Error('Failed to fetch job details');
    }
  }

  async getJobsByCompany(company: string) {
    try {
      const jobs = this.mockJobs.filter(job => 
        job.company.toLowerCase().includes(company.toLowerCase())
      );
      return jobs;
    } catch (error) {
      console.error('Error fetching jobs by company:', error);
      throw new Error('Failed to fetch company jobs');
    }
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Real API integrations would go here
  async searchLinkedInJobs(params: JobSearchParams) {
    // LinkedIn Jobs API integration
    // This would require LinkedIn API credentials and proper authentication
    throw new Error('LinkedIn API integration not implemented');
  }

  async searchNCSJobs(params: JobSearchParams) {
    // NCS API integration
    // This would require NCS API credentials
    throw new Error('NCS API integration not implemented');
  }

  async searchInternshalaJobs(params: JobSearchParams) {
    // Internshala API integration
    // This would require Internshala API credentials
    throw new Error('Internshala API integration not implemented');
  }
}

export const jobApiService = new JobApiService();

