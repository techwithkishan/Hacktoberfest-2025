import {Request,Response} from 'express'

export const getStats = (req:Request, res:Response) => {
    // Mock data for demonstration
    const stats = {
      totalPRs: Math.floor(Math.random() * 100) + 50,
      contributors: Math.floor(Math.random() * 50) + 20,
      repositories: 3,
      badges: Math.floor(Math.random() * 30) + 25
    };
    
    res.json(stats);
  }

