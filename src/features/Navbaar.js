'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import about from '@/pages/about';
const Navbaar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // toggle for auth

  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === '/';
  const linkClass = isHomePage
    ? 'text-white hover:text-emerald-200 transition-colors duration-300 font-medium'
    : 'text-gray-800 hover:text-emerald-600 transition-colors duration-300 font-medium';

  const handleLogin = () => router.push('/user/Login');
  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push('/');
  };
  const handleDashboard = () => router.push('/user/dashboard');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-gradient-to-r from-emerald-900/95 via-teal-800/95 to-emerald-900/95 border-b border-emerald-300/20 shadow-2xl">
      <div className="w-full px-6 flex items-center justify-between h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo (3).png"
            alt="EV Repair"
            width={90}
            height={36}
            className="object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 font-medium text-lg">
          <Link href="/" className={linkClass}>Home</Link>
          <Link href="/about" className={linkClass}>About</Link>
          <Link href="/Servicepage" className={linkClass}>Services</Link>
          <Link href="/stores" className={linkClass}>Stores</Link>

          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-2.5 rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={handleDashboard}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-2.5 rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="ml-3 text-red-300 hover:text-red-100 transition-colors duration-300 font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl text-white hover:text-emerald-300 transition-colors duration-300">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-emerald-900/98 to-teal-800/98 backdrop-blur-xl px-6 py-5 space-y-4 font-medium text-white text-lg border-t border-emerald-300/20">
          <Link href="/" onClick={toggleMenu} className="block hover:text-emerald-300 transition-colors duration-300">Home</Link>
          <Link href="/about" onClick={toggleMenu} className="block hover:text-emerald-300 transition-colors duration-300">About</Link>
          <Link href="/services" onClick={toggleMenu} className="block hover:text-emerald-300 transition-colors duration-300">Services</Link>
          <Link href="/stores" onClick={toggleMenu} className="block hover:text-emerald-300 transition-colors duration-300">Stores</Link>

          {!isLoggedIn ? (
            <button
              onClick={() => {
                handleLogin();
                toggleMenu();
              }}
              className="block w-full text-left bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-3 rounded-lg mt-4 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-semibold"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  handleDashboard();
                  toggleMenu();
                }}
                className="block w-full text-left bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-semibold"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block w-full text-left text-red-300 mt-3 hover:text-red-100 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbaar;
