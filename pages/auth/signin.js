import { signIn } from 'next-auth/react';
import Head from 'next/head';

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-4">
      <Head>
        <title>Sign In - Latin Ride</title>
      </Head>
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Sign In</h1>
        <p className="text-lg mb-6">Please sign in to continue</p>
        <button
          onClick={() => signIn('google')}
          className="mt-4 bg-[#68CE8A] text-black py-2 px-4 rounded-lg hover:bg-[#58b078] transition duration-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
