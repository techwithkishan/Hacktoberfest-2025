export interface SocialStats {
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
  likes: number;
  shares: number;
}

export interface PlatformStats {
  platform: string;
  followers: number;
  engagement: number;
  growth: number;
  last_updated: string;
}

export interface ApiResponse {
  success: boolean;
  data: {
    platforms: PlatformStats[];
    totals: SocialStats;
    last_updated: string;
  };
}

class SocialApiService {
  private baseUrl = '/api';

  async getSocialStats(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/social/stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch social stats');
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getTwitterStats() {
    try {
      const response = await fetch(`${this.baseUrl}/twitter/stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch Twitter stats');
      }
      return await response.json();
    } catch (error) {
      console.error('Twitter API Error:', error);
      throw error;
    }
  }

  // Method to simulate real API integration with error handling
  async refreshData(): Promise<ApiResponse> {
    // Simulate API call with random data to show real-time updates
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return this.getSocialStats();
  }
}

export const socialApiService = new SocialApiService();