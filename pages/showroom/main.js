import React from 'react';
import Header from '@/components/users/Header';
import HeroSection from '@/components/users/HeroSection';
import AboutUs from '@/components/users/AboutUs';
import Contact from '@/components/users/Contact';
import Footer from '@/components/users/Footer';

const Main = () => {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <AboutUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Main;