// pages/branches/autolambert/quotation.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';

const QuotationPage = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    selectedCar: '',
    clientName: '',
    clientPhone: ''
  });
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);

  useEffect(() => {
    axios.get('/api/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'selectedCar') {
      const selectedCar = cars.find(car => car._id === value);
      setSelectedCarDetails(selectedCar || null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario
    console.log('Form submitted:', formData);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Quotation of Car (Auto Lambert)</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="selectedCar" className="block text-sm font-medium text-gray-700">
                  Vehicle:
                </label>
                <select
                  id="selectedCar"
                  name="selectedCar"
                  value={formData.selectedCar}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a vehicle</option>
                  {cars.map(car => (
                    <option key={car._id} value={car._id}>
                      {car.brand} {car.model} - ${car.price} - VIN: {car.vinNumber}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
                  Client:
                </label>
                <input
                  id="clientName"
                  name="clientName"
                  type="text"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">
                  Telephone:
                </label>
                <input
                  id="clientPhone"
                  name="clientPhone"
                  type="tel"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              {selectedCarDetails && (
                <div className="flex items-center justify-center h-full">
                  <img
                    src={selectedCarDetails.photos[0]}
                    alt="Selected Car"
                    className="max-w-full h-48 object-contain rounded-lg shadow-md mt-2"
                  />
                </div>
              )}
            </div>
            {selectedCarDetails && (
              <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Brand:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.brand}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Model:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.model}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Version:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.version}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Odometer:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.odometer} km</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Year:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.year}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">VIN Number:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.vinNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Price:</p>
                  <p className="text-sm text-gray-900">${selectedCarDetails.price}</p>
                </div>
              </div>
            )}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Quotation
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default QuotationPage;

