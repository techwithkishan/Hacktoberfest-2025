import axios from 'axios';

export interface GitHubRepository {
  name: string;
  fullName: string;
  description: string;
  language: string;
  languages: { [key: string]: number };
  readme: string;
  packageJson?: any;
  requirementsTxt?: string;
  dockerfile?: string;
  technologies: string[];
}

class GitHubService {
  private baseURL = 'https://api.github.com';

  async getRepositoryInfo(owner: string, repo: string): Promise<GitHubRepository> {
    try {
      const [repoData, languages, readme] = await Promise.all([
        this.getRepositoryData(owner, repo),
        this.getRepositoryLanguages(owner, repo),
        this.getRepositoryReadme(owner, repo)
      ]);

      const technologies = this.extractTechnologies(repoData, languages, readme);

      return {
        name: repoData.name,
        fullName: repoData.full_name,
        description: repoData.description || '',
        language: repoData.language || '',
        languages,
        readme,
        technologies
      };
    } catch (error) {
      console.error('Error fetching GitHub repository:', error);
      throw new Error('Failed to fetch repository information');
    }
  }

  private async getRepositoryData(owner: string, repo: string) {
    const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}`);
    return response.data;
  }

  private async getRepositoryLanguages(owner: string, repo: string) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/languages`);
      return response.data;
    } catch (error) {
      return {};
    }
  }

  private async getRepositoryReadme(owner: string, repo: string): Promise<string> {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/readme`);
      const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
      return content;
    } catch (error) {
      return '';
    }
  }

  private extractTechnologies(repoData: any, languages: any, readme: string): string[] {
    const technologies = new Set<string>();

    // Add primary language
    if (repoData.language) {
      technologies.add(repoData.language);
    }

    // Add languages from languages API
    Object.keys(languages).forEach(lang => {
      technologies.add(lang);
    });

    // Extract technologies from README
    const readmeLower = readme.toLowerCase();
    
    // Common technologies and frameworks
    const techPatterns = [
      // Frontend
      'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt.js', 'gatsby',
      'typescript', 'javascript', 'html', 'css', 'sass', 'scss', 'tailwind',
      'bootstrap', 'material-ui', 'antd', 'chakra',
      
      // Backend
      'node.js', 'express', 'fastify', 'koa', 'nest.js', 'django', 'flask',
      'fastapi', 'spring', 'spring boot', 'laravel', 'symfony', 'rails',
      'asp.net', 'dotnet', 'php', 'python', 'java', 'c#', 'go', 'rust',
      
      // Databases
      'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'sqlite',
      'oracle', 'sql server', 'mariadb', 'cassandra', 'dynamodb',
      
      // Cloud & DevOps
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ansible',
      'jenkins', 'github actions', 'gitlab ci', 'circleci', 'travis ci',
      
      // Mobile
      'react native', 'flutter', 'ionic', 'xamarin', 'swift', 'kotlin',
      'android', 'ios',
      
      // Data & AI
      'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn', 'jupyter',
      'apache spark', 'hadoop', 'kafka', 'airflow',
      
      // Testing
      'jest', 'cypress', 'playwright', 'selenium', 'mocha', 'chai', 'jasmine'
    ];

    techPatterns.forEach(tech => {
      if (readmeLower.includes(tech.toLowerCase())) {
        technologies.add(tech);
      }
    });

    // Extract from package.json if available
    try {
      const packageJsonMatch = readme.match(/```json\s*([\s\S]*?)\s*```/);
      if (packageJsonMatch) {
        const packageJson = JSON.parse(packageJsonMatch[1]);
        if (packageJson.dependencies) {
          Object.keys(packageJson.dependencies).forEach(dep => {
            technologies.add(dep);
          });
        }
        if (packageJson.devDependencies) {
          Object.keys(packageJson.devDependencies).forEach(dep => {
            technologies.add(dep);
          });
        }
      }
    } catch (error) {
      // Ignore package.json parsing errors
    }

    return Array.from(technologies);
  }

  async getRepositoryFiles(owner: string, repo: string, path: string = '') {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/contents/${path}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching repository files:', error);
      return [];
    }
  }

  async getFileContent(owner: string, repo: string, path: string): Promise<string> {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/contents/${path}`);
      const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
      return content;
    } catch (error) {
      console.error('Error fetching file content:', error);
      return '';
    }
  }
}

export const githubService = new GitHubService();

