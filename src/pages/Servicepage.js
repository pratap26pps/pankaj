'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/features/searchbar';
import { GiScooter } from 'react-icons/gi';
import { MdElectricRickshaw } from 'react-icons/md';
import {
  BatteryCharging,
  PlugZap,
  Wrench,
  PackageCheck,
} from 'lucide-react';

const services = [
  {
    name: 'Electric Bike',
    icon: <GiScooter className="h-10 w-10 text-green-700" />,
    description: 'Repair & maintenance for e-bikes',
  },
  {
    name: 'Erickshaw',
    icon: <MdElectricRickshaw className="h-10 w-10 text-green-700" />,
    description: 'Services for electric 3-wheelers',
  },
  {
    name: 'Lithium Batteries',
    icon: <BatteryCharging className="h-10 w-10 text-green-700" />,
    description: 'Battery checkup & replacement',
  },
  {
    name: 'Chargers',
    icon: <PlugZap className="h-10 w-10 text-green-700" />,
    description: 'Fast charging solutions',
  },
  {
    name: 'Accessories',
    icon: <Wrench className="h-10 w-10 text-green-700" />,
    description: 'All EV-related add-ons',
  },
  {
    name: 'Others',
    icon: <PackageCheck className="h-10 w-10 text-green-700" />,
    description: 'Miscellaneous EV support',
  },
];

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
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState(null);

  // ✅ Get city name using reverse geocoding
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
    alert(`You selected: ${serviceName}`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 sm:px-6 md:px-10 py-10">
      <div className="max-w-6xl mt-20 sm:mt-32 mx-auto space-y-10">
        {/* ✅ Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            Welcome to <span className="text-green-600">GNB EV  Service Center  {location}</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Select the service you’re looking for
          </p>


        </div>

   
        {/* ✅ Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(service.name)}
              className="cursor-pointer bg-white border-2 border-green-200 hover:border-green-400 text-green-800 font-medium rounded-2xl shadow-md flex flex-col items-center justify-center text-center p-6 w-full h-44 sm:h-48 md:h-52 transition-all duration-300"
            >
              {service.icon}
              <h3 className="text-md font-bold mt-2">{service.name}</h3>
              <p className="text-sm text-gray-600 mt-1 px-2">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
