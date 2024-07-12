import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';

export default function Settings() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loader/>;
  }

  return (
    <Layout session={session}>
      <div>
        <h1>Settings Page</h1>
        {/* Otros componentes y contenido aquí */}
      </div>
    </Layout>
  );
}