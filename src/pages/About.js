"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat px-4 py-44"
      style={{ backgroundImage: "url('/images/Book Demo Page.jpg')" }}
    >
      {/* 🔳 Dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0 " />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* 🟩 LEFT: Info Card with animation */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/10 backdrop-blur-md border border-emerald-500/30 shadow-2xl rounded-3xl">
            <CardContent className="p-8 space-y-8 text-white">
              <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-300 drop-shadow-lg">
                About GNB EV Service Center
              </h2>

              <p className="text-gray-100 text-base leading-relaxed tracking-wide">
                <span className="text-emerald-400 font-semibold">GNB (Green N' Bold)</span> EV Service Center is your go-to place for trusted electric bike and e-rickshaw servicing. We offer expert diagnostics, repairs, and genuine part replacements.
              </p>

              <div className="space-y-4 text-sm md:text-base">
                <div className="flex gap-3 items-start">
                  <MapPin className="text-emerald-400 mt-1" />
                  <span>Sector 15, GNB Nagar, Lucknow, UP - 226010</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Phone className="text-emerald-400 mt-1" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Mail className="text-emerald-400 mt-1" />
                  <span>support@gnbev.in</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 🗺️ RIGHT: Google Map Embed Card with animation */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/10 backdrop-blur-md border border-emerald-500/30 shadow-2xl rounded-3xl">
            <CardContent className=" ">
              <div className="w-full h-[300px] md:h-[420px]">
                <iframe
                  title="GNB EV Service Center Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.009330664957!2d80.94615937583907!3d26.86948606292287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2cba9ad5b81%3A0xa6c663f3ec67497a!2sGNB%20EV%20Service%20Center!5e0!3m2!1sen!2sin!4v1720272989999!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
