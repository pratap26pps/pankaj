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
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 pt-24" style={{ fontFamily: 'Inter, sans-serif' }}>
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
                          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-blue-600 mb-4 leading-tight"
                          style={{ 
                            fontFamily: 'Playfair Display, serif',
                            letterSpacing: '-0.02em'
                          }}
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
                            className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium px-4"
                            style={{ 
                              fontFamily: 'Inter, sans-serif',
                              lineHeight: '1.7'
                            }}
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
                            className="text-xs sm:text-sm font-semibold text-gray-700"
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
                      className="text-center mb-12"
                    >
                      <p 
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-medium px-4"
                        style={{ 
                          fontFamily: 'Inter, sans-serif', 
                          fontWeight: '500',
                          lineHeight: '1.7'
                        }}
                      >
                        A <span className="text-blue-600 font-semibold">purpose-driven Indian clean-tech company</span> committed to transforming India's energy landscape through two revolutionary missions:
                      </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                        whileHover={{ 
                          scale: 1.03, 
                          y: -8,
                          transition: { duration: 0.3 }
                        }}
                        className="h-full"
                      >
                        <div 
                          className="h-full text-center border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group/card"
                          style={{
                            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
                            border: '2px solid rgba(59, 130, 246, 0.2)'
                          }}
                        >
                          <div className="relative p-8">
                            {/* Floating Icon Container */}
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.8 }}
                              className="relative mx-auto mb-6"
                              style={{ width: 'fit-content' }}
                            >
                              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl group-hover/card:shadow-2xl transition-all duration-500">
                                <span className="text-4xl text-white">⚡</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              </div>
                            </motion.div>
                            
                            <h3 
                              className="text-xl sm:text-2xl font-bold text-blue-900 mb-4"
                              style={{ 
                                fontFamily: 'Poppins, sans-serif',
                                letterSpacing: '-0.01em'
                              }}
                            >
                              Smart Battery Systems
                            </h3>
                            
                            <p 
                              className="text-blue-800 leading-relaxed font-medium"
                              style={{ 
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '16px',
                                lineHeight: '1.6'
                              }}
                            >
                              Providing <strong>smart, silent battery backup systems</strong> to replace diesel generators with clean, efficient energy solutions
                            </p>
                            
                            {/* Feature Tags */}
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Silent</span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Efficient</span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Smart</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.8 }}
                        whileHover={{ 
                          scale: 1.03, 
                          y: -8,
                          transition: { duration: 0.3 }
                        }}
                        className="h-full"
                      >
                        <div 
                          className="h-full text-center border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group/card"
                          style={{
                            background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)',
                            border: '2px solid rgba(16, 185, 129, 0.2)'
                          }}
                        >
                          <div className="relative p-8">
                            {/* Floating Icon Container */}
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.8 }}
                              className="relative mx-auto mb-6"
                              style={{ width: 'fit-content' }}
                            >
                              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-xl group-hover/card:shadow-2xl transition-all duration-500">
                                <span className="text-4xl text-white">🚗</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              </div>
                            </motion.div>
                            
                            <h3 
                              className="text-xl sm:text-2xl font-bold text-emerald-900 mb-4"
                              style={{ 
                                fontFamily: 'Poppins, sans-serif',
                                letterSpacing: '-0.01em'
                              }}
                            >
                              EV Services
                            </h3>
                            
                            <p 
                              className="text-emerald-800 leading-relaxed font-medium"
                              style={{ 
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '16px',
                                lineHeight: '1.6'
                              }}
                            >
                              Offering <strong>reliable EV servicing and maintenance</strong> to support India's electric mobility transformation
                            </p>
                            
                            {/* Feature Tags */}
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
                          className="text-lg sm:text-xl text-gray-800 leading-relaxed mb-0 font-medium"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: '1.7'
                          }}
                        >
                          Our <span className="text-blue-600 font-semibold">clean-energy solutions</span> deliver long-term savings, zero emissions, and peace of mind — 
                          built for <span className="text-emerald-600 font-semibold">homes, businesses, farms, and institutions</span>.
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

            {/* Mission and Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="h-full"
              >
                <div className="relative h-full">
                  {/* Background Glow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-3xl blur-xl opacity-70" />
                  
                  <div 
                    className="relative h-full border-0 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 group/mission"
                    style={{
                      background: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 30%, #fb923c 70%, #f97316 100%)',
                      border: '2px solid rgba(251, 146, 60, 0.3)'
                    }}
                  >
                    {/* Animated Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 group-hover/mission:opacity-20 transition-opacity duration-700">
                      <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/30 rounded-full" />
                      <div className="absolute top-8 right-8 w-4 h-4 bg-white/20 rounded-full" />
                      <div className="absolute bottom-8 left-8 w-6 h-6 border border-white/30 rotate-45" />
                      <div className="absolute bottom-4 right-12 w-3 h-3 bg-white/30 rounded-full" />
                    </div>
                    
                    <div className="relative p-8 sm:p-10">
                      <div className="text-center mb-8">
                        <motion.div
                          whileHover={{ 
                            rotate: [0, -10, 10, -10, 0],
                            scale: 1.1
                          }}
                          transition={{ duration: 0.6 }}
                          className="relative mx-auto mb-6"
                          style={{ width: 'fit-content' }}
                        >
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover/mission:shadow-3xl transition-all duration-500">
                            <span className="text-4xl text-white">🚀</span>
                          </div>
                          {/* Floating Particles */}
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-pulse" />
                        </motion.div>
                        
                        <h2 
                          className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 drop-shadow-lg"
                          style={{ 
                            fontFamily: 'Playfair Display, serif',
                            letterSpacing: '-0.01em',
                            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                          }}
                        >
                          Our Mission
                        </h2>
                        
                        <div className="w-16 h-1 bg-white/80 rounded-full mx-auto mb-6" />
                      </div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                      >
                        <p 
                          className="text-lg sm:text-xl text-white leading-relaxed text-center mb-8 font-medium drop-shadow-md"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: '1.7',
                            textShadow: '0 2px 8px rgba(0,0,0,0.2)'
                          }}
                        >
                          Deliver <span className="font-bold text-yellow-100">sustainable, noise-free power</span> and dependable EV support that enhances lives and powers progress.
                        </p>
                      </motion.div>
                      
                      {/* Feature Pills */}
                      <div className="flex flex-wrap justify-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                        >
                          <span className="text-yellow-200">🔇</span>
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Silent</span>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                        >
                          <span className="text-green-200">✅</span>
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Sustainable</span>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                        >
                          <span className="text-blue-200">🛡️</span>
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Reliable</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="h-full"
              >
                <div className="relative h-full">
                  {/* Background Glow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl opacity-70" />
                  
                  <div 
                    className="relative h-full border-0 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 group/vision"
                    style={{
                      background: 'linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 30%, #c084fc 70%, #a855f7 100%)',
                      border: '2px solid rgba(192, 132, 252, 0.3)'
                    }}
                  >
                    {/* Animated Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 group-hover/vision:opacity-20 transition-opacity duration-700">
                      <div className="absolute top-6 right-6 w-6 h-6 border-2 border-white/30 rounded-full" />
                      <div className="absolute top-12 left-6 w-4 h-4 bg-white/20 rounded-full" />
                      <div className="absolute bottom-6 right-12 w-5 h-5 border border-white/30 rotate-45" />
                      <div className="absolute bottom-12 left-12 w-3 h-3 bg-white/30 rounded-full" />
                    </div>
                    
                    <div className="relative p-8 sm:p-10">
                      <div className="text-center mb-8">
                        <motion.div
                          whileHover={{ 
                            rotate: [0, 10, -10, 10, 0],
                            scale: 1.1
                          }}
                          transition={{ duration: 0.6 }}
                          className="relative mx-auto mb-6"
                          style={{ width: 'fit-content' }}
                        >
                          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover/vision:shadow-3xl transition-all duration-500">
                            <span className="text-4xl text-white">💡</span>
                          </div>
                          {/* Floating Particles */}
                          <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />
                        </motion.div>
                        
                        <h2 
                          className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 drop-shadow-lg"
                          style={{ 
                            fontFamily: 'Playfair Display, serif',
                            letterSpacing: '-0.01em',
                            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                          }}
                        >
                          Our Vision
                        </h2>
                        
                        <div className="w-16 h-1 bg-white/80 rounded-full mx-auto mb-6" />
                      </div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                      >
                        <p 
                          className="text-lg sm:text-xl text-white leading-relaxed text-center mb-8 font-medium drop-shadow-md"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: '1.7',
                            textShadow: '0 2px 8px rgba(0,0,0,0.2)'
                          }}
                        >
                          A <span className="font-bold text-yellow-100">smarter, quieter, greener Bharat</span> — powered by clean energy solutions that transform communities and preserve our environment for future generations.
                        </p>
                      </motion.div>
                      
                      {/* Feature Pills */}
                      <div className="flex flex-wrap justify-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                        >
                          <span className="text-yellow-200">💡</span>
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Smart</span>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                        >
                          <span className="text-green-200">🌱</span>
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Green</span>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                        >
                          <span className="text-red-200">❤️</span>
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Future</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

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
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-blue-600 via-emerald-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight"
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
                      className="text-base font-bold text-gray-700"
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
                    className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '1.7'
                    }}
                  >
                    Ready to embrace <span className="text-blue-600 font-semibold">clean energy</span>? Contact us today for <span className="text-emerald-600 font-semibold">sustainable solutions</span>.
                  </p>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="h-full"
                >
                  <div className="relative h-full">
                    {/* Background Glow Effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-emerald-400/20 rounded-3xl blur-xl opacity-70" />
                    
                    <div 
                      className="relative h-full border-0 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 group/contact"
                      style={{
                        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 30%, #93c5fd 70%, #3b82f6 100%)',
                        border: '2px solid rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      {/* Animated Pattern Overlay */}
                      <div className="absolute inset-0 opacity-10 group-hover/contact:opacity-20 transition-opacity duration-700">
                        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/30 rounded-full" />
                        <div className="absolute top-8 right-8 w-4 h-4 bg-white/20 rounded-full" />
                        <div className="absolute bottom-8 left-8 w-6 h-6 border border-white/30 rotate-45" />
                        <div className="absolute bottom-4 right-12 w-3 h-3 bg-white/30 rounded-full" />
                      </div>
                      
                      <div className="relative p-6 sm:p-8 lg:p-10">
                        <div className="text-center mb-8">
                          <motion.div
                            whileHover={{ 
                              rotate: [0, -10, 10, -10, 0],
                              scale: 1.1
                            }}
                            transition={{ duration: 0.6 }}
                            className="relative mx-auto mb-6"
                            style={{ width: 'fit-content' }}
                          >
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover/contact:shadow-3xl transition-all duration-500">
                              <span className="text-4xl text-white">📍</span>
                            </div>
                            {/* Floating Particles */}
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse" />
                          </motion.div>
                          
                          <h2 
                            className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-3 drop-shadow-lg"
                            style={{ 
                              fontFamily: 'Playfair Display, serif',
                              letterSpacing: '-0.01em',
                              textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                            }}
                          >
                            Contact Us
                          </h2>
                          
                          <p 
                            className="text-sm sm:text-base text-white/90 mb-6 font-medium"
                            style={{ 
                              fontFamily: 'Inter, sans-serif',
                              lineHeight: '1.6'
                            }}
                          >
                            Power your home. Maintain your EV. Choose clean energy.
                          </p>
                          
                          <div className="w-16 h-1 bg-white/80 rounded-full mx-auto mb-6" />
                        </div>
                      
                        {/* Contact Pills */}
                        <div className="space-y-3">
                          <motion.div
                            whileHover={{ scale: 1.05, x: 5 }}
                            className="flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
                          >
                            <span className="text-yellow-200 text-lg flex-shrink-0">📍</span>
                            <div className="flex-1 min-w-0">
                              <span className="text-white font-semibold text-sm block" style={{ fontFamily: 'Inter, sans-serif' }}>Office</span>
                              <span className="text-white/90 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>Safdarjung Enclave</span>
                            </div>
                          </motion.div>
                          
                          <motion.a
                            href="tel:+917982737801"
                            whileHover={{ scale: 1.05, x: 5 }}
                            className="flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 block"
                          >
                            <span className="text-green-200 text-lg flex-shrink-0">⚡</span>
                            <div className="flex-1 min-w-0">
                              <span className="text-white font-semibold text-sm block" style={{ fontFamily: 'Inter, sans-serif' }}>Phone</span>
                              <span className="text-white/90 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>+91 79827 37801</span>
                            </div>
                          </motion.a>
                          
                          <motion.a
                            href="mailto:info@gridaneobharat.com"
                            whileHover={{ scale: 1.05, x: 5 }}
                            className="flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 block"
                          >
                            <span className="text-purple-200 text-lg flex-shrink-0">🚗</span>
                            <div className="flex-1 min-w-0">
                              <span className="text-white font-semibold text-sm block" style={{ fontFamily: 'Inter, sans-serif' }}>Email</span>
                              <span className="text-white/90 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>info@gridaneobharat.com</span>
                            </div>
                          </motion.a>
                          
                          <motion.a
                            href="https://www.gridaneobharat.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, x: 5 }}
                            className="flex items-center gap-3 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 block"
                          >
                            <span className="text-blue-200 text-lg flex-shrink-0">🛡️</span>
                            <div className="flex-1 min-w-0">
                              <span className="text-white font-semibold text-sm block" style={{ fontFamily: 'Inter, sans-serif' }}>Website</span>
                              <span className="text-white/90 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>www.gridaneobharat.com</span>
                            </div>
                          </motion.a>
                          
                          {/* Find My Location Button */}
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                  (position) => {
                                    const { latitude, longitude } = position.coords;
                                    window.open(`https://www.google.com/maps/dir/${latitude},${longitude}/Safdarjung+Enclave,+New+Delhi`, '_blank');
                                  },
                                  () => {
                                    window.open('https://www.google.com/maps/search/Safdarjung+Enclave,+New+Delhi', '_blank');
                                  }
                                );
                              } else {
                                window.open('https://www.google.com/maps/search/Safdarjung+Enclave,+New+Delhi', '_blank');
                              }
                            }}
                            className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 backdrop-blur-sm rounded-full border-2 border-emerald-300/50 hover:border-emerald-300 transition-all duration-300 mt-4"
                          >
                            <span className="text-emerald-200 text-xl">📍</span>
                            <div className="text-center">
                              <span className="text-white font-bold text-sm block" style={{ fontFamily: 'Inter, sans-serif' }}>Find My Location</span>
                              <span className="text-emerald-200 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>Get directions to our office</span>
                            </div>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Map */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="h-full"
                >
                  <div className="h-full shadow-2xl bg-white/95 backdrop-blur-sm border-0 rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500">
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <h4 
                          className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <span className="text-lg text-white">📍</span>
                          </div>
                          Find Our Location
                        </h4>
                      </div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl relative group"
                      >
                        <iframe
                          title="GridaNeo Bharat Office Location - Safdarjung Enclave"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5234567890123!2d77.20123456789012!3d28.567890123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26b00000000%3A0x0000000000000000!2sSafdarjung%20Enclave%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1642345678901!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-2xl transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                      </motion.div>
                      
                      <div className="mt-6 text-center">
                        <motion.a
                          href="https://maps.google.com/?q=Safdarjung+Enclave,+New+Delhi"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <button 
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white border-none rounded-full px-8 py-6 h-auto font-semibold hover:shadow-lg transition-all duration-300"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <span className="mr-2">📍</span>
                            Open in Google Maps
                          </button>
                        </motion.a>
                      </div>
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