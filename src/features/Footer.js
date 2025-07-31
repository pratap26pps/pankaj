'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
    'Indore', 'Thane', ' Bhopal', 'Visakhapatnam', 'Pimpri', 'Patna',
  ];

  return (
    <footer className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50  -z-0 playfair-style1" >
        {/* Decorative Wave Pattern */}
        <div className="absolute top-0 left-0 w-full h-20 " />

        <div className="relative z-10 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header Section with App Download */}
           <motion.div
  initial={{ y: 50, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="text-center mb-16 px-4 sm:px-6 lg:px-8"
   style={{ fontFamily: 'poppins, serif', letterSpacing: '0.02em' }}
>
  <h1
    className="text-3xl sm:text-5xl lg:text-6xl  font-semibold text-emerald-700 mb-4 sm:mb-6 font-poppins"
   
  >
    GridaNeo Bharat
  </h1>

  <div className="w-24 sm:w-32 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mx-auto mb-6 sm:mb-8" />

  <p className="text-base sm:text-xl text-gray-700 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-poppins ">
    Leading the future of electric vehicle services with innovative solutions and exceptional customer care.
  </p>

  {/* App Download & Social Section */}
  <div className="bg-white/80  max-w-12xl backdrop-blur-lg rounded-3xl shadow-2xl border border-emerald-100 p-2 sm:p-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-center text-center">
      
      {/* Logo */}
      <div className="flex justify-center">
        <img
          src="/images/logo (3).png"
          alt="Company Logo"
          className="w-48 sm:w-60 h-auto"
        />
      </div>

      {/* App Download */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-emerald-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Download Our App
        </h3>
        <p className="text-gray-600 text-sm sm:text-base mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Experience seamless EV service booking
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-400 rounded-xl px-4 py-2 flex items-center gap-2 hover:shadow-md transition"
          >
            <img src="/icons/playstore.png" alt="Google Play" className="h-10 w-auto" />
            <span className="text-black font-semibold text-sm sm:text-base font-poppins" style={{ fontFamily: 'Poppins, sans-serif' }}  >Google Play</span>
          </a>
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-400 rounded-xl px-4 py-2 flex items-center gap-2 hover:shadow-md transition"
          >
            <img src="/icons/apple.png" alt="App Store" className="h-10 w-auto" />
            <span className="text-black font-semibold text-sm sm:text-base" style={{ fontFamily: 'Poppins, sans-serif' }} >App Store</span>
          </a>
        </div>
      </div>

      {/* Social Links */}
      <div className='fle flex-col items-center '>
        <h4 className="text-emerald-600 text-xl sm:text-2xl font-poppins font-bold mb-4">Follow Us</h4>
        <div className="flex gap-4 justify-center pb-10">
          {[
            { src: '/icons/facebook.png', alt: 'Facebook', link: 'https://www.facebook.com/profile.php?id=61578129260222' },
            { src: '/icons/instagram.png', alt: 'Instagram', link: 'https://www.instagram.com/gridaneo_bharat/' },
            { src: '/icons/twitter (1).png', alt: 'Twitter', link: 'https://x.com/GridaneoBharat?t=lDjIwaNZgqDD4tm3fnRPTg&s=09' },
            { src: '/icons/linkedin.png', alt: 'LinkedIn', link: 'https://www.linkedin.com/company/gridaneo-bharat/posts/?feedView=all' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={social.src} alt={social.alt} className="w-9 h-9 sm:w-10 sm:h-10" />
            </motion.a>
          ))}
        </div>
      </div>

    </div>
  </div>
</motion.div>


            {/* Main Footer Content - Single Unified Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-lg rounded-3xl py-10 px-10 shadow-2xl border border-emerald-100"
            style={{ fontFamily: 'Poppins, sans-serif' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 ">
                {/* Company Info */}
                <div className="text-center lg:text-left">
                  <h3
                    className="text-2xl font-bold text-emerald-700 mb-4 flex items-center justify-center lg:justify-start gap-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="text-3xl text-emerald-500">{/* User/Company SVG */}<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#34d399"/><rect x="4" y="16" width="16" height="6" rx="3" fill="#10b981"/></svg></span>
                    Company
                  </h3>
                  <div className="space-y-4 ml-10">
                    {[
                      { label: 'About Us', href: '/About' },
                      { label: 'Our Services', href: '/Servicepage' },
                      { label: 'Blog', href: '/Blog' },
                    ].map((link, index) => (
                      <Link key={index} href={link.href}>
                        <motion.div
                          whileHover={{ x: 5, color: '#059669' }}
                          className="text-gray-700 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-medium text-lg "
                       style={{ fontFamily: 'Poppins, sans-serif' }} >
                          {link.label}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="text-center lg:text-left">
                  <h3
                    className="text-2xl font-bold text-emerald-700 mb-4 flex items-center justify-center lg:justify-start gap-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="text-3xl text-emerald-500">{/* Bolt SVG */}<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="#facc15" stroke="#f59e42" strokeWidth="1.5"/></svg></span>
                    Services
                  </h3>
                  <div className="space-y-4 ml-10">
                    {[
                      { label: 'EV Service', href: '/Servicepage' },
                      { label: 'Battery Backup', href: '/Servicepage' },
                      { label: 'Charging Solutions', href: '/Servicepage' },
                      { label: 'Maintenance', href: '/Servicepage' },
                    ].map((link, index) => (
                      <Link key={index} href={link.href}>
                        <motion.div
                          whileHover={{ x: 5, color: '#059669' }}
                          className="text-gray-700 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-medium text-lg"
                       style={{ fontFamily: 'Poppins, sans-serif' }} >
                          {link.label}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Support */}
                <div className="text-center lg:text-left">
                  <h3
                    className="text-2xl font-bold text-emerald-700 mb-4 flex items-center justify-center lg:justify-start gap-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="text-3xl text-emerald-500">{/* Tools/Wrench SVG */}<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 19.5l-6.5-6.5M17 7a5 5 0 11-7.07 7.07A5 5 0 0117 7z" stroke="#10b981" strokeWidth="2" fill="#d1fae5"/></svg></span>
                    Support
                  </h3>
                  <div className="space-y-4 ml-10">
                    {[
                      { label: 'Help Center', href: '/' },
                      { label: 'Contact Support', href: '/' },
                      { label: 'Service Areas', href: '/' },
                      { label: 'FAQ', href: '/GeneralQuestions' },
                    ].map((link, index) => (
                      <Link key={index} href={link.href}>
                        <motion.div
                          whileHover={{ x: 5, color: '#059669' }}
                          className="text-gray-700 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-medium text-lg"
                       style={{ fontFamily: 'Poppins, sans-serif' }} >
                          {link.label}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-center  lg:text-left">
                  <h3
                    className="text-2xl font-bold text-emerald-700 mb-4 flex items-center justify-center lg:justify-start gap-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="text-3xl text-emerald-500">{/* Phone SVG */}<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.54.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.54 1 1 0 01-.21 1.11l-2.2 2.2z" fill="#10b981"/></svg></span>
                    Contact
                  </h3>
                  <div className="space-y-4" >
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <span className="text-emerald-500">{/* Phone SVG */}<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.54.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.54 1 1 0 01-.21 1.11l-2.2 2.2z" fill="#10b981"/></svg></span>
                      <span className="text-gray-700"style={{ fontFamily: 'Poppins, sans-serif' }}>+91 7982737801</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <span className="text-emerald-500">{/* Mail SVG */}<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/><path d="M3 7l9 6 9-6" stroke="#10b981" strokeWidth="1.5"/></svg></span>
                      <span className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>info@gridaneobharat.com</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <span className="text-emerald-500">{/* Location SVG */}<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="10" rx="7" ry="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/><circle cx="12" cy="10" r="3" fill="#34d399"/></svg></span>
                      <span className="text-gray-700"style={{ fontFamily: 'Poppins, sans-serif' }}>Safdarjung Enclave,Delhi,  India</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-emerald-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-xl font-bold text-emerald-700 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Service Areas
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {cities.slice(0, 8).map((city, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                        style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-gray-700 mb-4"style={{ fontFamily: 'Poppins, sans-serif' }}>
                      ©2025 GridaNeo Bharat. All rights reserved.
                    </p>
                    <div className="flex gap-4 justify-center md:justify-end">
                      <Link href="/" className="text-emerald-600 hover:text-emerald-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Privacy Policy</Link>
                      <Link href="/" className="text-emerald-600 hover:text-emerald-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Terms of Service</Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
