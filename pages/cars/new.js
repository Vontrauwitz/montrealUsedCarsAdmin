import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import axios from 'axios';
import CarForm from '@/components/CarForm';
import { useRouter } from 'next/router';

export default function NewCars() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(null);
  const router = useRouter();

  const handleSubmit = async (carData) => {
    try {
      const response = await axios.post('/api/cars', carData);
      console.log('Car created:', response.data);
      setMessage('Car created successfully. Redirecting in 5 seconds...');
      setCountdown(5);
    } catch (error) {
      console.error('Error creating car:', error);
      setMessage('Error creating car');
    }
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      router.push('/cars');
    } else {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, router]);

  const handleReturnToInventory = () => {
    router.push('/cars');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Layout session={session}>
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6 text-white">Add a New Car</h1>
        {message && (
          <p className="text-center text-green-500">
            {message} {countdown !== null && countdown > 0 && `(${countdown}s)`}
          </p>
        )}
        <CarForm onSubmit={handleSubmit} />
        <button 
          onClick={handleReturnToInventory} 
          className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Return to Inventory
        </button>
      </div>
    </Layout>
  );
}
