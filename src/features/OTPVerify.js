'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const OTPVerify = ({ mobile = '9876543210', onVerifySuccess = () => {} }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (i, val) => {
    if (/^[0-9]?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[i] = val;
      setOtp(newOtp);
      if (val && i < 5) {
        const nextInput = document.getElementById(`otp-${i + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) return alert('Enter 6-digit OTP');

    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, otp: code }),
    });

    const result = await res.json();

    if (result.success) {
      alert('✅ OTP Verified!');
      onVerifySuccess();
    } else {
      alert('❌ Invalid OTP. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-emerald-50 to-lime-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="w-full max-w-md"
      >
        <Card className="rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-lime-200 backdrop-blur-xl bg-white/80">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-2">
              <Sparkles className="text-green-500 w-6 h-6 mr-2 animate-pulse" />
              <CardTitle className="text-3xl font-extrabold text-emerald-600">
                Verify Your OTP
              </CardTitle>
            </div>
            <p className="text-gray-600 text-sm">
              A 6-digit OTP has been sent to <strong>+91 {mobile}</strong>
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-2 my-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-14 text-center font-bold text-lg border-emerald-300 shadow-sm focus-visible:ring-2 focus-visible:ring-lime-500 bg-white rounded-xl"
                />
              ))}
            </div>

            <Button
              onClick={handleVerify}
              className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 text-white text-md py-3 rounded-xl font-semibold shadow-lg hover:brightness-110 transition-all duration-300"
            >
              🔐 Confirm OTP
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OTPVerify;
