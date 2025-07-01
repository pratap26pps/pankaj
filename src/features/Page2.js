'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '../components/ui/button';

const Page2 = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/images/Book Demo Page.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side Content */}
        <div className="text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Your Company Name</h1>
          <p className="text-lg md:text-xl max-w-md">
            We provide the best services for your vehicle. Fast, reliable, and affordable.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl shadow-lg">
            Book Service
          </Button>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center">
          <Image
            src="/images/hero-car.png"
            alt="Hero Car Image"
            width={600}
            height={400}
            className="object-contain rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Page2;
