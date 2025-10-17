import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const platforms = ['twitter', 'instagram', 'facebook', 'linkedin'];
      
      const platformData = await Promise.all(
        platforms.map(async (platform) => {
          const stats = {
            twitter: {
              followers: 15200 + Math.floor(Math.random() * 1000),
              engagement: 4.2 + (Math.random() * 2 - 1),
              growth: 12.5 + (Math.random() * 5 - 2.5)
            },
            instagram: {
              followers: 23400 + Math.floor(Math.random() * 1000),
              engagement: 3.8 + (Math.random() * 2 - 1),
              growth: 8.7 + (Math.random() * 5 - 2.5)
            },
            facebook: {
              followers: 18700 + Math.floor(Math.random() * 1000),
              engagement: 2.1 + (Math.random() * 2 - 1),
              growth: 5.2 + (Math.random() * 5 - 2.5)
            },
            linkedin: {
              followers: 8900 + Math.floor(Math.random() * 1000),
              engagement: 5.1 + (Math.random() * 2 - 1),
              growth: 15.3 + (Math.random() * 5 - 2.5)
            }
          };

          await new Promise(resolve => setTimeout(resolve, 200));
          
          return {
            platform,
            ...stats[platform as keyof typeof stats],
            last_updated: new Date().toISOString()
          };
        })
      );

      // Calculate totals
      const totalFollowers = platformData.reduce((sum, platform) => sum + platform.followers, 0);
      const avgEngagement = platformData.reduce((sum, platform) => sum + platform.engagement, 0) / platformData.length;

      res.status(200).json({
        success: true,
        data: {
          platforms: platformData,
          totals: {
            followers: totalFollowers,
            engagement: parseFloat(avgEngagement.toFixed(2)),
            reach: 125000 + Math.floor(Math.random() * 10000),
            impressions: 450000 + Math.floor(Math.random() * 50000),
            likes: 12800 + Math.floor(Math.random() * 1000),
            shares: 247 + Math.floor(Math.random() * 100)
          },
          last_updated: new Date().toISOString()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch social media data'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}