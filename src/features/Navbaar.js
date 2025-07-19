'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const Navbaar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('user');
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Define pages with white backgrounds
  const whiteBackgroundPages = ['/About', '/Blog', '/Login', '/Signup', '/Servicepage', '/ServiceForm', '/verify-otp'];
  const isWhiteBackgroundPage = whiteBackgroundPages.includes(pathname) || pathname.includes('/user/') || pathname.includes('/admin/') || pathname.includes('/partner/');

  const isHomePage = pathname === '/';
  const isPartnerDashboard = pathname.includes('/partner/Dashboard');
  const isAdminDashboard = pathname.includes('/admin/dashboard');

  useEffect(() => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const type = localStorage.getItem('userType') || 'user';
    setIsLoggedIn(!!token);
    setUserType(type);
    if (isHomePage) {
      const handleScroll = () => {
        setScrolled(window.scrollY > 40);
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setScrolled(false);
    }
  }, [pathname]);

  const linkClass = 'text-black hover:text-emerald-600 transition-colors duration-300 font-semibold font-sans';

  const dynamicNavClass = isHomePage
    ? scrolled
      ? 'bg-white/95 backdrop-blur-xl text-black shadow-lg'
      : 'bg-white/90 backdrop-blur-md text-black shadow-sm'
    : 'bg-white/95 backdrop-blur-xl text-black shadow-lg';

  const handleLogin = () => {
    router.push('/Login');
    setMenuOpen(false);
  };

  const handleSignup = () => {
    router.push('/authpage');
    setMenuOpen(false);
  };

  const handleDashboard = () => {
    if (userType === 'partner') router.push('/partner/Dashboard');
    else if (userType === 'admin') router.push('/admin/dashboard');
    else router.push('/user/Dashboard');
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserType('user');
    setMenuOpen(false);
    router.push('/');
  };

  const handleDemoLogin = (type = 'user') => {
    localStorage.setItem('authToken', 'demo-token-' + Date.now());
    localStorage.setItem('userType', type);
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        id: 1,
        name: type === 'partner' ? 'Demo Partner' : 'Demo User',
        email: 'demo@example.com',
        type: type,
      })
    );
    setIsLoggedIn(true);
    setUserType(type);
    setMenuOpen(false);
    handleDashboard();
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Partner Dashboard Navbar
  if (isPartnerDashboard) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/95 shadow-lg border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 mx-auto flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo (3).png" alt="EV Repair" width={90} height={52} className="object-contain mt-1.5" />
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => router.push('/')} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors">Home</button>
            <div className="relative group">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Account</button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <button onClick={() => router.push('/')} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Back to Home</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Logout</button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => { localStorage.setItem('partnerDashboardMobileMenu', 'open'); setMenuOpen(false); }} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200">Menu</button>
          </div>
        </div>
      </nav>
    );
  }

  // Admin Dashboard Navbar
  if (isAdminDashboard) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl  bg-white/95 shadow-lg border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 mx-auto flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo (3).png" alt="EV Repair" width={90} height={52} className="object-contain mt-1.5" />
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => router.push('/')} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors">Home</button>
            <div className="relative group">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Account</button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <button onClick={() => router.push('/')} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Back to Home</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Logout</button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => { localStorage.setItem('adminDashboardMobileMenu', 'open'); setMenuOpen(true); }} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200">Menu</button>
          </div>
        </div>
      </nav>
    );
  }

  // General Navbar
  return (
    <nav className={`fixed top-0 left-0 w-full py-2 z-50 backdrop-blur-lg transition-all duration-300 ${dynamicNavClass}`}>
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 mx-auto flex items-center justify-between h-20">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo (3).png" alt="EV Repair" width={190} height={90} className="object-contain" />
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => router.push('/')} className="text-black hover:text-emerald-600 transition-colors duration-300 font-bold text-lg tracking-wide font-sans">Home</button>
          <Link href="/About" className="text-black hover:text-emerald-600 transition-colors duration-300 font-bold text-lg tracking-wide font-sans">About</Link>
          <button onClick={() => router.push('/Servicepage')} className="text-black hover:text-emerald-600 transition-colors duration-300 font-bold text-lg tracking-wide font-sans">Services</button>
          <Link href="/Blog" className="text-black hover:text-emerald-600 transition-colors duration-300 font-bold text-lg tracking-wide font-sans">Blog</Link>
          <Link href="/enquiry" className="text-black hover:text-emerald-600 transition-colors duration-300 font-bold text-lg tracking-wide font-sans">Enquiry</Link>
          {!isLoggedIn ? (
            <div className="relative group">
              <button onClick={handleSignup} className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 font-bold text-lg tracking-wide font-sans">
                Login / Signup
              </button>
              
            </div>
          ) : (
            <div className="relative group">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 font-bold text-lg tracking-wide font-sans">
                Account
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b font-bold tracking-wide font-sans">{userType === 'partner' ? 'Partner Account' : userType === 'admin' ? 'Admin Account' : 'My Account'}</div>
                  <button onClick={handleDashboard} className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-bold tracking-wide font-sans">Dashboard</button>
                  {userType === 'admin' && (
                    <button onClick={() => router.push('/admin/dashboard')} className="w-full text-left px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 font-bold tracking-wide font-sans">Admin Dashboard</button>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-bold tracking-wide font-sans">Logout</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl transition-colors duration-300 p-2 rounded-lg text-black hover:text-emerald-600 hover:bg-gray-100">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl px-6 py-5 space-y-4 font-semibold text-black text-lg border-t border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-wide font-sans">Menu</h2>
            <button onClick={toggleMenu} className="p-1 rounded hover:bg-gray-100 text-black">✕</button>
          </div>
          <button onClick={() => { router.push('/'); toggleMenu(); }} className="w-full text-left hover:text-emerald-600 py-3 font-bold text-lg tracking-wide font-sans">Home</button>
          <Link href="/About" className="w-full text-left hover:text-emerald-600 py-3 font-bold text-lg tracking-wide font-sans" onClick={toggleMenu}>About</Link>
          <button onClick={() => { router.push('/Servicepage'); toggleMenu(); }} className="w-full text-left hover:text-emerald-600 py-3 font-bold text-lg tracking-wide font-sans">Services</button>
          <Link href="/Blog" className="w-full text-left hover:text-emerald-600 py-3 font-bold text-lg tracking-wide font-sans" onClick={toggleMenu}>Blog</Link>

          {!isLoggedIn ? (
            <div className="space-y-2 mt-4">
              <button onClick={handleSignup} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-lg transition-all duration-300 font-bold text-lg tracking-wide font-sans">Signup</button>
            </div>
          ) : (
            <>
              <button onClick={handleDashboard} className="w-full text-left text-blue-600 hover:text-blue-700 py-3 font-bold text-lg tracking-wide font-sans">Dashboard</button>
              {userType === 'admin' && (
                <button onClick={() => { router.push('/admin/dashboard'); toggleMenu(); }} className="w-full text-left text-emerald-600 hover:text-emerald-700 py-3 font-bold text-lg tracking-wide font-sans">Admin Dashboard</button>
              )}
              <button onClick={handleLogout} className="w-full text-left text-red-600 hover:text-red-700 py-3 font-bold text-lg tracking-wide font-sans">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbaar;
