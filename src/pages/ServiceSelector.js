'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '../features/Data';

// 🔹 Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export default function ServiceSelector() {
  const [selectedService, setSelectedService] = useState(null);
  const scrollRef = useRef(null);

  const handleCardClick = (service) => {
    setSelectedService(service);
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="px-4 sm:px-10 md:px-20 py-10 max-w-7xl mx-auto mt-20 space-y-16">
      {/* 🔹 Service Icon Buttons - Responsive Layout */}
      <div className=" rounded-2xl p-4 ">
        <motion.div
          className="grid grid-cols-2 sm:flex sm:overflow-x-auto gap-4 sm:gap-5 py-2 sm:px-1 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200 scroll-smooth"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.isArray(services) &&
            services.map((service, index) => (
              <motion.button
                key={index}
                variants={itemVariants}
                onClick={() => handleCardClick(service)}
                className={`flex flex-col items-center justify-center
                  min-w-[100px] min-h-[100px] sm:min-w-[90px] sm:min-h-[90px]
                  rounded-xl  text-center px-2
                  transition-all duration-300 ease-in-out
                  ${
                    selectedService?.name === service.name
                      ? 'border-green-600 ring-2 ring-green-300'
                      : 'border-gray-300'
                  } hover:border-green-500`}
              >
                <div className="text-[34px] text-green-600 mb-1">{service.icon}</div>
                <div className="text-sm font-medium text-gray-800 leading-tight">
                  {service.name}
                </div>
              </motion.button>
            ))}
        </motion.div>
      </div>

      {/* 🔻 Dynamic Component Render */}
      {selectedService?.Component && (
        <div ref={scrollRef}>
          <motion.div
            key={selectedService.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            <selectedService.Component />
          </motion.div>
        </div>
      )}
    </div>
  );
}
