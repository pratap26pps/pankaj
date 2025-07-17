'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import connectDB  from '../lib/db';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import ServicePage from './Servicepage';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Index = () => {
  const router = useRouter();
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const mobilePosterImages = [
    '/images/banner/1.jpg',
    '/images/banner/2.jpg',
    '/images/banner/2.jpg',
    '/images/banner/4.jpg',
  ];

  const desktopPosterImages = [
    '/images/banner/1.jpg',
    '/images/banner/2.jpg',
    '/images/banner/3.jpg',
    '/images/banner/4.jpg',
  ];

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const posterImages = isMobile ? mobilePosterImages : desktopPosterImages;

  const handleClick = () => {
    router.push('/ServiceForm');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-200 via-green-500 to-green-900 bg-contain bg-no-repeat    bg-center">
      {/* ✅ Hero Carousel Section */}
      <div className="w-full flex items-start justify-center mt-2 pt-10">
        <div className="w-full">
          <Carousel plugins={[plugin.current]} className="w-full relative">
            <CarouselContent>
              {posterImages.map((image, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] rounded-xl overflow-hidden shadow-xl">
                    <Card className="w-full h-full border-0 shadow-none">
                      <CardContent className="p-0 h-full flex items-center justify-center">
                        <Image
                          src={image}
                          alt={`Poster ${index + 1}`}
                          fill
                          className="object-contain md:object-fill 2xl:object-fill  my-2 transition-all duration-500 ease-in-out hover:scale-[1.02] "
                          priority={index === 0}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-gray-800 text-black border-0 shadow-lg rounded-full w-10 h-10 sm:w-12 sm:h-12 z-10" />
            <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-gray-700 text-black border-0 shadow-lg rounded-full w-10 h-10 sm:w-12 sm:h-12 z-10" />
          </Carousel>
        </div>
      </div>

      {/* ✅ Title Section */}
      <div className="w-full md:mt-0 mb-7 px-4">
        <div className="max-w-7xl mt-6 md:-mt-2 2xl:mt-2 mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
              GNB EV Service Center
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white font-medium leading-relaxed drop-shadow-xl mt-2">
            Your Trusted Partner for{' '}
            <span className="text-black font-semibold drop-shadow-lg">E-Bikes</span>{' '}
            &{' '}
            <span className="text-black font-semibold drop-shadow-lg">Electric 3-Wheelers</span>
          </p>
        </div>
      </div>

      {/* ✅ Service Offer Section */}
      <div className="w-full bg-gradient-to-ur from-green-200 via-green-500 to-green-700 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center border-2 gap-0.5 bg-black rounded-3xl shadow-2xl overflow-hidden">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="w-full h-64 sm:h-72 md:h-full relative"
            >
              <img
                src="/images/image.png"
                alt="EV Repair"
                className="w-full h-full object-fill"
              />
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="relative h-full flex flex-col justify-center items-center md:items-end px-6 md:px-12 py-10 text-center md:text-right bg-no-repeat bg-center bg-cover"
              style={{ backgroundImage: "url('/images/service%20bannner.jpg')" }}
            >
              <div className="relative z-10 space-y-4 w-full">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-700">
                  Expert EV Repair <br /> Services Just At ₹199
                </h3>
                <p className="text-black text-sm sm:text-base md:text-base leading-relaxed">
                  For electric bikes our certified <br />
                  professionals provide reliable, fast, and <br />
                  affordable service to keep you moving.
                </p>
                <div className="w-full flex justify-center md:justify-end mt-6">
                  <button
                    onClick={handleClick}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Book a Service
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ✅ Service Component */}
      <ServicePage />
    </div>
  );
};

export default Index;
