import { FC } from 'react';
import { TrendingUp } from 'lucide-react';

interface PlatformData {
  platform: string;
  followers: number;
  engagement: number;
  growth: number;
  icon: JSX.Element;
  gradient: string;
  color: string;
}

interface PlatformCardProps {
  platform: PlatformData;
  loading?: boolean;
}

const PlatformCard: FC<PlatformCardProps> = ({ platform, loading }) => (
  <div className="group relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
    <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 hover:scale-105">
      <div className={`bg-gradient-to-r ${platform.gradient} rounded-2xl p-3 w-14 h-14 mx-auto mb-4 flex items-center justify-center shadow-lg`}>
        {platform.icon}
      </div>
      <h3 className="font-bold text-lg mb-2 text-white">{platform.platform}</h3>
      
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 bg-gray-600/50 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-600/50 rounded animate-pulse w-3/4 mx-auto"></div>
          <div className="h-3 bg-gray-600/50 rounded animate-pulse w-1/2 mx-auto"></div>
        </div>
      ) : (
        <>
          <p className="text-gray-300 mb-1 text-sm">{platform.followers.toLocaleString()} followers</p>
          <div className="flex items-center justify-center space-x-1 mb-1">
            <TrendingUp className={`w-3 h-3 ${platform.growth > 0 ? 'text-green-400' : 'text-red-400'}`} />
            <span className={`text-xs ${platform.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {platform.growth > 0 ? '+' : ''}{platform.growth.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full inline-block">
            {platform.engagement.toFixed(1)}% engagement
          </p>
        </>
      )}
    </div>
  </div>
);

export default PlatformCard;