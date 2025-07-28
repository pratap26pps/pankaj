"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  ListChecks,
  Wrench,
  ClipboardCheck,
  CheckCircle,
  Smile,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const CircularSpinner = () => {
  const [angle, setAngle] = useState(0);

  const steps = [
    {
      label: "Booking Confirmed",
      icon: CalendarCheck,
      text: <>Your EV service<br />booking is confirmed.</>,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Initial Inspection",
      icon: ListChecks,
      text: <>Vehicle is inspected<br />for reported issues.</>,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      label: "Service in Progress",
      icon: Wrench,
      text: <>Technicians begin<br />EV maintenance work.</>,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Final Quality Check",
      icon: ClipboardCheck,
      text: <>Post-service checks<br />ensure work is complete.</>,
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "Service Completed",
      icon: CheckCircle,
      text: <>Your EV service<br />is successfully completed.</>,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Trust & Believe",
      icon: Smile,
      text: <>We value your trust<br />and satisfaction.</>,
      color: "from-teal-500 to-teal-600",
    },
  ];

  const currentStep = ((angle / 60) % steps.length + steps.length) % steps.length;
  const radius = 130;

  const handleNext = () => setAngle(prev => (prev + 60) % 360);
  const handlePrev = () => setAngle(prev => (prev - 60 + 360) % 360);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(prev => (prev + 60) % 360);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-green-50 font-[Poppins] flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-20"
      >
        <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2DAA4F] mb-2">
          Our Process....
        </div>
      </motion.div>

      {/* Mobile Prev Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePrev}
        className="sm:hidden mb-4 px-6 py-3 rounded-full border-2 text-white text-lg font-bold transition-all duration-300 flex items-center gap-2 z-10"
      >
        <ArrowUp size={20} /> Prev
      </motion.button>

      <div className="relative w-full mt-10 max-w-[380px] sm:max-w-[720px] aspect-square flex items-center justify-center">

        {/* Blue Circle */}
        <motion.div
          className="absolute w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-600 to-blue-800 border-4 border-white shadow-2xl z-0"
          animate={{ rotate: angle * 0.1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />

        {/* Green Backdrop */}
        <motion.div
          className="absolute w-[82%] h-[82%] rounded-full bg-[#2DAA4F] border-4 border-white/50 opacity-40 z-0 shadow-xl"
          style={{ transform: `rotate(${-angle}deg)` }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />

        {/* Center White Info Circle */}
        <motion.div
          className="z-10 absolute w-[28%] h-[28%] sm:w-[24%] sm:h-[24%] rounded-full bg-gradient-to-br from-white to-gray-50 flex flex-col items-center justify-center text-center p-1 sm:p-2 shadow-2xl border-4 border-white"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <h2 className="text-[12px] sm:text-[14px] font-bold text-blue-700 mb-1 leading-tight">
                {steps[currentStep].label}
              </h2>
              <p className="text-[8px] sm:text-[10px] text-black leading-tight">
                {steps[currentStep].text}
              </p>
              <div className="mt-2">
                {React.createElement(steps[currentStep].icon, {
                  size: 24,
                  className: `text-blue-600 drop-shadow-sm`,
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Fixed White Dots */}
        {steps.map((_, index) => {
          const theta = (index / steps.length) * 2 * Math.PI;
          const x = radius * Math.cos(theta);
          const y = radius * Math.sin(theta);
          return (
            <div
              key={index}
              className={`absolute w-3 h-3 rounded-full shadow-lg transition-all duration-300 ${
                currentStep === index
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 scale-150"
                  : "bg-gradient-to-r from-white to-gray-100"
              }`}
              style={{
                left: `calc(50% + ${x}px - 6px)`,
                top: `calc(50% + ${y}px - 6px)`,
              }}
            />
          );
        })}

        {/* Rotating Icons */}
        <div
          className="absolute w-full h-full rounded-full transition-transform duration-700 ease-in-out"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {steps.map((step, index) => {
            const theta = (index / steps.length) * 2 * Math.PI;
            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);
            return (
              <motion.div
                key={index}
                className={`absolute w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-white font-bold transition-all duration-300 ${
                  currentStep === index
                    ? `bg-gradient-to-br ${step.color} scale-125 ring-4 ring-white shadow-2xl`
                    : "bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg hover:shadow-xl"
                }`}
                style={{
                  left: `calc(50% + ${x}px - 1.5rem)`,
                  top: `calc(50% + ${y}px - 1.5rem)`,
                  transform: `rotate(${-angle}deg)`,
                }}
                whileHover={{ scale: currentStep === index ? 1.25 : 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {React.createElement(step.icon, {
                  size: currentStep === index ? 28 : 24,
                  className: "drop-shadow-sm",
                })}
              </motion.div>
            );
          })}
        </div>

        {/* Desktop Arrows */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="hidden sm:flex absolute -left-16 top-1/2 -translate-y-1/2 px-4 py-4 rounded-full border-4 border-white text-white text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-white hover:to-white hover:text-blue-700 shadow-2xl transition-all duration-300 z-10"
        >
          <ChevronLeft size={28} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="hidden sm:flex absolute -right-16 top-1/2 -translate-y-1/2 px-4 py-4 rounded-full border-4 border-white text-white text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-white hover:to-white hover:text-blue-700 shadow-2xl transition-all duration-300 z-10"
        >
          <ChevronRight size={28} />
        </motion.button>
      </div>

      {/* Mobile Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        className="sm:hidden mt-4 px-6 py-3 rounded-full border-2 border-white text-white text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-white hover:to-white hover:text-blue-700 shadow-lg transition-all duration-300 flex items-center gap-2 z-10"
      >
        <ArrowDown size={20} /> Next
      </motion.button>
    </div>
  );
};

export default CircularSpinner;
