import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const FavoritesCarousel = () => {
  const [favoriteCars, setFavoriteCars] = useState([]);

  useEffect(() => {
    const fetchFavoriteCars = async () => {
      try {
        const response = await axios.get('/api/cars');
        const favorites = response.data.filter(car => car.favorite);
        setFavoriteCars(favorites);
      } catch (error) {
        console.error('Error fetching favorite cars:', error);
      }
    };

    fetchFavoriteCars();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300, // velocidad más rápida
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // movimiento automático
    autoplaySpeed: 2000, // intervalo de 2 segundos
  };

  if (favoriteCars.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-10 bg-black">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-green-500">Our Favorite Picks for You</h2>
        <div className="max-w-screen-lg mx-auto">
          <Slider {...settings}>
            {favoriteCars.map(car => (
              <div key={car._id} className="p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src={car.photos[0]} alt={`${car.brand} ${car.model}`} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h3 className="text-2xl font-bold text-black">{car.brand} {car.model}</h3>
                    <p className="text-lg text-black">{car.year}</p>
                    <p className="text-lg text-black">${car.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FavoritesCarousel;
