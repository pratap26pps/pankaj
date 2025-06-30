'use client';
import React from 'react';
import Image from 'next/image';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-green-700 text-white w-full overflow-hidden text-sm">

      {/* Top Wave SVG */}
      <div className="w-full">
        <Image
          src="/images/Wave.svg"
          alt="Wave Background"
          width={1920}
          height={100}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Company About */}
        <div>
          <div className="mb-2">
            <Image
              src="/images/logo.png"
              alt="EV Service Center Logo"
              width={100}
              height={30}
              className="object-contain"
            />
          </div>
          <p className="leading-snug">
            Your trusted EV service partner. Quick repairs, genuine parts, and expert support.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-base font-semibold mb-2">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <FaMapMarkerAlt className="mr-2 mt-1" />
              123 Green Road, Lucknow, India
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              +91 9876543210
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              support@evservicecenter.com
            </li>
          </ul>
        </div>

        {/* App Download */}
        <div>
          <h3 className="text-base font-semibold mb-2">Get Our App</h3>
          <div className="flex flex-col space-y-2">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/playstore.png"
                alt="Download from Playstore"
                width={120}
                height={40}
                className="hover:opacity-90 transition duration-300"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/appstore.png"
                alt="Download from App Store"
                width={120}
                height={40}
                className="hover:opacity-90 transition duration-300"
              />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="bg-green-800 text-center py-2 text-xs">
        © 2025 EV Service Center | All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
