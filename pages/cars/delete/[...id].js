import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import Loader from '@/components/Loader';

export default function ConfirmDelete() {
  const router = useRouter();
  const [carInfo, setCarInfo] = useState(null);
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get('/api/cars?id=' + id).then(response => {
      setCarInfo(response.data);
    }).catch(error => {
      console.error('Error fetching car:', error);
    });
  }, [id]);

  function goBack() {
    router.push('/cars');
  }

  async function deleteCar() {
    await axios.delete('/api/cars?id=' + id);
    goBack();
  }

  if (!carInfo) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <Loader/>;
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <h1 className="text-2xl font-bold mb-6 text-white">
          Do you really want to delete car "{carInfo.brand} {carInfo.model}"?
        </h1>
        <div className="flex justify-center space-x-4">
          <button
            onClick={deleteCar}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Yes
          </button>
          <button
            onClick={goBack}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            No
          </button>
        </div>
      </div>
    </Layout>
  );
}
