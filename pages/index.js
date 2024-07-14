import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import FavoritesCarousel from '@/components/FavoritesCarousel';
import { QuebecIcon, CanadaIcon } from '@/components/svgs';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Layout>
      <main className="min-h-screen bg-gray-900 text-gray-100">
        <section className="relative w-full h-[70vh]"> {/* Ajusta la altura aquí */}
          <video 
            autoPlay 
            loop 
            muted 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center top' }} // Ajusta la posición del video
          >
            <source src="/videos/couple.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#68CE8A]">Welcome to Latin Ride Montreal  </h1>
            <p className="text-lg mb-6 text-[#68CE8A]">Find the best cars at unbeatable prices and affordable monthly payments in the Greater Montreal Area.</p>
            <Link href="/showroom">
              <span className="bg-[#000] text-[#68CE8A] hover:bg-[#68CE8A] hover:text-[#000] px-6 py-3 rounded-full font-semibold cursor-pointer">
                View Inventory
              </span>
            </Link>
          </div>
        </section>
        <section>
          <FavoritesCarousel/>
        </section>
        <section className="py-20 bg-black text-[#68CE8A]">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-4">Quality Cars</h3>
              <p>We offer a wide selection of high-quality cars that have been thoroughly inspected and certified.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-4">Affordable Prices</h3>
              <p>Get the best deals on cars with our competitive pricing and financing options.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-4">Customer Support</h3>
              <p>Our dedicated support team is here to help you with any questions or concerns you may have.</p>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-[#68CE8A]">Affordable Monthly Payments</h2>
            <button 
              onClick={openModal}
              className="mt-4 bg-[#FDFDF2] text-[#68CE8A] py-2 px-4 rounded-lg hover:bg-[#68CE8A] hover:text-[#FDFDF2] transition duration-300"
            >
              View Credit Requirements
            </button>
          </div>
        </section>
        <footer className="bg-gray-800 py-6 w-full text-[#68CE8A] flex justify-between items-center">
          <div className="flex-shrink-0">
            <QuebecIcon className="h-6 w-6" />
          </div>
          <div className="text-center flex-grow">
            <p>&copy; 2024 Latin Ride. All rights reserved.</p>
          </div>
          <div className="flex-shrink-0">
            <CanadaIcon className="h-6 w-6" />
          </div>
        </footer>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg overflow-hidden w-3/4 md:w-1/2 lg:w-1/3">
              <video 
                autoPlay 
                loop 
                muted 
                className="absolute inset-0 w-full h-full object-cover opacity-25"
              >
                <source src="/videos/laidyNewCar.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="relative p-6 flex flex-col items-center z-10 text-[#299F60] text-xl">
                <h3 className="text-3xl font-semibold mb-4">Credit Requirements</h3>
                <div className="flex flex-col md:flex-row">
                  <ul className="list-disc list-inside text-left md:mr-4">
                    <li>Valid driver's license (national or international)</li>
                    <li>Bank check specimen</li>
                    <li>Employment authorization</li>
                    <li>30% down payment of the unit's value</li>
                    <li>Brown paper (Papel marrón)</li>
                    <li>Extra: Choose from 1 to 3 years of powertrain warranty (engine and transmission)</li>
                    <li>Get your car delivered the same day!</li>
                    <li>If you have a translated license, insurance costs can be lower!</li>
                  </ul>
                </div>
                <button 
                  onClick={closeModal}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
