import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';

export default function Order() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
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