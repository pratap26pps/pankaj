'use client';
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Building2, Users, Zap, Wrench, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
    'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri', 'Patna',
  ];

  return (
    <footer className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Decorative Wave Pattern */}
        <div className="absolute top-0 left-0 w-full h-20 " />

        <div className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header Section with App Download */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-700 mb-6"
                style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}
              >
                GridaNeo Bharat
              </h1>
              <div className="w-32 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mx-auto mb-8" />

              <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                Leading the future of electric vehicle services with innovative solutions and exceptional customer care.
              </p>

              {/* App Download & Social Section */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                  <div className="flex items-center justify-center">
                    <img
                      src="/images/logo (3).png"
                      alt="Company Logo"
                      width={150}
                      height={200}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Download Our App
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">
                      Experience seamless EV service booking
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button className="h-16 px-8 bg-gradient-to-r from-emerald-500 to-green-500 text-white border-none rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592c.207-.3585.207-.8167 0-1.1752-.207-.3585-.5986-.58-.9966-.58H7.4167c-.398 0-.7896.2215-.9966.58-.207.3585-.207.8167 0 1.1752L8.4175 9.3214c-.9066 1.3516-1.4368 3.0014-1.4368 4.7488 0 4.4615 3.5267 8.0789 7.8789 8.0789s7.8789-3.6174 7.8789-8.0789c0-1.7474-.5302-3.3972-1.4368-4.7488M13.25 13.5c0 .6904-.5596 1.25-1.25 1.25s-1.25-.5596-1.25-1.25.5596-1.25 1.25-1.25 1.25.5596 1.25 1.25"/>
                          </svg>
                          Google Play
                        </button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button className="h-16 px-8 bg-gradient-to-r from-gray-800 to-gray-600 text-white border-none rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                          App Store
                        </button>
                      </motion.div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-black text-2xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Follow Us
                    </h4>
                    <div className="flex gap-4 justify-center">
                      {[
                        { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#1877F3"/><path d="M15.12 8.5H13.5V7.5C13.5 7.22 13.72 7 14 7H15V5H13.5C12.12 5 11 6.12 11 7.5V8.5H9V10.5H11V19H13.5V10.5H15L15.12 8.5Z" fill="#fff"/></svg>, link: 'https://facebook.com' },
                        { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#E1306C"/><path d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5Z" fill="#fff"/><circle cx="17.5" cy="6.5" r="1.5" fill="#fff"/></svg>, link: 'https://instagram.com' },
                        { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#1DA1F2"/><path d="M19 7.5c-.5.22-1.04.37-1.6.44A2.8 2.8 0 0 0 18.5 6c-.54.32-1.13.56-1.77.68A2.8 2.8 0 0 0 12 9.5c0 .22.02.44.07.65C9.09 10.04 6.6 8.7 4.98 6.7c-.24.4-.38.87-.38 1.37 0 .95.48 1.8 1.2 2.3-.45-.01-.87-.14-1.24-.34v.03c0 1.33.95 2.44 2.2 2.7-.23.06-.47.1-.72.1-.18 0-.34-.02-.5-.05.34 1.06 1.33 1.84 2.5 1.86A5.6 5.6 0 0 1 5 17.5c-.36 0-.7-.02-1.04-.07A7.9 7.9 0 0 0 8.29 19c5.03 0 7.79-4.17 7.79-7.79 0-.12 0-.24-.01-.36.54-.39 1.01-.88 1.38-1.44Z" fill="#fff"/></svg>, link: 'https://twitter.com' },
                        { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#0A66C2"/><path d="M8.5 10.5H10.5V19H8.5V10.5ZM9.5 9.5C10.05 9.5 10.5 9.05 10.5 8.5C10.5 7.95 10.05 7.5 9.5 7.5C8.95 7.5 8.5 7.95 8.5 8.5C8.5 9.05 8.95 9.5 9.5 9.5ZM12.5 10.5H14.5V11.5H14.52C14.82 10.98 15.5 10.43 16.5 10.43C18.43 10.43 19 11.5 19 13.29V19H17V13.79C17 12.95 16.8 12.5 16.13 12.5C15.46 12.5 15.25 12.95 15.25 13.79V19H13.25V10.5H12.5Z" fill="#fff"/></svg>, link: 'https://linkedin.com' },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.3, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 text-xl bg-gradient-to-r from-emerald-500 to-green-500"
                        >
                          {social.icon}
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
              className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Company Info */}
                <div className="text-center lg:text-left">
                  <h3
                    className="text-2xl font-bold text-emerald-700 mb-4 flex items-center justify-center lg:justify-start gap-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="text-3xl text-emerald-500">{/* User/Company SVG */}<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#34d399"/><rect x="4" y="16" width="16" height="6" rx="3" fill="#10b981"/></svg></span>
                    Company
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-6 mx-auto lg:mx-0" />
                  <div className="space-y-4">
                    {[
                      { label: 'About Us', href: '/About' },
                      { label: 'Our Services', href: '/Servicepage' },
                      { label: 'Blog', href: '/Blog' },
                      { label: 'Careers', href: '/' },
                      { label: 'Contact', href: '/' }
                    ].map((link, index) => (
                      <Link key={index} href={link.href}>
                        <motion.div
                          whileHover={{ x: 5, color: '#059669' }}
                          className="text-gray-700 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-medium text-lg"
                        >
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
                  <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-6 mx-auto lg:mx-0" />
                  <div className="space-y-4">
                    {[
                      { label: 'EV Service', href: '/Servicepage' },
                      { label: 'Battery Backup', href: '/Servicepage' },
                      { label: 'Charging Solutions', href: '/Servicepage' },
                      { label: 'Maintenance', href: '/Servicepage' },
                      { label: 'Emergency Support', href: '/' }
                    ].map((link, index) => (
                      <Link key={index} href={link.href}>
                        <motion.div
                          whileHover={{ x: 5, color: '#059669' }}
                          className="text-gray-700 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-medium text-lg"
                        >
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
                  <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-6 mx-auto lg:mx-0" />
                  <div className="space-y-4">
                    {[
                      { label: 'Help Center', href: '/' },
                      { label: 'Contact Support', href: '/' },
                      { label: 'Service Areas', href: '/' },
                      { label: 'FAQ', href: '/' },
                      { label: 'Feedback', href: '/' }
                    ].map((link, index) => (
                      <Link key={index} href={link.href}>
                        <motion.div
                          whileHover={{ x: 5, color: '#059669' }}
                          className="text-gray-700 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-medium text-lg"
                        >
                          {link.label}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-center lg:text-left">
                  <h3
                    className="text-2xl font-bold text-emerald-700 mb-4 flex items-center justify-center lg:justify-start gap-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="text-3xl text-emerald-500">{/* Phone SVG */}<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.54.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.54 1 1 0 01-.21 1.11l-2.2 2.2z" fill="#10b981"/></svg></span>
                    Contact
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-6 mx-auto lg:mx-0" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <span className="text-emerald-500">{/* Phone SVG */}<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.54.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.54 1 1 0 01-.21 1.11l-2.2 2.2z" fill="#10b981"/></svg></span>
                      <span className="text-gray-700">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <span className="text-emerald-500">{/* Mail SVG */}<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/><path d="M3 7l9 6 9-6" stroke="#10b981" strokeWidth="1.5"/></svg></span>
                      <span className="text-gray-700">info@gridaneo.com</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <span className="text-emerald-500">{/* Location SVG */}<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="10" rx="7" ry="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/><circle cx="12" cy="10" r="3" fill="#34d399"/></svg></span>
                      <span className="text-gray-700">Mumbai, India</span>
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
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-gray-600 mb-4">
                      © 2024 GridaNeo Bharat. All rights reserved.
                    </p>
                    <div className="flex gap-4 justify-center md:justify-end">
                      <Link href="/" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</Link>
                      <Link href="/" className="text-emerald-600 hover:text-emerald-700">Terms of Service</Link>
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
