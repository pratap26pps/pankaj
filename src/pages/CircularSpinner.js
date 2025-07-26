import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CircularSpinner = () => {
  const [angle, setAngle] = useState(0);

  const steps = [
    { label: "Collect Waste", icon: "🗑️", text: <>Waste is collected<br />from various locations.</> },
    { label: "Sort Waste", icon: "🔍", text: <>Waste is sorted into<br />recyclables and non-recyclables.</> },
    { label: "Shred Waste", icon: "🧨", text: <>Sorted waste is<br />shredded for processing.</> },
    { label: "Burn Waste", icon: "🔥", text: <>Waste is incinerated<br />at high temperatures.</> },
    { label: "Collect Ash", icon: "🪨", text: <>Incinerator bottom ash<br />(IBAA) is collected.</> },
    { label: "Process Ash", icon: "⚙️", text: <>IBAA is processed<br />to remove impurities.</> },
    { label: "Sell IBAA", icon: "🏢", text: <>IBAA is sold as low<br />carbon cement additive.</> },
    { label: "Concrete Products", icon: "🧱", text: <>IBAA is used in<br />concrete manufacturing.</> },
  ];

  const currentStep = ((angle / 45) % 8 + 8) % 8;
  const radius = 130;

  const handleNext = () => setAngle(prev => (prev + 45) % 360);
  const handlePrev = () => setAngle(prev => (prev - 45 + 360) % 360);

  return (
    <div className="min-h-screen bg-green-50 font-[Poppins] flex flex-col items-center justify-center px-4 py-10 relative">
      
      {/* Heading */}
      <h1 className="absolute top-6 left-6 text-[40px] sm:text-4xl font-extrabold text-green-600">
        Our Process
      </h1>

      {/* Top Button (Mobile) */}
      <button
        onClick={handlePrev}
        className="sm:hidden mb-4 px-4 py-2 rounded-full border-2 border-white text-white text-xl font-bold bg-blue-700 hover:bg-white hover:text-blue-700 shadow transition"
      >
        ⬆ Prev
      </button>

      <div className="relative w-full max-w-[380px] sm:max-w-[720px] aspect-square flex items-center justify-center">

        {/* Outer Blue Shell */}
        <div className="absolute w-[65%] h-[65%] rounded-full bg-blue-700 border-4 border-black shadow-lg z-0"></div>

        {/* Overlapping Green Shell */}
        <div
          className="absolute w-[88%] h-[88%] rounded-full bg-green-600 border-4 border-black opacity-30 z-0"
          style={{ transform: `rotate(${-angle}deg)` }}
        ></div>

        {/* Inner White Shell with AnimatePresence for smooth transition */}
        <div className="z-10 absolute w-[28%] h-[28%] rounded-full bg-white flex flex-col items-center justify-center text-center p-1 sm:p-2 shadow">
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
              <div className="text-xl sm:text-lg mt-1">{steps[currentStep].icon}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Icon Dots */}
        {steps.map((_, index) => {
          const theta = (index / steps.length) * 2 * Math.PI;
          const x = radius * Math.cos(theta);
          const y = radius * Math.sin(theta);
          return (
            <div
              key={index}
              className="absolute w-2.5 h-2.5 rounded-full bg-white shadow"
              style={{
                left: `calc(50% + ${x}px - 3px)`,
                top: `calc(50% + ${y}px - 3px)`
              }}
            ></div>
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
              <div
                key={index}
                className={`absolute w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white text-xl sm:text-2xl font-bold
                ${currentStep === index ? 'bg-blue-600 scale-125 ring-4 ring-white shadow-lg' : 'bg-blue-400 shadow'}`}
                style={{
                  left: `calc(50% + ${x}px - 1.5rem)`,
                  top: `calc(50% + ${y}px - 1.5rem)`,
                  transform: `rotate(${-angle}deg)`
                }}
              >
                {step.icon}
              </div>
            );
          })}
        </div>

        {/* Side Buttons (Only large screens) */}
        <button
          onClick={handlePrev}
          className="hidden sm:flex absolute -left-16 top-1/2 -translate-y-1/2 px-4 py-4 rounded-full border-4 border-white text-white text-2xl font-bold bg-blue-700 hover:bg-white hover:text-blue-700 shadow-md transition"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="hidden sm:flex absolute -right-16 top-1/2 -translate-y-1/2 px-4 py-4 rounded-full border-4 border-white text-white text-2xl font-bold bg-blue-700 hover:bg-white hover:text-blue-700 shadow-md transition"
        >
          ›
        </button>
      </div>

      {/* Bottom Button (Mobile) */}
      <button
        onClick={handleNext}
        className="sm:hidden mt-4 px-4 py-2 rounded-full border-2 border-white text-white text-xl font-bold bg-blue-700 hover:bg-white hover:text-blue-700 shadow transition"
      >
        ⬇ Next
      </button>
    </div>
  );
};

export default CircularSpinner;
