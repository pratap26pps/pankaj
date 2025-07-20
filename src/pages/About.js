import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";

const About = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 pt-24"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
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

                <div className="relative shadow-2xl bg-white/95 backdrop-blur-lg border-0 rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-700 group"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
                    border: "1px solid rgba(59, 130, 246, 0.1)",
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
                            fontFamily: "Playfair Display, serif",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          GridaNeo Bharat
                        </h1>

                        {/* Simple Decorative Line */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.2, delay: 1 }}
                          className="mx-auto mb-6"
                          style={{ maxWidth: "200px" }}
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
                              fontFamily: "Inter, sans-serif",
                              lineHeight: "1.7",
                            }}
                          >
                            Leading India's clean energy revolution with smart,
                            sustainable solutions
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
                            style={{
                              fontFamily: "Inter, sans-serif",
                              letterSpacing: "0.5px",
                            }}
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
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "500",
                          lineHeight: "1.7",
                        }}
                      >
                        A{" "}
                        <span className="text-blue-600 font-semibold">
                          purpose-driven Indian clean-tech company
                        </span>{" "}
                        committed to transforming India's energy landscape
                        through two revolutionary missions:
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
                          transition: { duration: 0.3 },
                        }}
                        className="h-full"
                      >
                        <div
                          className="h-full text-center border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group/card"
                          style={{
                            background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)",
                            border: "2px solid rgba(59, 130, 246, 0.2)",
                          }}
                        >
                          <div className="relative p-8">
                            {/* Floating Icon Container */}
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.8 }}
                              className="relative mx-auto mb-6"
                              style={{ width: "fit-content" }}
                            >
                              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl group-hover/card:shadow-2xl transition-all duration-500">
                                <span className="text-4xl text-white">⚡</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              </div>
                            </motion.div>

                            <h3
                              className="text-2xl font-bold text-blue-800 mb-4"
                              style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              Silent Battery Backup Systems
                            </h3>
                            <p className="text-blue-700 leading-relaxed">
                              Providing reliable, eco-friendly power solutions for homes and businesses across India
                            </p>
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
                          transition: { duration: 0.3 },
                        }}
                        className="h-full"
                      >
                        <div
                          className="h-full text-center border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group/card"
                          style={{
                            background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 50%, #86efac 100%)",
                            border: "2px solid rgba(34, 197, 94, 0.2)",
                          }}
                        >
                          <div className="relative p-8">
                            {/* Floating Icon Container */}
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.8 }}
                              className="relative mx-auto mb-6"
                              style={{ width: "fit-content" }}
                            >
                              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-xl group-hover/card:shadow-2xl transition-all duration-500">
                                <span className="text-4xl text-white">🚗</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              </div>
                            </motion.div>

                            <h3
                              className="text-2xl font-bold text-green-800 mb-4"
                              style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              Electric Vehicle Services
                            </h3>
                            <p className="text-green-700 leading-relaxed">
                              Comprehensive maintenance and support for the growing EV ecosystem in India
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Mission Statement */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 2.0 }}
                      className="text-center"
                    >
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100">
                        <h2
                          className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
                          style={{ fontFamily: "Playfair Display, serif" }}
                        >
                          Our Mission
                        </h2>
                        <p
                          className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          To accelerate India's transition to sustainable energy by providing innovative, 
                          reliable, and accessible clean energy solutions that empower communities and 
                          businesses to thrive in a greener future.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key Features Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Why Choose GridaNeo Bharat?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We combine cutting-edge technology with deep local expertise to deliver exceptional results
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: "⚡", title: "Innovation", desc: "Latest technology solutions" },
                  { icon: "🛠️", title: "Expertise", desc: "Deep technical knowledge" },
                  { icon: "🌱", title: "Sustainability", desc: "Eco-friendly approaches" },
                  { icon: "🤝", title: "Support", desc: "24/7 customer service" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2.4 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
                <h2
                  className="text-2xl sm:text-3xl font-bold mb-4"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Ready to Go Green?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Join thousands of satisfied customers who have already made the switch to sustainable energy
                </p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Get Started Today
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;