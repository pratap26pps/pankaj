'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {services} from '../features/Data'


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
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            const city =
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.village ||
              data?.address?.state ||
              'Unknown';
            setLocation(city);
          } catch (err) {
            console.error('Reverse geocoding error:', err);
          }
        },
        (err) => {
          console.error('Geolocation error:', err.message);
        }
      );
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
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 sm:px-6 md:px-10 py-10  bg-no-repeat bg-center bg-cover" style={{ backgroundImage: "url('/images/book.jpg')" }}>
      <div className="max-w-6xl mt-20 sm:mt-32 mx-auto space-y-10">
        {/* ✅ Heading */}
        {/* <div className="text-center -mt-30">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            Welcome to <span className="text-green-600">GNB EV Service Center {location}</span>
          </h1>
          <p className="text-gray-800 font-bold bg-blue w-fulltext-lg">Select the service you’re looking for</p>
        </div> */}

        {/* ✅ Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.button
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(service.name)}
              className="cursor-pointer bg-white border-2 border-green-200 hover:border-green-400 text-green-800 font-medium rounded-2xl shadow-md flex flex-col items-center justify-center text-center p-6 w-full h-44 sm:h-48 md:h-52 transition-all duration-300 focus:outline-none"
            >
              {service.icon}
              <h3 className="text-md font-bold mt-2">{service.name}</h3>
              <p className="text-sm text-gray-600 mt-1 px-2">{service.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePage;