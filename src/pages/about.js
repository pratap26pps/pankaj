"use client";
import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import GeneralQuestions from "../features/GeneralQuestions";

const AboutGNBSection = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat px-6 py-20 md:py-28 text-white justify-center items-center"
      style={{ backgroundImage: "url('/images/Book Demo Page.jpg')" }} // Replace with your background image
    >
      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-black/50 z-" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center md:text-left gap-12 mt-32 md:flex-row">
        {/* Left - Info */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-9xl  md:text-5xl font-extrabold leading-tight text-green-300">
            About GNB EV Service Center
          </h1>
          <p className="lg:text-lg sm:text-sm text-gray-100 leading-relaxed">
            GNB (Green N' Bold) EV Service Center is your trusted destination
            for electric vehicle sales and service. Specializing in electric
            bikes and 3-wheelers, we offer expert servicing, repairs, and
            genuine part replacements — ensuring a smooth and sustainable
            journey ahead.
          </p>
          <div className="space-y-4 text-md text-gray-200">
            <div className="flex items-start gap-3">
              <MapPin className="text-green-400 mt-1" />
              <span>
                Near Main Road, Sector 15, GNB Nagar, Lucknow, UP - 226010
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-green-400 mt-1" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="text-green-400 mt-1" />
              <span>support@gnbev.in</span>
            </div>
          </div>
        </div>

        {/* Right - Logo & Map */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6">
          <div className="w-full h-[500px] md:h-[400px] rounded-2xl overflow-hidden  shadow-lg">
            <iframe
              title="GNB EV Service Center Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.2323019126064!2d80.9462!3d26.8616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2e2c2!2sGNB+EV+Service+Center!5e0!3m2!1sen!2sin!4v1719999999999"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGNBSection;
