import {Request,Response} from 'express'

export const getContributors = (req:Request, res:Response) => {
    // Mock contributors data
    const contributors = [
      { id: 1, name: 'Alice Johnson', prs: 5, avatar: '👩‍💻', joined: '2025-10-01' },
      { id: 2, name: 'Bob Smith', prs: 3, avatar: '👨‍💻', joined: '2025-10-02' },
      { id: 3, name: 'Carol Davis', prs: 7, avatar: '👩‍🎨', joined: '2025-10-01' },
      { id: 4, name: 'David Wilson', prs: 4, avatar: '👨‍🚀', joined: '2025-10-03' },
      { id: 5, name: 'Emma Brown', prs: 6, avatar: '👩‍🔬', joined: '2025-10-02' }
    ];
    
    // Sort by PRs descending
    contributors.sort((a, b) => b.prs - a.prs);
    
    res.json(contributors);
  }