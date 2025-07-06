"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Navbaar from "@/features/Navbaar";

const Index = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  // Poster images array
  const posterImages = [
    "/images/banner/1.jpg",
    "/images/banner/2.jpg",
    "/images/banner/3.jpg",
      "/images/banner/4.jpg",
    "/images/banner/5.jpg",
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-200 via-green-500 to-green-900">


      {/* Main Content with padding for navbar */}
      <div className="-mt-[99px] w-full flex items-center justify-center min-h-screen">
        <div className="w-full ">
          <Carousel plugins={[plugin.current]} className="w-full">
            <CarouselContent>
              {posterImages.map((image, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl">
                    <Card className="w-full h-full border-0 shadow-2xl">
                      <CardContent className="p-0 h-full flex items-center justify-center">
                        <img
                          src={image}
                          alt={`Poster ${index + 1}`}
                          className="w-full h-full object-cover object-center"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons positioned on sides */}
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black border-0 shadow-lg rounded-full w-12 h-12" />
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black border-0 shadow-lg rounded-full w-12 h-12" />
          </Carousel>
        </div>
      </div>

      {/* Welcome Section - Clean Design */}
      <div className="w-full -mt-32 mb-7">
        <div className="max-w-7xl mx-auto text-center">
          {/* Welcome Emoji and Main Title */}
          <div className="">
             <h1 className="text-5xl md:text-7xl font-bold text-white  leading-tight drop-shadow-2xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                GNB EV Service Center
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-white font-medium  leading-relaxed drop-shadow-xl">
            Your Trusted Partner for{' '}
            <span className="text-black font-semibold drop-shadow-lg">E-Bikes</span >{' '}
            &{' '}
            <span className="text-black font-semibold drop-shadow-lg">Electric 3-Wheelers</span>
          </p>

          {/* Call to Action Button */}
          <div className="mt-1">
            <button className="bg-blue-600 mt-3 *:text-white px-12 py-4 rounded-full text-xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
              Book Service
            </button>
          </div>
        </div>
      </div>

      {/* Additional content below carousel */}
      <div className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Welcome to EV Repair Services
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            We provide comprehensive electric vehicle repair and maintenance
            services. Our expert technicians ensure your EV runs smoothly and
            efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
