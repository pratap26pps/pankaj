'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ServiceSelectorProduct from '../features/Pages/[product]';
import { useSelector } from 'react-redux';

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
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get('service');
  const router = useRouter(); // ✅ Add router hook
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    if (selectedSlug) {
      const matchedService = categories?.find((s) => s.slug === selectedSlug);
      if (matchedService) {
        setSelectedService(matchedService);
        setTimeout(() => {
          scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  }, [selectedSlug, categories]);

  const handleCardClick = (service) => {
    setSelectedService(service);

    // ✅ Update the URL with the selected category slug
    const params = new URLSearchParams(window.location.search);
    params.set('service', service.slug);
    router.push(`?${params.toString()}`);

    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div
      className="px-10 sm:px-10 md:px-20 max-w-10xl mx-auto mt-18 pt-20 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/images/book.jpg')" }}
    >
      <div className="flex justify-center">
        <div className="2xl:w-[1000px] top-[90px] z-20 bg-white/30 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/40">
          <motion.div
            className="grid grid-cols-2 sm:flex sm:overflow-x-auto gap-4 sm:gap-5 py-2 sm:px-1 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200 scroll-smooth"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Array.isArray(categories) &&
              categories?.map((service, index) => (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  onClick={() => handleCardClick(service)}
                  className={`flex flex-col items-center justify-center
                    min-w-[100px] min-h-[100px] sm:min-w-[90px] sm:min-h-[90px]
                    rounded-xl text-center px-2
                    transition-all duration-300 ease-in-out
                    ${
                      selectedService?.name === service.name
                        ? 'border-green-600 ring-2 ring-green-300'
                        : 'border-gray-300'
                    } hover:border-green-500`}
                >
                  <div className="text-[34px] text-green-600 mb-1">
                    <img src={service.catImage} alt={service.name} height={50} width={50}/>
                  </div>
                  <div className="text-sm font-medium text-gray-800 leading-tight">
                    {service.name}
                  </div>
                </motion.button>
              ))}
          </motion.div>
        </div>
      </div>

      {selectedService && (
        <div ref={scrollRef} className="scroll-mt-[520px] mx-auto">
          <motion.div
            key={selectedService.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            <ServiceSelectorProduct />
          </motion.div>
        </div>
      )}
    </div>
  );
}
