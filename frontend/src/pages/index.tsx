
import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const HacktoberfestDashboard = dynamic(() => import('../components/HacktoberfestDashboard'), {
  ssr: false,
  loading: () => <p>Loading dashboard...</p>,
});

const Home: NextPage = () => {
  const title = 'Hacktoberfest 2025 - Join the Open Source Celebration';
  const description =
    'Join Hacktoberfest 2025 and contribute to open source projects. Win swag, learn new skills, and connect with the global developer community.';
  const keywords =
    'hacktoberfest, open source, github, pull requests, developers, coding, programming';
  const url = 'https://github.com/hari7261/Hacktoberfest-2025';
  const image = 'https://yourdomain.com/og-image.png'; 

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HacktoberfestDashboard />
    </>
  );
};

export default Home;
