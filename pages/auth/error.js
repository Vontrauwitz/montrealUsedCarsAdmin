import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  useEffect(() => {
    console.error('Error occurred: ', error);
  }, [error]);

  const getErrorMessage = () => {
    switch (error) {
      case 'AccessDenied':
        return 'You do not have permission to access this page.';
      case 'OAuthAccountNotLinked':
        return 'To confirm your identity, sign in with the same account you used originally.';
      default:
        return 'An unexpected error occurred.';
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-4">
      <Head>
        <title>Error - Latin Ride</title>
      </Head>
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg mb-6">{getErrorMessage()}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-[#68CE8A] text-black py-2 px-4 rounded-lg hover:bg-[#58b078] transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
