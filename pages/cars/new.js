import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import CarForm from '@/components/CarForm';  // Asegúrate de ajustar la ruta de importación según tu estructura de carpetas

export default function NewCars() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState('');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Layout session={session}>
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6 text-white">Add a New Car</h1>
        {message && <p className="text-center text-green-500">{message}</p>}
        <CarForm setMessage={setMessage} session={session} />
      </div>
    </Layout>
  );
}