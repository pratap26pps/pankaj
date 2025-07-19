'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { services } from '../features/Data';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const ServicePage = () => {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Add timeout and better error handling
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              {
                signal: controller.signal,
                headers: {
                  'User-Agent': 'GridaNeo-Bharat-App/1.0'
                }
              }
            );
            
            clearTimeout(timeoutId);
            
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
 
            const city =
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.village ||
              data?.address?.county ||
              data?.address?.state_district ||
              data?.address?.state ||
              data?.address?.suburb ||
              data?.address?.region ||
              data?.display_name?.split(',')[0] ||
              'Delhi';

            setLocation(city);
            console.log('Location detected:', city);
          } catch (error) {
            console.error("Failed to fetch location info:", error);
            // Set a default location instead of error message
            setLocation("Delhi");
          }
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          // Set default location for all geolocation errors
          setLocation("Delhi");
        },
        {
          timeout: 10000, // 10 second timeout for geolocation
          enableHighAccuracy: false,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    } else {
      console.warn("Geolocation not supported");
      setLocation("Delhi");
    }
  }, []);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (serviceName) => {
    const slug = serviceName.toLowerCase().replace(/\s+/g, '-');
    router.push({
      pathname: '/ServiceSelector',
      query: { service: slug },
    });
  };

  return (
    <section className="min-h-screen bg-white px-4 mt-10 sm:px-6 md:px-10 py-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-600 mb-4">
            Our <span className="text-blue-600">Services</span> in {location}
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Select the service you're looking for
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <motion.button
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(service.name)}
              className="group cursor-pointer bg-white border-2 border-gray-200 hover:border-green-400 text-gray-800 font-medium rounded-3xl shadow-lg hover:shadow-2xl flex flex-col items-center justify-center text-center p-8 w-full h-56 sm:h-60 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-200"
            >
              <div className="text-green-600 group-hover:text-blue-600 transition-colors duration-300 mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-green-600 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed px-2">
                {service.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
