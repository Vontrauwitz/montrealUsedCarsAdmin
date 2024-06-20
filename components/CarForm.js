import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CarForm({ initialData, onSubmit }) {
  const [brand, setBrand] = useState(initialData?.brand || '');
  const [model, setModel] = useState(initialData?.model || '');
  const [version, setVersion] = useState(initialData?.version || '');
  const [odometer, setOdometer] = useState(initialData?.odometer || '');
  const [year, setYear] = useState(initialData?.year || '');
  const [vinNumber, setVinNumber] = useState(initialData?.vinNumber || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [photos, setPhotos] = useState(initialData?.photos.join('\n') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const carData = { 
      brand, 
      model, 
      version, 
      odometer, 
      year, 
      vinNumber, 
      price,
      photos: photos.split('\n').map(photo => photo.trim()) // Convertir las líneas en un array de URLs
    };
    onSubmit(carData);
  };

  return (
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
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="photos">Photos</label>
        <textarea
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          id="photos"
          name="photos"
          rows="5"
          value={photos}
          onChange={(e) => setPhotos(e.target.value)}
          placeholder="Enter each photo URL on a new line"
        ></textarea>
      </div>
      <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700" type="submit">
        {initialData ? 'Update Car' : 'Add Car'}
      </button>
    </form>
  );
}

export default CarForm;
