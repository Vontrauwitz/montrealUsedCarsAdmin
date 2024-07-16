import Head from 'next/head';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-4">
      <Head>
        <title>Access Denied - Latin Ride</title>
      </Head>
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg mb-6">You do not have access to this page.</p>
      </div>
    </div>
  );
}
