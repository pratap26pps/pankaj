import React, { useState } from 'react';

const CircularSpinner = () => {
  const [angle, setAngle] = useState(0);

    const steps = [
      { label: "Collect Waste", icon: "🗑️", text: <>Waste is collected<br/>from various locations.</> },
      { label: "Sort Waste", icon: "🔍", text: <>Waste is sorted into<br/>recyclables and non-recyclables.</> },
      { label: "Shred Waste", icon: "🧨", text: <>Sorted waste is<br/>shredded for processing.</> },
      { label: "Burn Waste", icon: "🔥", text: <>Waste is incinerated<br/>at high temperatures.</> },
      { label: "Collect Ash", icon: "🪨", text: <>Incinerator bottom ash<br/>(IBAA) is collected.</> },
      { label: "Process Ash", icon: "⚙️", text: <>IBAA is processed<br/>to remove impurities.</> },
      { label: "Sell IBAA", icon: "🏢", text: <>IBAA is sold as low<br/>carbon cement additive.</> },
      { label: "Concrete Products", icon: "🧱", text: <>IBAA is used in<br/>concrete manufacturing.</> },
    ];

  const currentStep = ((angle / 45) % 8 + 8) % 8;
  const radius = 110;

  const handleNext = () => setAngle(prev => (prev + 45) % 360);
  const handlePrev = () => setAngle(prev => (prev - 45 + 360) % 360);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 py-6 2xl-my-40 sm:py-10 space-y-2">

      {/* Top Button for Mobile */}
      <button
        onClick={handlePrev}
        className="sm:hidden mb-2 px-4 py-2 rounded-full border-2 border-white text-white text-xl font-bold bg-blue-700 hover:bg-white hover:text-blue-700 shadow transition"
      >
        ⬆ Prev
      </button>

      <div className="relative w-full max-w-[370px] sm:max-w-[700px] aspect-square flex items-center justify-center">

        {/* Background Shell Opposite Rotating */}
        <div
          className="absolute w-[92%] h-[92%] bg-green-600 rounded-full border-[10px] border-black opacity-30"
          style={{ transform: `rotate(${-angle}deg)` }}
        ></div>

        {/* Decorative Inner Ring */}
        <div className="absolute w-[60%] h-[60%] rounded-full border-2 bg-blue-600 border-green-800"></div>

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

        {/* Rotating Spinner Icons */}
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
                className={`absolute w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white font-bold text-lg sm:text-xl
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

        {/* Center Description */}
        <div className="z-10 text-center text-white max-w-[85%] px-3 sm:px-6">
          <h2 className="text-sm sm:text-xl font-bold mb-1 sm:mb-3">
            {steps[currentStep].label}
          </h2>
          <p className="text-xs sm:text-base leading-relaxed font-medium opacity-90">
            {steps[currentStep].text}
          </p>
        </div>

        {/* Left/Right Buttons for Desktop */}
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

      {/* Bottom Button for Mobile */}
      <button
        onClick={handleNext}
        className="sm:hidden mt-2 px-4 py-2 rounded-full border-2 border-white text-white text-xl font-bold bg-blue-700 hover:bg-white hover:text-blue-700 shadow transition"
      >
        ⬇ Next
      </button>
    </div>
  );
};

export default CircularSpinner;
