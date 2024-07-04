import React from 'react';
import Link from 'next/link';
import { FacebookIcon, WhatsappIcon, HomeIcon } from '../../components/svgs';


const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
      <div className="flex items-center space-x-4">
        <img src="/images/globallogo.jpg" alt="Company Logo" className="w-32 h-auto" />
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/">
          <HomeIcon className="w-8 h-8 text-white" />
        </Link>
        <Link href="https://www.facebook.com">
          <FacebookIcon className="w-8 h-8 text-white" />
        </Link>
        <Link href="https://wa.me/yourwhatsappnumber">
          <WhatsappIcon className="w-8 h-8 text-white" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
