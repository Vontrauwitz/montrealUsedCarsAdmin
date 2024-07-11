import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Showroom = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars');
        setCars(response.data);
        setFilteredCars(response.data);

        const brands = [...new Set(response.data.map(car => car.brand))];
        setBrands(brands);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let filtered = cars;

    if (selectedBrand) {
      filtered = filtered.filter(car => car.brand === selectedBrand);
      const models = [...new Set(filtered.map(car => car.model))];
      setModels(models);
    }

    if (selectedModel) {
      filtered = filtered.filter(car => car.model === selectedModel);
    }

    if (selectedYear) {
      filtered = filtered.filter(car => car.year === parseInt(selectedYear));
    }

    if (minPrice) {
      filtered = filtered.filter(car => car.price >= parseInt(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(car => car.price <= parseInt(maxPrice));
    }

    setFilteredCars(filtered);
  }, [selectedBrand, selectedModel, selectedYear, minPrice, maxPrice, cars]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center p-6">
          <div className="text-2xl font-bold text-blue-900">Auto Latino Showroom</div>
          <nav className="space-x-4">
            <button
              onClick={handleSignOut}
              className="cursor-pointer text-gray-700 hover:text-blue-500"
            >
              Home
            </button>
          </nav>
        </div>
      </header>
      <section className="container mx-auto pt-20 pb-8">
        <h1 className="text-4xl font-bold text-center mb-10">Explore Our Cars</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <select
              className="p-2 rounded-lg bg-white shadow-md"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <select
              className="p-2 rounded-lg bg-white shadow-md"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedBrand}
            >
              <option value="">Select Model</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4">
            <select
              className="p-2 rounded-lg bg-white shadow-md"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {Array.from(new Set(cars.map(car => car.year))).sort().map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <input
              className="p-2 rounded-lg bg-white shadow-md"
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              className="p-2 rounded-lg bg-white shadow-md"
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
            >
              <img
                src={car.photos[0] || '/default-car.png'}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{car.brand} {car.model}</h2>
                <p className="text-gray-700 mb-2">{car.year} - {car.version}</p>
                <p className="text-gray-700 mb-2">Odometer: {car.odometer} km</p>
                <p className="text-gray-900 mb-4 font-bold">Price: ${car.price}</p>
                <Link href={`/cars/${car._id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Auto Latino. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Showroom;
