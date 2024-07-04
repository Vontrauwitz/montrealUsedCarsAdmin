import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url(/images/hero.jpg)' }}>
      <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to Auto Latino</h1>
        <p className="text-xl mb-8">Connecting the Latino Community in Montreal with High-Quality Pre-Owned Vehicles</p>
        <button className="btn-glitch">Get Started</button>
      </div>
    </section>
  );
};

export default HeroSection;
