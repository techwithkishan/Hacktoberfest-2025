import { FC } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { SocialStats } from '../../../../services/socialApi';

interface PlatformData {
  platform: string;
  followers: number;
  engagement: number;
  growth: number;
  icon: JSX.Element;
  color: string;
  gradient: string;
}

interface AnalyticsChartsProps {
  stats: SocialStats;
  platforms: PlatformData[];
  loading?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const RADAR_COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AnalyticsCharts: FC<AnalyticsChartsProps> = ({ stats, platforms, loading }) => {
  // Generate sample data for charts
  const engagementData = platforms.map(platform => ({
    name: platform.platform,
    engagement: Number(platform.engagement.toFixed(1)),
    followers: platform.followers / 1000, // Convert to thousands
    growth: Number(platform.growth.toFixed(1))
  }));

  const growthData = [
    { month: 'Jan', followers: 4000, engagement: 2.4 },
    { month: 'Feb', followers: 3000, engagement: 1.8 },
    { month: 'Mar', followers: 2000, engagement: 2.2 },
    { month: 'Apr', followers: 2780, engagement: 2.8 },
    { month: 'May', followers: 1890, engagement: 3.2 },
    { month: 'Jun', followers: 2390, engagement: 2.9 },
    { month: 'Jul', followers: 3490, engagement: 3.5 },
  ];

  const audienceData = [
    { name: '18-24', value: 25 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 20 },
    { name: '45-54', value: 12 },
    { name: '55+', value: 8 },
  ];

  const postPerformanceData = [
    { name: 'Post 1', likes: 1200, shares: 85, comments: 45 },
    { name: 'Post 2', likes: 980, shares: 42, comments: 32 },
    { name: 'Post 3', likes: 1650, shares: 120, comments: 78 },
    { name: 'Post 4', likes: 870, shares: 35, comments: 28 },
    { name: 'Post 5', likes: 1420, shares: 95, comments: 52 },
  ];

  const platformComparisonData = platforms.map(platform => ({
    subject: platform.platform,
    followers: platform.followers / 10000, // Normalize for radar chart
    engagement: platform.engagement * 10, // Scale for better visualization
    growth: platform.growth * 2,
    fullMark: 100,
  }));

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 border border-gray-700 rounded-lg p-3 backdrop-blur-sm">
          <p className="text-white font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: item * 0.1 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 h-80 animate-pulse border border-white/10"
          >
            <div className="h-6 bg-gray-600/50 rounded w-1/3 mb-4"></div>
            <div className="h-full bg-gray-600/30 rounded"></div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Engagement Comparison */}
      <motion.div
        variants={chartVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Platform Engagement Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF" 
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="engagement" 
              fill="#3B82F6" 
              name="Engagement Rate (%)" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="growth" 
              fill="#10B981" 
              name="Growth Rate (%)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Trends */}
        <motion.div
          variants={chartVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Monthly Growth Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="followers" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3} 
                name="New Followers" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="engagement" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.3} 
                name="Engagement Rate" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Audience Demographics */}
        <motion.div
          variants={chartVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Audience Age Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={audienceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {audienceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Platform Radar Comparison */}
      <motion.div
        variants={chartVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.25 }}
        className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          Platform Performance Radar
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={platformComparisonData}>
            <PolarGrid stroke="#374151" opacity={0.3} />
            <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
            <PolarRadiusAxis stroke="#9CA3AF" opacity={0.5} />
            <Radar
              name="Followers"
              dataKey="followers"
              stroke="#0088FE"
              fill="#0088FE"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Engagement"
              dataKey="engagement"
              stroke="#00C49F"
              fill="#00C49F"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Growth"
              dataKey="growth"
              stroke="#FFBB28"
              fill="#FFBB28"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Post Performance */}
      <motion.div
        variants={chartVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Top Posts Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={postPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="likes" 
              fill="#EF4444" 
              name="Likes" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="shares" 
              fill="#10B981" 
              name="Shares" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="comments" 
              fill="#3B82F6" 
              name="Comments" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsCharts;