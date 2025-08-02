"use client";
import React, { useState,useEffect } from "react";
import { Eye, EyeOff, Lock, Sun, Moon, Shield, CheckCircle } from "lucide-react";
import { toast } from 'sonner';
import { useRouter } from "next/router";
export default function ResetPasswordPage() {
  
  const router = useRouter();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);

    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { token, email } = router.query;
      setToken(token);
      setEmail(email);
    }
  }, [router.isReady]);

  if (!token || !email) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center text-lg font-medium text-gray-700">
        Loading...
      </div>
    );
  }
  const togglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be 8+ chars, with uppercase, lowercase, number & symbol."
      );
      return;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });
      
      console.log("response log", res);
      
      let data = {};
      
      if (res.ok) {
        data = await res.json();
        toast.success("Password reset successful. Please log in.");
        router.push("/authpage");
      } else {
        const errMessage = await res.text(); // try to read raw response
        toast.error("Reset failed: " + errMessage);
        console.log("data", errMessage);
      }
      
    } catch (err) {
      console.error("Network or server error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
    
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Password strength indicators
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[\W_]/.test(password)) strength += 1;
    return strength;
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen transition-all duration-500 relative bg-green-50 py-16 overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
     

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-xl  `}
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: 0.1,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-40">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
            isDark 
              ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 shadow-lg' 
              : 'bg-white text-gray-800 hover:bg-gray-100 shadow-lg'
          }`}
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div
          className={`w-full max-w-md transition-all duration-500 transform ${
            isDark ? 'bg-white text-black' : 'bg-white/90'
          } backdrop-blur-xl rounded-3xl shadow-2xl border ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          } hover:shadow-3xl`}
        >
          
          {/* Header */}
          <div className="text-center p-8 pb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
              isDark ? 'bg-blue-600' : 'bg-purple-600'
            }`}>
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h1 className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-black' : 'text-gray-800'
            }`}>
              Reset Password
            </h1>
            
            <p className={`${
              isDark ? 'text-gray-900' : 'text-gray-100'
            } text-sm`}>
              Create a new secure password for your account
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="px-8 space-y-6">
            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 focus:scale-105 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:bg-gray-600 placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-800 focus:border-purple-400 focus:bg-white placeholder-gray-500'
                } focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-blue-400' : 'focus:ring-purple-400'
                } focus:ring-opacity-50`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={`absolute right-4 top-4 transition-colors duration-300 ${
                  isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        i < passwordStrength
                          ? i < 2 ? 'bg-red-500' : i < 4 ? 'bg-yellow-500' : 'bg-green-500'
                          : isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-sm ${
                  passwordStrength < 3 ? 'text-red-500' : 
                  passwordStrength < 5 ? 'text-yellow-500' : 'text-green-500'
                }`}>
                  {passwordStrength < 3 ? 'Weak' : 
                   passwordStrength < 5 ? 'Medium' : 'Strong'} password
                </p>
              </div>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 focus:scale-105 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:bg-gray-600 placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-800 focus:border-purple-400 focus:bg-white placeholder-gray-500'
                } focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-blue-400' : 'focus:ring-purple-400'
                } focus:ring-opacity-50`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className={`absolute right-4 top-4 transition-colors duration-300 ${
                  isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {confirmPassword && password === confirmPassword && (
                <CheckCircle className="absolute right-12 top-4 w-5 h-5 text-green-500" />
              )}
            </div>

            {/* Error Message */}
            {passwordError && (
              <div className={`p-3 rounded-lg border ${
                isDark ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-50 border-red-300 text-red-600'
              }`}>
                <p className="text-sm">{passwordError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              } shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Resetting...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Reset Password</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className={`text-center p-6 border-t mt-3 ${
            isDark ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <p className={`text-sm ${
              isDark ? 'text-gray-800' : 'text-gray-100'
            }`}>
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => router.push("/authpage")}
                className={`font-medium  cursor-pointer transition-colors duration-300 ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

     
    </div>
  );
}