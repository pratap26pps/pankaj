'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import services from '../features/Data';

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

      {/* 🔹 Scrollable Service Cards */}
      <div className="flex overflow-x-auto gap-4 pb-4 px-1 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200 scroll-smooth">
        {services.map((service, index) => (
          <motion.div
            key={index}
            onClick={() => handleCardClick(service)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`min-w-[240px] sm:min-w-[280px] bg-white p-4 rounded-3xl shadow-md border cursor-pointer flex-shrink-0 hover:border-green-500 hover:shadow-lg ${
              selectedService?.name === service.name
                ? 'border-green-600 ring-2 ring-green-300'
                : ''
            }`}
          >
            <div className="flex items-center gap-4 mb-2">
              {service.icon}
              <div>
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔻 Scroll Target + Dynamic Component Section */}
      {selectedService?.Component && (
        <div ref={scrollRef}>
          <motion.div
            key={selectedService.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-xl bg-gray-100 border shadow-md"
          >
            {/* ✅ Render the actual component dynamically */}
            <selectedService.Component />
          </motion.div>
        </div>
      )}
    </div>
  );
}
