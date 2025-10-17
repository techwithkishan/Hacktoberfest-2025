import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const SocialMediaDashboard = dynamic(() => import('../components/SocialMediaDashboard/SocialMediaDashboard'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-white text-xl">Loading Social Media Dashboard...</p>
    </div>
  ),
});

const SocialMediaPage: NextPage = () => {
  const title = 'Social Media Analytics Dashboard';
  const description = 'Track and analyze your social media performance across all platforms';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="social media, analytics, dashboard, engagement, followers" />
      </Head>
      <SocialMediaDashboard />
    </>
  );
};

export default SocialMediaPage;