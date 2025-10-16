import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/social-media');
  }, [router]);

  return (
    <>
      <Head>
        <title>Social Media Analytics Dashboard</title>
        <meta name="description" content="Track and analyze your social media performance" />
      </Head>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Redirecting to Social Media Dashboard...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    </>
  );
}
