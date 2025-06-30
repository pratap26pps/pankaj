'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbaar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [storesOpen, setStoresOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50  ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="EV Service Center"
            width={180}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 font-bold">

          <Link href="/" className="hover:text-green-700 transition">Home</Link>
          <Link href="/Contact " className="hover:text-green-700 transition">Abouts</Link>
          {/* Services Dropdown (Desktop Hover) */}
          <div className="relative group">
            <button className="hover:text-green-700 transition">Services</button>
            <div className="absolute top-full mt-2 left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-300 space-y-1 py-2 px-3">
              {[
                'EV Car Repair', 'Battery Replacement', 'Charging Station', 'Paint Job',
                'Tyre Service', 'Diagnostics', 'AC Repair', 'General Maintenance', 'Insurance Claim', 'Pick & Drop'
              ].map((item, index) => (
                <Link key={index} href={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`} className="block hover:bg-green-100 rounded px-2 py-1">{item}</Link>
              ))}
            </div>
          </div>

          {/* Stores Dropdown (Desktop Hover) */}
          <div className="relative group">
            <button className="hover:text-green-700 transition">Stores</button>
            <div className="absolute top-full mt-2 left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-300 space-y-1 py-2 px-3">
              {[
                'Delhi Store', 'Mumbai Store', 'Bangalore Store', 'Hyderabad Store', 'Pune Store',
                'Jaipur Store', 'Lucknow Store', 'Kolkata Store', 'Chennai Store', 'Ahmedabad Store'
              ].map((item, index) => (
                <Link key={index} href={`/stores/${item.toLowerCase().replace(/\s+/g, '-')}`} className="block hover:bg-green-100 rounded px-2 py-1">{item}</Link>
              ))}
            </div>
          </div>

          {/* Login Button */}
          <Link href="/login">
            <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition">
              Login / Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center space-x-3">
          <Link href="/login">
            <button className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-md text-sm transition">
              Login / Sign Up
            </button>
          </Link>
          <button onClick={toggleMenu} className="text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md text-black px-4 py-4 space-y-4 transition-all duration-300">

          <Link href="/" onClick={toggleMenu} className="block hover:text-green-700">Home</Link>

          {/* Services Dropdown (Click to Toggle in Mobile) */}
          <div>
            <button onClick={() => setServicesOpen(!servicesOpen)} className="w-full text-left hover:text-green-700">
              Services
            </button>
            {servicesOpen && (
              <div className="mt-2 pl-3 space-y-1">
                {[
                  'EV Car Repair', 'Battery Replacement', 'Charging Station', 'Paint Job',
                  'Tyre Service', 'Diagnostics', 'AC Repair', 'General Maintenance', 'Insurance Claim', 'Pick & Drop'
                ].map((item, index) => (
                  <Link key={index} href={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={toggleMenu} className="block hover:text-green-700">{item}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Stores Dropdown (Click to Toggle in Mobile) */}
          <div>
            <button onClick={() => setStoresOpen(!storesOpen)} className="w-full text-left hover:text-green-700">
              Stores
            </button>
            {storesOpen && (
              <div className="mt-2 pl-3 space-y-1">
                {[
                  'Delhi Store', 'Mumbai Store', 'Bangalore Store', 'Hyderabad Store', 'Pune Store',
                  'Jaipur Store', 'Lucknow Store', 'Kolkata Store', 'Chennai Store', 'Ahmedabad Store'
                ].map((item, index) => (
                  <Link key={index} href={`/stores/${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={toggleMenu} className="block hover:text-green-700">{item}</Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbaar;
