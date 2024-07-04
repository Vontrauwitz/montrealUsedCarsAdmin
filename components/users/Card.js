// components/Card.js
import React from 'react';

const Card = ({ jobTitle, description, location }) => {
  return (
    <div className="relative w-80 h-80 bg-white bg-opacity-80 border border-gray-200 shadow-xl backdrop-blur-lg rounded-lg text-center cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-105 active:scale-95 p-4 m-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 hover:opacity-100 transition-opacity duration-500 z-0"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h3 className="text-2xl font-extrabold mb-2 text-gray-900">{jobTitle}</h3>
        <p className="text-md mb-4 text-gray-700">{description}</p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
      <div className="absolute inset-0 w-full h-full bg-white opacity-0 hover:opacity-10 transition-opacity duration-500 z-20"></div>
    </div>
  );
};

export default Card;
