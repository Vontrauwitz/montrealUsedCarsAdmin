// components/BranchDropdown.js

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const BranchDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="mb-4 flex items-center cursor-pointer text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v5.25h5.25M3.75 3L12 11.25M3.75 3h16.5M20.25 21v-5.25h-5.25M20.25 21L12 12.75M20.25 21h-16.5" />
        </svg>
        <span>Branches</span>
      </div>
      {isOpen && (
        <div className="absolute left-12 top-0 mt-1 w-48 bg-blue-900 text-white shadow-md rounded-lg z-50">
          <ul>
            <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer">
              <Link href="/branches/autolambert/quotation">
                Auto Lambert
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer">Branch 2</li>
            <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer">Branch 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BranchDropdown;
