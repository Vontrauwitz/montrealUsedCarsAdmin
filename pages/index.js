import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md w-full">
        <div className="w-full flex justify-between items-center p-6">
          <div className="text-2xl font-bold text-blue-900">Auto Latino</div>
          <nav className="space-x-4">
            <Link href="/showroom">
              <span className="cursor-pointer text-gray-700 hover:text-blue-500">Showroom</span>
            </Link>
          </nav>
        </div>
      </header>
      <section className="bg-blue-500 text-white py-20 w-full">
        <div className="w-full text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Auto Latino</h1>
          <p className="text-lg mb-6">Find the best cars at unbeatable prices.</p>
          <Link href="/showroom">
            <span className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 cursor-pointer">
              View Inventory
            </span>
          </Link>
        </div>
      </section>
      <section className="w-full py-20">
        <h2 className="text-4xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">Quality Cars</h3>
            <p>We offer a wide selection of high-quality cars that have been thoroughly inspected and certified.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">Affordable Prices</h3>
            <p>Get the best deals on cars with our competitive pricing and financing options.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">Customer Support</h3>
            <p>Our dedicated support team is here to help you with any questions or concerns you may have.</p>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-6 w-full">
        <div className="text-center">
          <p>&copy; 2024 Auto Latino. All rights reserved.</p>
        </div>
      </footer>
    </main>
    </Layout>
  );
}





