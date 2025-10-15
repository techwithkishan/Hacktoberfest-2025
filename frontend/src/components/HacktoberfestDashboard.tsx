import { useState, useEffect, FC } from 'react';
import { Calendar, Users, GitBranch, Award } from 'lucide-react';

interface Stats {
  totalPRs: number;
  contributors: number;
  repositories: number;
  badges: number;
}

interface Contributor {
  id: number;
  name: string;
  prs: number;
  avatar: string;
}

interface StatCardProps {
  icon: JSX.Element;
  title: string;
  value: number;
  color: string;
}

interface ContributorCardProps {
  contributor: Contributor;
  rank: number;
}

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const MOCK_CONTRIBUTORS: Contributor[] = [
  { id: 1, name: 'Alice Johnson', prs: 5, avatar: '👩‍💻' },
  { id: 2, name: 'Bob Smith', prs: 3, avatar: '👨‍💻' },
  { id: 3, name: 'Carol Davis', prs: 7, avatar: '👩‍🎨' },
];

const HacktoberfestDashboard: FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalPRs: 0,
    contributors: 0,
    repositories: 0,
    badges: 0,
  });

  const [contributors, setContributors] = useState<Contributor[]>(MOCK_CONTRIBUTORS);

  useEffect(() => {
    // Simulated fetch for stats
    const timer = setTimeout(() => {
      setStats({
        totalPRs: 42,
        contributors: 18,
        repositories: 3,
        badges: 25,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            🎃 Hacktoberfest 2025
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join the global celebration of open source! Contribute to projects, learn new skills, and win awesome swag.
          </p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<GitBranch className="w-8 h-8" />} title="Pull Requests" value={stats.totalPRs} color="bg-green-500" />
          <StatCard icon={<Users className="w-8 h-8" />} title="Contributors" value={stats.contributors} color="bg-blue-500" />
          <StatCard icon={<Calendar className="w-8 h-8" />} title="Repositories" value={stats.repositories} color="bg-purple-500" />
          <StatCard icon={<Award className="w-8 h-8" />} title="Badges Earned" value={stats.badges} color="bg-orange-500" />
        </section>

        {/* Contributors Leaderboard */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">🏆 Top Contributors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contributors.map((contributor, index) => (
              <ContributorCard key={contributor.id} contributor={contributor} rank={index + 1} />
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">🚀 Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Step number={1} title="Register" description="Sign up for Hacktoberfest 2025" />
            <Step number={2} title="Find Issues" description="Look for issues labeled 'hacktoberfest'" />
            <Step number={3} title="Create PRs" description="Submit quality pull requests" />
            <Step number={4} title="Win Swag" description="Complete 4 PRs and get rewards!" />
          </div>
        </section>
      </div>
    </main>
  );
};

const StatCard: FC<StatCardProps> = ({ icon, title, value, color }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
    <div className={`${color} rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-2">{value}</h3>
    <p className="text-gray-300">{title}</p>
  </div>
);

const ContributorCard: FC<ContributorCardProps> = ({ contributor, rank }) => (
  <div className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-all">
    <div className="text-4xl mb-3" aria-hidden>{contributor.avatar}</div>
    <h3 className="font-bold text-lg mb-2">{contributor.name}</h3>
    <p className="text-gray-300 mb-2">{contributor.prs} Pull Requests</p>
    <div className="flex items-center justify-center">
      <span className="text-2xl">{rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}</span>
      <span className="ml-2 font-bold">#{rank}</span>
    </div>
  </div>
);

const Step: FC<StepProps> = ({ number, title, description }) => (
  <div className="text-center">
    <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

export default HacktoberfestDashboard;
