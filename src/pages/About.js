import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

const About = () => {
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

      <div className="min-h-screen bg-green-50 pt-24" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Company Introduction */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-20"
            >
              <div className="relative">
                {/* Background Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-xl" />

                <div
                  className="relative shadow-2xl bg-white/95 backdrop-blur-lg border-0 rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-700 group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                    border: '1px solid rgba(59, 130, 246, 0.1)'
                  }}
                >
                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />

                  <div className="relative p-8 sm:p-10 lg:p-16">
                    <div className="text-center mb-12">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                      >
                        <h1
                          className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-4 leading-tight"
                          style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}
                        >
                          GridaNeo Bharat
                        </h1>

                        {/* Simple Decorative Line */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.2, delay: 1 }}
                          className="mx-auto mb-6"
                          style={{ maxWidth: '200px' }}
                        >
                          <div className="h-1 bg-green-500 rounded-full" />
                        </motion.div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 1.2 }}
                          className="mb-6"
                        >
                          <p
                            className="text-md text-gray-900 max-w-2xl mx-auto font-normal leading-snug"
                            style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}
                          >
                            Leading India's clean energy revolution with smart, sustainable solutions
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 1.4 }}
                          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full border border-green-200 shadow-sm"
                        >
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <span
                            className="text-xs sm:text-sm font-semibold text-gray-900"
                            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px' }}
                          >
                            CLEAN ENERGY PIONEERS
                          </span>
                        </motion.div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                      className="text-center mt-8"
                    >
                      <p
                        className="text-md text-gray-900 max-w-4xl mx-auto  mb-10 font-normal leading-snug"
                        style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}
                      >
                        A purpose-driven Indian clean-tech company committed to transforming India's energy landscape through two revolutionary missions:
                      </p>
                    </motion.div>

                    {/* 2-column grid for the four cards: first row Mission/Vision, second row Smart Battery/EV Services */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                      {/* Our Mission Card */}
                      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.3 } }} className="h-full">
                        <div className="h-full text-center border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group/card" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)', border: '2px solid rgba(59, 130, 246, 0.2)' }}>
                          <div className="relative p-8">
                            <motion.div whileHover={{ x: [0, -8, 8, -8, 8, 0] }} transition={{ duration: 0.5 }} className="relative mx-auto mb-6" style={{ width: 'fit-content' }}>
                              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl group-hover/card:shadow-2xl transition-all duration-500">
                                <span className="text-4xl text-white">🚀</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              </div>
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}>Our Mission</h3>
                            <p className="text-sm text-gray-900 font-normal leading-snug mb-2" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}>
                              Deliver <strong>sustainable, noise-free power</strong> and dependable EV support that enhances lives and powers progress.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Silent</span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Sustainable</span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Reliable</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      {/* Our Vision Card */}
                      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.3 } }} className="h-full">
                        <div className="h-full text-center border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group/card" style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)', border: '2px solid rgba(16, 185, 129, 0.2)' }}>
                          <div className="relative p-8">
                            <motion.div whileHover={{ x: [0, -8, 8, -8, 8, 0] }} transition={{ duration: 0.5 }} className="relative mx-auto mb-6" style={{ width: 'fit-content' }}>
                              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-xl group-hover/card:shadow-2xl transition-all duration-500">
                                <span className="text-4xl text-white">💡</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              </div>
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}>Our Vision</h3>
                            <p className="text-sm text-gray-900 font-normal leading-snug mb-2" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}>
                              A <strong>smarter, quieter, greener Bharat</strong> — powered by clean energy solutions that transform communities and preserve our environment for future generations.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Smart</span>
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Green</span>
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Future</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      {/* Smart Battery Systems Card */}
                      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.3 } }} className="h-full">
                        <div className="h-full text-center border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group/card" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)', border: '2px solid rgba(59, 130, 246, 0.2)' }}>
                          <div className="relative p-8">
                            <motion.div whileHover={{ x: [0, -8, 8, -8, 8, 0] }} transition={{ duration: 0.5 }} className="relative mx-auto mb-6" style={{ width: 'fit-content' }}>
                              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl group-hover/card:shadow-2xl transition-all duration-500">
                                <span className="text-4xl text-white">⚡</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              </div>
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}>Smart Battery Systems</h3>
                            <p className="text-sm text-gray-900 font-normal leading-snug mb-2" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}>
                              Providing <strong>smart, silent battery backup systems</strong> to replace diesel generators with clean, efficient energy solutions
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Silent</span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Efficient</span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Smart</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      {/* EV Services Card */}
                      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.3 } }} className="h-full">
                        <div className="h-full text-center border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group/card" style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)', border: '2px solid rgba(16, 185, 129, 0.2)' }}>
                          <div className="relative p-8">
                            <motion.div whileHover={{ x: [0, -8, 8, -8, 8, 0] }} transition={{ duration: 0.5 }} className="relative mx-auto mb-6" style={{ width: 'fit-content' }}>
                              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-xl group-hover/card:shadow-2xl transition-all duration-500">
                                <span className="text-4xl text-white">🚗</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              </div>
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}>EV Services</h3>
                            <p className="text-sm text-gray-900 font-normal leading-snug mb-2" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}>
                              Offering <strong>reliable EV servicing and maintenance</strong> to support India's electric mobility transformation
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Reliable</span>
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Expert</span>
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Future</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 2.0 }}
                      className="text-center"
                    >
                      <div className="relative p-8 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200/50">
                        <p
                          className="text-md  text-gray-900 leading-relaxed mb-0 font-medium"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: '1.7'
                          }}
                        >
                          "Our clean-energy solutions deliver long-term savings, zero emissions, and peace of mind —
                          built for homes, businesses, farms, and institutions."
                        </p>

                        {/* Decorative Elements */}
                        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <div className="absolute bottom-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mb-20"
            >
              <div className="text-center mb-16">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.4 }}
                >
                  <h1
                    className="text-3xl sm:text-xl lg:text-6xl xl:text-5xl font-black bg-gradient-to-r from-blue-600 via-emerald-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      textShadow: '0 4px 20px rgba(59, 130, 246, 0.15)',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Get In Touch
                  </h1>

                  {/* Enhanced Decorative Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, delay: 1.6 }}
                    className="relative mx-auto mb-8"
                    style={{ maxWidth: '200px' }}
                  >
                    <div className="h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full" />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full animate-pulse" />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full border border-blue-200/50 shadow-lg"
                  >
                    <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
                    <span
                      className="text-base font-bold text-gray-900"
                      style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px' }}
                    >
                      CONNECT WITH US TODAY
                    </span>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.0 }}
                  className="mt-8"
                >
                  <p
                    className="text-xl text-gray-900 max-w-4xl mx-auto font-medium leading-relaxed"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '1.7'
                    }}
                  >
                    Ready to embrace clean energy Contact us today for sustainable solutions .
                  </p>
                </motion.div>
              </div>

              {/* Contact and Location cards in a 2-column grid, styled like the main cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Contact Us Card (blue style) */}
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.3 } }} className="h-full">
                  <div className="h-full text-center border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group/card" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)', border: '2px solid rgba(59, 130, 246, 0.2)' }}>
                    <div className="relative p-8">
                      <motion.div whileHover={{ x: [0, -8, 8, -8, 8, 0] }} transition={{ duration: 0.5 }} className="relative mx-auto mb-6" style={{ width: 'fit-content' }}>
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl group-hover/card:shadow-2xl transition-all duration-500">
                          <span className="text-4xl text-white">📞</span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}>Contact Us</h3>
                      <p className="text-sm text-gray-900 font-normal leading-snug mb-2" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}>
                        Power your home. Maintain your EV. Choose clean energy.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 justify-center">
                          {/* Map Pin SVG */}
                          <span className="text-blue-500 text-lg flex-shrink-0"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 21s-6-5.25-6-10A6 6 0 0118 11c0 4.75-6 10-6 10z" fill="#3b82f6"/><circle cx="12" cy="11" r="2.5" fill="#60a5fa"/></svg></span>
                          <div>
                            <span className="text-blue-900 font-semibold text-sm block" style={{ fontFamily: 'Inter, sans-serif' }}>Office</span>
                            <span className="text-blue-800 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>Safdarjung Enclave</span>
                          </div>
                        </div>
                        <a href="tel:+917982737801" className="flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 justify-center">
                          {/* Phone SVG */}
                          <span className="text-green-500 text-lg flex-shrink-0"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.54.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.54 1 1 0 01-.21 1.11l-2.2 2.2z" fill="#10b981"/></svg></span>
                          <div>
                            <span className="text-blue-900 font-semibold text-sm block" style={{ fontFamily: 'Inter, sans-serif' }}>Phone</span>
                            <span className="text-blue-800 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>+91 79827 37801</span>
                          </div>
                        </a>
                        <a href="mailto:info@gridaneobharat.com" className="flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 justify-center">
                          {/* Envelope SVG */}
                          <span className="text-purple-500 text-lg flex-shrink-0"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="#a78bfa"/><path d="M3 7l9 6 9-6" stroke="#7c3aed" strokeWidth="1.5"/></svg></span>
                          <div>
                            <span className="text-blue-900 font-semibold text-sm block" style={{ fontFamily: 'Inter, sans-serif' }}>Email</span>
                            <span className="text-blue-800 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>info@gridaneobharat.com</span>
                          </div>
                        </a>
                        <a href="https://www.gridaneobharat.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 justify-center">
                          {/* Globe SVG */}
                          <span className="text-blue-400 text-lg flex-shrink-0"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#38bdf8" strokeWidth="2" fill="#bae6fd"/><path d="M2 12h20M12 2c2.5 2.5 4 6.5 4 10s-1.5 7.5-4 10c-2.5-2.5-4-6.5-4-10s1.5-7.5 4-10z" stroke="#0ea5e9" strokeWidth="1.5"/></svg></span>
                          <div>
                            <span className="text-blue-900 font-semibold text-sm block" style={{ fontFamily: 'Inter, sans-serif' }}>Website</span>
                            <span className="text-blue-800 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>www.gridaneobharat.com</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* Find Our Location Card (green style) */}
                <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.3 } }} className="h-full">
                  <div className="h-full text-center border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group/card" style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)', border: '2px solid rgba(16, 185, 129, 0.2)' }}>
                    <div className="relative p-8">
                      <motion.div whileHover={{ x: [0, -8, 8, -8, 8, 0] }} transition={{ duration: 0.5 }} className="relative mx-auto mb-6" style={{ width: 'fit-content' }}>
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-xl group-hover/card:shadow-2xl transition-all duration-500">
                          <span className="text-4xl text-white">📍</span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}>Find Our Location</h3>
                      <p className="text-sm text-gray-900 font-normal leading-snug mb-2" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}>
                        Get directions to our office and visit us for more information.
                      </p>
                      <div className="w-full h-[200px] md:h-[250px] lg:h-[200px] rounded-2xl overflow-hidden shadow-xl relative group mb-4">
                        <iframe title="GridaNeo Bharat Office Location - Safdarjung Enclave" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5234567890123!2d77.20123456789012!3d28.567890123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26b00000000%3A0x0000000000000000!2sSafdarjung%20Enclave%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1642345678901!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-2xl transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <a href="https://maps.google.com/?q=Safdarjung+Enclave,+New+Delhi" target="_blank" rel="noopener noreferrer">
                        <button className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-none rounded-full px-8 py-4 h-auto font-semibold hover:shadow-lg transition-all duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <span className="mr-2">📍</span>
                          Open in Google Maps
                        </button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default About;