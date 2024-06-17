import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
    <div className='text-white'>
      <div className="flex justify-end items-center space-x-4 mt-4 mr-4">
        <img
          src={session?.user?.image}
          alt={session?.user?.name}
          className="w-12 h-12 rounded-full"
        />
        <span>Hello, {session?.user?.name}</span>
      </div>
      <div>
        hola como estas
      </div>

    </div>
    </Layout>
  );
}
