import {Request,Response} from 'express'

export const getProjects = (req:Request, res:Response) => {
    const projects = [
      {
        id: 1,
        name: 'Frontend Dashboard',
        language: 'TypeScript',
        difficulty: 'Beginner',
        issues: 12,
        description: 'React-based dashboard for Hacktoberfest statistics'
      },
      {
        id: 2,
        name: 'Backend API',
        language: 'Node.js',
        difficulty: 'Intermediate',
        issues: 8,
        description: 'Express.js API for managing Hacktoberfest data'
      },
      {
        id: 3,
        name: 'Python Scripts',
        language: 'Python',
        difficulty: 'Beginner',
        issues: 15,
        description: 'Utility scripts for data processing and automation'
      }
    ];
    
    res.json(projects);
  }