import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader'

export default function Order() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loader/>;
  }

  return (
    <Layout session={session}>
      <div>
        <h1>Order Page</h1>
        {/* Otros componentes y contenido aquí */}
      </div>
    </Layout>
  );
}