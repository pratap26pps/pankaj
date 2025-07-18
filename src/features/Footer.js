'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white text-sm relative w-full overflow-hidden">

      {/* Top Wave SVG */}
      <div className="w-full">
        <Image
          src="/images/Wave.svg"
          alt="Wave Background"
          width={120}
          height={10}
          className="w-full h-[320px] object-cover"
          priority
        />
      </div>

      {/* App Download Promo Section */}
      <div className="max-w-7xl mx-auto  flex flex-col md:flex-row items-center  gap-11   text-white rounded-lg  mb-6 mt-4">
        {/* Text */}
        <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-0">
          For a better experience, download our EV Service Center App now
        </h3>

        {/* Buttons */}
        <div className="flex space-x-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/playstore.avif"
              alt="Get it on Google Play"
              width={150}
              height={50}
              className="hover:scale-105 transition-transform duration-300"
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/appstore.avif"
              alt="Download on the App Store"
              width={150}
              height={50}
              className="hover:scale-105 transition-transform duration-300"
            />
          </a>
        </div>
         <div className='flex flex-col gap-3.5'>
          <h4 className="font-semibold mt-4 text-lg">Follow Us</h4>
          <div className="flex space-x-4">
            {[
              { icon: <FaFacebookF />, link: 'https://www.facebook.com/' },
              { icon: <FaInstagram />, link: 'https://www.instagram.com/' },
              { icon: <FaTwitter />, link: 'https://twitter.com/' },
              { icon: <FaLinkedin />, link: 'https://www.linkedin.com/' },
              { icon: <FaYoutube />, link: 'https://www.youtube.com/' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-green-800 hover:bg-green-600 transform hover:scale-110 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 relative z-10">

        {/* About */}
        <div className='flex flex-col gap-3.5 -mt-18'>
          <Image
            src="/images/logo (3).png"
            alt="EV Service Center Logo"
            width={220}
            height={140}
            className="mb-3"
          />
          <p>© 2025 EV Service Center </p>
          <p className="leading-relaxed">
            Fast, affordable, and reliable EV maintenance and repair services.
            Trusted by thousands across Lucknow and beyond.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Company</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/services" className="hover:underline">Our Services</Link></li>
            <li><Link href="/careers" className="hover:underline">Careers</Link></li>
            <li><Link href="/franchise" className="hover:underline">Franchise</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
   {/** Avlibable on */}
   <div className="">
      <h4 className="font-semibold text-lg mb-3">Available in:</h4>
      <ul className="space-y- text-gray-200">
        <li>Bangalore</li>
        <li>Gurgaon</li>
        <li>Hyderabad</li>
        <li>Delhi</li>
        <li>Mumbai</li>
        <li>Pune</li>
      </ul>

      {/* Dropdown */}
      <div className="mt-3">
        <button
          className="w-full px-1 py-2 text-start pl-2.5 bg-green-800 text-white rounded-md border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          69 cities
          {/* You can later map your full cities list here */}
        </button>
      </div>
    </div>
        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Contact Us</h4>
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

        {/* Social Links */}

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-600 py-3 px-4 bg-green-800 text-xs text-center">
        <p>© 2025 EV Service Center. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;
