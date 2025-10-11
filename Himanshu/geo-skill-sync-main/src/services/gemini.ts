import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '@/config/env';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

export interface ProjectAnalysis {
  detectedSkills: string[];
  projectType: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  technologies: string[];
  frameworks: string[];
  databases: string[];
  cloudServices: string[];
  description: string;
  matchedRoles: {
    title: string;
    match: number;
    companies: string[];
    avgSalary: string;
    reasoning: string;
  }[];
}

export interface JobMatch {
  jobId: string;
  title: string;
  company: string;
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  reasoning: string;
}

class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async analyzeProject(projectDescription: string, githubUrl?: string): Promise<ProjectAnalysis> {
    try {
      const prompt = `
        Analyze the following project description and extract technical information:
        
        Project Description: ${projectDescription}
        ${githubUrl ? `GitHub URL: ${githubUrl}` : ''}
        
        Please provide a detailed analysis in the following JSON format:
        {
          "detectedSkills": ["skill1", "skill2", "skill3"],
          "projectType": "Web Application | Mobile App | Desktop App | Data Science | AI/ML | etc.",
          "complexity": "Beginner | Intermediate | Advanced",
          "technologies": ["JavaScript", "Python", "Java", "etc."],
          "frameworks": ["React", "Express", "Django", "etc."],
          "databases": ["PostgreSQL", "MongoDB", "MySQL", "etc."],
          "cloudServices": ["AWS", "Azure", "GCP", "etc."],
          "description": "Brief summary of the project",
          "matchedRoles": [
            {
              "title": "Job Title",
              "match": 85,
              "companies": ["Company1", "Company2"],
              "avgSalary": "$80k - $120k",
              "reasoning": "Why this role matches"
            }
          ]
        }
        
        Focus on:
        1. Technical skills and technologies used
        2. Project complexity and scope
        3. Career roles that would value these skills
        4. Realistic salary ranges for each role
        5. Companies known for hiring these roles
        
        Return only valid JSON, no additional text.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean up the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to parse AI response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error analyzing project:', error);
      throw new Error('Failed to analyze project. Please try again.');
    }
  }

  async matchProjectToJobs(projectAnalysis: ProjectAnalysis, jobs: any[]): Promise<JobMatch[]> {
    try {
      const prompt = `
        Match the following project analysis to job listings and provide match scores:
        
        Project Analysis:
        - Skills: ${projectAnalysis.detectedSkills.join(', ')}
        - Technologies: ${projectAnalysis.technologies.join(', ')}
        - Frameworks: ${projectAnalysis.frameworks.join(', ')}
        - Project Type: ${projectAnalysis.projectType}
        - Complexity: ${projectAnalysis.complexity}
        
        Available Jobs:
        ${jobs.map(job => `
          - Title: ${job.title}
          - Company: ${job.company}
          - Skills: ${job.skills?.join(', ') || 'Not specified'}
          - Description: ${job.description || 'No description'}
          - Job Type: ${job.job_type}
          - Location: ${job.location}
        `).join('\n')}
        
        For each job, provide a match score (0-100) and reasoning. Return as JSON array:
        [
          {
            "jobId": "job_id",
            "title": "Job Title",
            "company": "Company Name",
            "matchScore": 85,
            "matchingSkills": ["skill1", "skill2"],
            "missingSkills": ["skill3", "skill4"],
            "reasoning": "Why this job matches the project"
          }
        ]
        
        Consider:
        1. Skill overlap between project and job requirements
        2. Technology stack compatibility
        3. Project complexity vs job level
        4. Industry relevance
        
        Return only valid JSON array, no additional text.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Failed to parse job matching response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error matching project to jobs:', error);
      throw new Error('Failed to match project to jobs. Please try again.');
    }
  }

  async extractSkillsFromGitHub(githubUrl: string): Promise<string[]> {
    try {
      // Extract repository info from GitHub URL
      const repoMatch = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!repoMatch) {
        throw new Error('Invalid GitHub URL');
      }
      
      const [, owner, repo] = repoMatch;
      
      // This would typically involve GitHub API calls
      // For now, return a placeholder that would be replaced with actual GitHub API integration
      return ['GitHub Integration', 'Repository Analysis'];
    } catch (error) {
      console.error('Error extracting skills from GitHub:', error);
      throw new Error('Failed to analyze GitHub repository. Please try again.');
    }
  }
}

export const geminiService = new GeminiService();
