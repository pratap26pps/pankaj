'use client';

import * as React from 'react';
 
import ServicePage from './Servicepage';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Head from 'next/head';
import BookingStepOneForm from '@/features/BookingStepOneForm';
import { useRouter } from 'next/navigation'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
const Index = () => {
const router = useRouter(); 
 
const form = useSelector((state) => state.booking.form);
const step = useSelector((state) => state.booking.step);

 const handleClick = () => {
   router.push('/ServiceForm');
 }
 const Serviceclick = () => {
   router.push('/Servicepage');
 }


const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds (you can skip this if using real API)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="h-full w-full " style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* ✅ Hero Image Section - Full Width/Height */}
        <div className="w-full flex items-start justify-center   lg:mt-6  sm:pt-1 md:pt-10">
          <div className="w-full">
            <div className="relative w-full h-[calc(100vh-5rem)]"> {/* 5rem = 80px navbar height */}
              <Image
                src="/public/images/hero-banner.jpg"
                alt="Hero Banner"
                fill
                className="object-fill mt-5 w-full h-full"
                priority
              />
            </div>
            <div className='absolute bottom-0 right-15 w-4/12  p-4'>
             
            <BookingStepOneForm form={form} step={step} />
              
    
            </div>
          </div>
        </div>

      {/* ✅ Hero Section - Professional Redesign */}
      <div className="w-full bg-green-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center space-y-8"
          >
            <h1
              className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl font-black leading-tight"
              style={{
                fontFamily: 'inter,san-serif, serif',
                letterSpacing: '-0.02em'
              }}
            >
              <span className="text-green-600">Fuel-Free Power.</span>
              <br />
              <span className="text-blue-600">EV-Ready India.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="text-lg   sm:text-xl md:text-2xl text-gray-700 font-medium leading-relaxed max-w-5xl mx-auto"
              style={{ fontFamily: 'sans-serif' }}
            >
              India's clean-tech solution for silent battery backup systems and trusted electric vehicle servicing,
             designed for reliability
              built for the future...
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={ Serviceclick }
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl min-w-[250px]"
              >
                Explore Service Solutions
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl min-w-[250px]"
              >
                Book EV Service
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ✅ Professional Features Section */}
      <div className="w-full bg-green-50 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-6"
              style={{ fontFamily: 'poppins, serif', letterSpacing: '-0.01em' }}
            >
              Powering India's <span className="text-blue-600">Electric Future</span>
            </h2>
            <p
              className="text-xl sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
              style={{ fontFamily: 'poppins, sans-serif' }}
            >
              Leading the charge with innovative solutions and unmatched expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3
                className="text-2xl font-bold text-green-600 mb-4 text-center group-hover:text-green-700 transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Lightning Fast
              </h3>
              <p
                className="text-gray-600 text-center leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Rapid service delivery with cutting-edge diagnostic tools and streamlined processes.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3
                className="text-2xl font-bold text-blue-600 mb-4 text-center group-hover:text-blue-700 transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Certified Excellence
              </h3>
              <p
                className="text-gray-600 text-center leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Industry-certified technicians with specialized EV training and proven expertise.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <div className="text-4xl font-bold text-white">
                  ₹
                </div>
              </div>
              <h3
                className="text-2xl font-bold text-green-600 mb-4 text-center group-hover:text-green-700 transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Smart Pricing
              </h3>
              <p
                className="text-gray-600 text-center leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Transparent, competitive rates starting at ₹199 with no hidden charges.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3
                className="text-2xl font-bold text-blue-600 mb-4 text-center group-hover:text-blue-700 transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Future Ready
              </h3>
              <p
                className="text-gray-600 text-center leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Advanced technology solutions designed for tomorrow's electric mobility needs.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

        {/* ✅ Service Component */}
        <ServicePage />
      </div>
    </>
  );
};

export default Index;
