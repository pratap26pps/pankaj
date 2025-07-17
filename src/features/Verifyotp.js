'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const OTPVerify = ({ mobile, onVerifySuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (i, val) => {
    if (/^[0-9]?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[i] = val;
      setOtp(newOtp);
      if (val && i < 5) document.getElementById(`otp-${i + 1}`).focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) return alert("Enter 6-digit OTP");

    // ✅ Call backend API to verify OTP
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, otp: code }),
    });

    const result = await res.json();

    if (result.success) {
      alert("✅ OTP Verified!");
      onVerifySuccess(); // Proceed to account creation step
    } else {
      alert("❌ Invalid OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-1">📲 Verify OTP</h2>
        <p className="text-center text-gray-600 mb-6">
          OTP sent to <strong>+91 {mobile}</strong>
        </p>

        <div className="flex justify-between gap-1 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-10 h-10 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
        >
          ✅ Verify OTP
        </button>
      </motion.div>
    </div>
  );
};

export default OTPVerify;
