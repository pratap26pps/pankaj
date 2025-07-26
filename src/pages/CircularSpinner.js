import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Search, 
  Scissors, 
  Flame, 
  Mountain, 
  Settings, 
  Building2, 
  Blocks,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const CircularSpinner = () => {
  const [angle, setAngle] = useState(0);

  const steps = [
    { label: "Collect Waste", icon: Trash2, text: <>Waste is collected<br />from various locations.</>, color: "from-red-500 to-red-600" },
    { label: "Sort Waste", icon: Search, text: <>Waste is sorted into<br />recyclables and non-recyclables.</>, color: "from-blue-500 to-blue-600" },
    { label: "Shred Waste", icon: Scissors, text: <>Sorted waste is<br />shredded for processing.</>, color: "from-purple-500 to-purple-600" },
    { label: "Burn Waste", icon: Flame, text: <>Waste is incinerated<br />at high temperatures.</>, color: "from-orange-500 to-orange-600" },
    { label: "Collect Ash", icon: Mountain, text: <>Incinerator bottom ash<br />(IBAA) is collected.</>, color: "from-gray-500 to-gray-600" },
    { label: "Process Ash", icon: Settings, text: <>IBAA is processed<br />to remove impurities.</>, color: "from-indigo-500 to-indigo-600" },
    { label: "Sell IBAA", icon: Building2, text: <>IBAA is sold as low<br />carbon cement additive.</>, color: "from-teal-500 to-teal-600" },
    { label: "Concrete Products", icon: Blocks, text: <>IBAA is used in<br />concrete manufacturing.</>, color: "from-emerald-500 to-emerald-600" },
  ];

  const currentStep = ((angle / 45) % 8 + 8) % 8;
  const radius = 130;

  const handleNext = () => setAngle(prev => (prev + 45) % 360);
  const handlePrev = () => setAngle(prev => (prev - 45 + 360) % 360);

  return (
    <div className="min-h-screen bg-green-50   font-[Poppins] flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      
      
      {/* Centered Heading */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-20"
      >
        <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-600  ">
          Our Process
        </div>
      </motion.div>

      {/* Top Button (Mobile) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePrev}
        className="sm:hidden mb-4 px-6 py-3 rounded-full border-2   text-white text-lg font-bold  transition-all duration-300 flex items-center gap-2 z-10"
      >
        <ArrowUp size={20} /> Prev
      </motion.button>

      <div className="relative w-full max-w-[380px] sm:max-w-[720px] aspect-square flex items-center justify-center">

        {/* Outer Blue Shell with gradient */}
        <motion.div 
          className="absolute w-[65%] h-[65%] rounded-full bg-gradient-to-br from-blue-600 to-blue-800 border-4 border-white shadow-2xl z-0"
          animate={{ rotate: angle * 0.1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        ></motion.div>

        {/* Overlapping Green Shell with enhanced gradient */}
        <motion.div
          className="absolute w-[88%] h-[88%] rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-white/50 opacity-40 z-0 shadow-xl"
          style={{ transform: `rotate(${-angle}deg)` }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        ></motion.div>

        {/* Inner White Shell with enhanced styling */}
        <motion.div 
          className="z-10 absolute w-[28%] h-[28%] rounded-full bg-gradient-to-br from-white to-gray-50 flex flex-col items-center justify-center text-center p-1 sm:p-2 shadow-2xl border-4 border-white"
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
                  className: `text-blue-600 drop-shadow-sm` 
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Icon Dots */}
        {steps.map((_, index) => {
          const theta = (index / steps.length) * 2 * Math.PI;
          const x = radius * Math.cos(theta);
          const y = radius * Math.sin(theta);
          return (
            <motion.div
              key={index}
              className={`absolute w-3 h-3 rounded-full shadow-lg transition-all duration-300 ${
                currentStep === index 
                  ? 'bg-gradient-to-r from-blue-400 to-blue-600 scale-150' 
                  : 'bg-gradient-to-r from-white to-gray-100'
              }`}
              style={{
                left: `calc(50% + ${x}px - 6px)`,
                top: `calc(50% + ${y}px - 6px)`
              }}
              animate={{ scale: currentStep === index ? 1.5 : 1 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
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
                    : 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg hover:shadow-xl'
                }`}
                style={{
                  left: `calc(50% + ${x}px - 1.5rem)`,
                  top: `calc(50% + ${y}px - 1.5rem)`,
                  transform: `rotate(${-angle}deg)`
                }}
                whileHover={{ scale: currentStep === index ? 1.25 : 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {React.createElement(step.icon, { 
                  size: currentStep === index ? 28 : 24, 
                  className: "drop-shadow-sm" 
                })}
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Side Buttons (Only large screens) */}
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

      {/* Bottom Button (Mobile) */}
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
