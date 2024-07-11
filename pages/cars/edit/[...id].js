import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CarForm from '@/components/CarForm';

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(null); // Estado para el contador
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/cars?id=${id}`)
        .then(response => {
          setProductInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching car:', error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      router.push('/cars');
    } else {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, router]);

  const handleUpdate = async (updatedData) => {
    try {
      const response = await axios.put(`/api/cars?id=${id}`, updatedData);
      console.log('Car updated:', response.data);
      setMessage('Car updated successfully. You will be redirected in 5 seconds...');
      setCountdown(5); // Reinicia el contador a 5 segundos
    } catch (error) {
      console.error('Error updating car:', error);
      setMessage('Error updating car');
    }
  };

  const returnToInventory = () => {
    router.push('/cars');
  };

  if (!productInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6 text-white">Edit a Car</h1>
        {message && <p className="text-center text-green-500">{message.replace('5 seconds', `${countdown !== null ? countdown : 5} seconds`)}</p>}
        <CarForm initialData={productInfo} onSubmit={handleUpdate} />
        <button
          onClick={returnToInventory}
          className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Return to Inventory
        </button>
      </div>
    </Layout>
  );
}
