import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import axios from 'axios';
import CarForm from '@/components/CarForm';

export default function NewCars() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState('');

  const handleSubmit = async (carData) => {
    try {
      const response = await axios.post('/api/cars', carData);
      console.log('Car created:', response.data);
      setMessage('Coche cargado correctamente');
    } catch (error) {
      console.error('Error creating car:', error);
      setMessage('Error al cargar el coche');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Layout session={session}>
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6 text-white">Add a New Car</h1>
        {message && <p className="text-center text-green-500">{message}</p>}
        <CarForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}
