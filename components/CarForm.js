import React, { useState } from 'react';
import axios from 'axios';

function CarForm({ setMessage }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [odometer, setOdometer] = useState('');
  const [year, setYear] = useState('');
  const [vinNumber, setVinNumber] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = { brand, model, version, odometer, year, vinNumber, price };
    try {
      const response = await axios.post('/api/cars', carData);
      console.log('Car created:', response.data);
      setMessage('Coche cargado correctamente'); // Actualiza el estado en el componente padre
      setBrand('');
      setModel('');
      setVersion('');
      setOdometer('');
      setYear('');
      setVinNumber('');
      setPrice('');
    } catch (error) {
      console.error('Error creating car:', error);
      setMessage('Error al cargar el coche'); // Actualiza el estado en el componente padre
    }
  };
  return (

    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Add a New Car</h1>
      <form className="bg-gray-800 p-6 rounded-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="brand">Brand</label>
          <input
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            type="text"
            id="brand"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="model">Model</label>
          <input
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            type="text"
            id="model"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="version">Version</label>
          <input
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            type="text"
            id="version"
            name="version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="odometer">Odometer</label>
          <input
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            type="number"
            id="odometer"
            name="odometer"
            value={odometer}
            onChange={(e) => setOdometer(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="year">Year</label>
          <input
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            type="number"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="vinNumber">VIN Number</label>
          <input
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            type="text"
            id="vinNumber"
            name="vinNumber"
            value={vinNumber}
            onChange={(e) => setVinNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="price">Price</label>
          <input
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700" type="submit">
          Add Car
        </button>
      </form>
    </div>
  );
}

export default CarForm;