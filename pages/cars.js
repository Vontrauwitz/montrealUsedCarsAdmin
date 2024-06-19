import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import axios from 'axios';

export default function Cars() {
  const { data: session, status } = useSession();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (status === 'authenticated') {
      axios.get('/api/cars')
        .then(response => {
          // console.log("Received cars data:", response.data);  // Aquí puedes ver los datos recibidos
          setCars(response.data);
        })
        .catch(error => {
          console.error('Error fetching cars:', error);
        });
    }
  }, [status]);

  return (
    <Layout session={session}>
      <div className='text-black p-5'>
        <Link href='/cars/new' className='inline-block bg-gray-300 rounded-md text-black py-1 px-2 mb-4'>Add New Cars</Link>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {cars.map(car => (
            <div key={car._id} className='card bg-white rounded-lg shadow-lg p-5 hover:scale-105 transform transition-transform duration-500'>
              <h3 className='text-lg font-bold'>{car.brand} {car.model}</h3>
              <p className='text-sm'>{car.version}</p>
              <p className='text-sm'>Year: {car.year}</p>
              <p className='text-sm'>Odometer: {car.odometer} km</p>
              <p className='text-sm'>VIN: {car.vinNumber}</p>
              <p className='text-sm'>Price: ${car.price}</p>
              <div className='flex space-x-2'>
                <Link href={'/cars/edit/' + car._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487L18.549 2.8a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zM19.5 7.125l-2.637 2.637"/>
                  </svg>
                </Link>
                <Link href={'/cars/delete/' + car._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9L14.394 18m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>

  
  );
}



