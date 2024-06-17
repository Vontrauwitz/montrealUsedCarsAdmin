import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Cars() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Layout session={session}>
      <div className='text-white'>
        <Link  className='bg-gray-300 rounded-md text-black py-1 px-2' href={'/cars/new'}>Add New Cars</Link>
        {/* Otros componentes y contenido aquí */}
      </div>
    </Layout>
  );
}