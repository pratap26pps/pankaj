import React from 'react';
import react from 'react';
const Others = () => {
  return (
    <div className="min-h-screen  flex items-center ml-33 -mt-20 p-4">
      <div className="max-w-sm hadow-xl bg-white/30 backdrop-blur-md rounded-2xl border border-white/40   shadow-lg overflow-hidden">
        {/* Video Section */}
        <div className="w-full h-56">
          <video
            src="https://youtube.com/shorts/5YL2Nd_7qJM?si=kwIyhgFLRLP-PN7M"
            controls
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            Service Center Expert Training
          </h2>

          {/* Price */}
          <p className="text-lg font-semibold text-gray mb-2">
            ₹19,999
          </p>

          <p className="text-sm text-gray-600 mb-4">
            Learn how to handle EV services professionally with hands-on training modules.
          </p>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Others;
