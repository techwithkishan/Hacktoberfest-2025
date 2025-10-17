import { FC } from 'react';
import { Heart, Share2, Eye } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  engagement: number;
  likes: number;
  shares: number;
  platform: string;
  date: string;
  platformColor: string;
}

interface PostAnalyticsProps {
  post: Post;
}

const PostAnalytics: FC<PostAnalyticsProps> = ({ post }) => (
  <div className="group relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
    <div className="relative bg-white/5 backdrop-blur-md rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 group-hover:scale-105">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <span className={`border-l-4 ${post.platformColor} pl-3 py-1`}></span>
            <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded-full">{post.platform}</span>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>
          <h4 className="font-semibold text-lg mb-3 text-white group-hover:text-cyan-100 transition-colors">
            {post.title}
          </h4>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">{post.engagement.toLocaleString()} views</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="flex items-center space-x-2 text-red-400">
              <Heart className="w-5 h-5" />
              <span className="font-semibold">{post.likes}</span>
            </div>
            <span className="text-xs text-gray-400">Likes</span>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-2 text-green-400">
              <Share2 className="w-5 h-5" />
              <span className="font-semibold">{post.shares}</span>
            </div>
            <span className="text-xs text-gray-400">Shares</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PostAnalytics;