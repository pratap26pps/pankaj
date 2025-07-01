'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';

const Navbaar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [storesOpen, setStoresOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);  // 🟢 False initially (user not logged in)

  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleAccountDropdown = () => setAccountDropdownOpen(!accountDropdownOpen);

  // 🟢 When user clicks Login button, go to login page
  const handleLogin = () => {
    router.push('/user/Login');
  };

  // 🟢 After successful login, you will manually set this state true (Maybe from useEffect or props later)
  const markUserLoggedIn = () => {
    setIsLoggedIn(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccountDropdownOpen(false);
    router.push('/');  // After logout, back to home
  };

  const navigateDashboard = () => {
    setAccountDropdownOpen(false);
    router.push('/user/Dashboard');
  };

  const desktopLinkClass = `text-black hover:text-green-600 transition`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent font-extrabold text-xl">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-2">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo (3).png"
            alt="EV Service Center"
            width={150}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className={desktopLinkClass}>Home</Link>
          <Link href="/Aboutpage" className={desktopLinkClass}>About</Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button className={`${desktopLinkClass}`}>Services</button>
            <div className="absolute top-full mt-2 left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-300 space-y-1 py-2 px-3 text-black font-semibold">
              {['EV Car Repair', 'Battery Replacement', 'Charging Station', 'Paint Job', 'Tyre Service', 'Diagnostics', 'AC Repair', 'General Maintenance', 'Insurance Claim', 'Pick & Drop'].map((item, index) => (
                <Link key={index} href={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`} className="block hover:bg-green-100 rounded px-2 py-1">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Stores Dropdown */}
          <div className="relative group">
            <button className={`${desktopLinkClass}`}>Stores</button>
            <div className="absolute top-full mt-2 left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-300 space-y-1 py-2 px-3 text-black font-semibold">
              {['Delhi Store', 'Mumbai Store', 'Bangalore Store', 'Hyderabad Store', 'Pune Store', 'Jaipur Store', 'Lucknow Store', 'Kolkata Store', 'Chennai Store', 'Ahmedabad Store'].map((item, index) => (
                <Link key={index} href={`/stores/${item.toLowerCase().replace(/\s+/g, '-')}`} className="block hover:bg-green-100 rounded px-2 py-1">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Auth Buttons */}
          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition"
            >
              Login / Sign Up
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={toggleAccountDropdown}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition"
              >
                Account ▼
              </button>
              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md py-2 text-sm font-semibold">
                  <button
                    onClick={navigateDashboard}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center space-x-3">
          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-md text-sm transition"
            >
              Login / Sign Up
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={toggleAccountDropdown}
                className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-md text-sm transition"
              >
                Account ▼
              </button>
              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md py-2 text-sm font-semibold">
                  <button
                    onClick={navigateDashboard}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button onClick={toggleMenu} className="text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Full Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md text-black px-4 py-4 space-y-4 transition-all duration-300">
          <Link href="/" onClick={toggleMenu} className="block hover:text-green-700">Home</Link>

          {/* Mobile Services */}
          <div>
            <button onClick={() => setServicesOpen(!servicesOpen)} className="w-full text-left hover:text-green-700">Services</button>
            {servicesOpen && (
              <div className="mt-2 pl-3 space-y-1">
                {['EV Car Repair', 'Battery Replacement', 'Charging Station', 'Paint Job', 'Tyre Service', 'Diagnostics', 'AC Repair', 'General Maintenance', 'Insurance Claim', 'Pick & Drop'].map((item, index) => (
                  <Link key={index} href={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={toggleMenu} className="block hover:text-green-700">
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Stores */}
          <div>
            <button onClick={() => setStoresOpen(!storesOpen)} className="w-full text-left hover:text-green-700">Stores</button>
            {storesOpen && (
              <div className="mt-2 pl-3 space-y-1">
                {['Delhi Store', 'Mumbai Store', 'Bangalore Store', 'Hyderabad Store', 'Pune Store', 'Jaipur Store', 'Lucknow Store', 'Kolkata Store', 'Chennai Store', 'Ahmedabad Store'].map((item, index) => (
                  <Link key={index} href={`/stores/${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={toggleMenu} className="block hover:text-green-700">
                    {item}
                  </Link>
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
