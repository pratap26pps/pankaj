"use client";
import React, { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email"); // dynamic email from signup

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[idx] = value[0];
    setOtp(newOtp);
    if (idx < OTP_LENGTH - 1) inputRefs.current[idx + 1].focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[idx]) {
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) inputRefs.current[idx - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (paste.length === OTP_LENGTH) {
      setOtp(paste.split(""));
      inputRefs.current[OTP_LENGTH - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const otpValue = otp.join("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "❌ Invalid OTP. Please try again.");
        return;
      }

      toast.success("✅ OTP Verified Successfully!");
      router.push("/user/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-24">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 sm:p-10 flex flex-col items-center border border-gray-200">
        <img
          src="/images/OTP.png"
          alt="OTP Verification"
          className="w-40 sm:w-48 mb-6"
        />
        <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-2 text-center">
          OTP Verification
        </h2>
        <p className="text-sm text-gray-700 font-medium mb-5 text-center">
          Enter the 6-digit code sent to{" "}
          <span className="text-green-500 font-semibold">{email}</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <div className="flex justify-center gap-2 sm:gap-3 mb-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[idx] = el)}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                className="w-10 h-12 sm:w-12 sm:h-14 rounded-md text-xl text-green-700 font-bold text-center border-2 border-green-300 focus:outline-none focus:border-green-500 bg-gray-100 shadow-sm"
                autoFocus={idx === 0}
              />
            ))}
          </div>

          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading || otp.includes("")}
            className={`w-full py-3 rounded-lg text-white font-bold transition-all duration-200 shadow-md ${
              loading || otp.includes("")
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
