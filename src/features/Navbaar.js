'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const Navbaar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('user');

  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === '/';
  const isPartnerDashboard = pathname.includes('/partner/Dashboard');
  const isAdminDashboard = pathname.includes('/admin/dashboard');

  useEffect(() => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const type = localStorage.getItem('userType') || 'user';
    setIsLoggedIn(!!token);
    setUserType(type);
  }, [pathname]);

  const linkClass = isHomePage
    ? 'text-white hover:text-emerald-200 transition-colors duration-300 font-medium'
    : 'text-gray-800 hover:text-emerald-600 transition-colors duration-300 font-medium';

  const handleLogin = () => {
    router.push('/user/Login');
    setMenuOpen(false);
  };

  const handleSignup = () => {
    router.push('/user/Signup');
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
            <button onClick={() => { localStorage.setItem('adminDashboardMobileMenu', 'open'); setMenuOpen(true); }} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200">Menu</button>
          </div>
        </div>
      </nav>
    );
  }

  // General Navbar
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#4c3c3c] shadow-2xl">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 mx-auto flex items-center justify-between h-20">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo (3).png" alt="EV Repair" width={90} height={36} className="object-contain" />
        </Link>
        <div className="hidden md:flex items-center space-x-10 font-medium text-lg">
          <button onClick={() => router.push('/')} className={linkClass}>Home</button>
          <button onClick={()=>router.push("/Aboutpage")} className={linkClass}>About</button>
          <button onClick={() => router.push('/Servicepage')} className={linkClass}>Services</button>
          {!isLoggedIn ? (
            <div className="relative group">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-full shadow-md hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-semibold">
                Login / Signup
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">Account Options</div>
                  <button onClick={handleLogin} className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50">Login</button>
                  <button onClick={handleSignup} className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50">Signup</button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <div className="px-4 py-1 text-xs text-gray-500">Demo Login</div>
                  <button onClick={() => handleDemoLogin('user')} className="w-full text-left px-4 py-2 text-sm text-purple-600 hover:bg-purple-50">Demo User</button>
                  <button onClick={() => handleDemoLogin('partner')} className="w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-orange-50">Demo Partner</button>
                  <button onClick={() => router.push('/admin/dashboard')} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Demo Admin</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2.5 rounded-full shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-semibold">
                Account
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">{userType === 'partner' ? 'Partner Account' : 'My Account'}</div>
                  <button onClick={handleDashboard} className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50">Dashboard</button>
                  <button onClick={() => router.push('/admin/dashboard')} className="w-full text-left px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50">Admin Dashboard</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Logout</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl text-white hover:text-emerald-300 transition-colors duration-300 p-2 rounded-lg hover:bg-white/10">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-emerald-900/98 to-teal-800/98 backdrop-blur-xl px-6 py-5 space-y-4 font-medium text-white text-lg border-t border-emerald-300/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button onClick={toggleMenu} className="p-1 rounded hover:bg-white/10">✕</button>
          </div>
          <button onClick={() => { router.push('/'); toggleMenu(); }} className="w-full text-left hover:text-emerald-300 py-2">Home</button>
          <Link href="/about" className="w-full text-left hover:text-emerald-300 py-2" onClick={toggleMenu}>About</Link>
          <button onClick={() => { router.push('/Servicepage'); toggleMenu(); }} className="w-full text-left hover:text-emerald-300 py-2">Services</button>

          {!isLoggedIn ? (
            <div className="space-y-2 mt-4">
              <button onClick={handleLogin} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300">Login</button>
              <button onClick={handleSignup} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300">Signup</button>
              <div className="border-t border-white/20 pt-2 mt-4">
                <p className="text-xs text-white/70 mb-2">Demo Login:</p>
                <button onClick={() => handleDemoLogin('user')} className="w-full bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 text-sm">Demo User</button>
                <button onClick={() => handleDemoLogin('partner')} className="w-full bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 text-sm mt-2">Demo Partner</button>
                <button onClick={() => { router.push('/admin/login'); toggleMenu(); }} className="w-full bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 text-sm mt-2">Admin Login</button>
              </div>
            </div>
          ) : (
            <>
              <button onClick={handleDashboard} className="w-full text-left text-blue-300 hover:text-blue-100 py-2">Dashboard</button>
              <button onClick={() => { router.push('/admin/dashboard'); toggleMenu(); }} className="w-full text-left text-emerald-300 hover:text-emerald-100 py-2">Admin Dashboard</button>
              <button onClick={handleLogout} className="w-full text-left text-red-300 hover:text-red-100 py-2">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbaar;
