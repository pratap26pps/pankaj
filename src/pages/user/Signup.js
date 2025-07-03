'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'lottie-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [document, setDocument] = useState(null);
  const [animationData, setAnimationData] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    vehicle: '',
    password: '',
    confirmPassword: '',
    userType: '',
  });

  useEffect(() => {
    fetch('/Animations/Signupmain.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Animation load error:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData);
    console.log('Selected Document:', document);
    // ✅ Add your API call here
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const handleGoogleSignup = () => console.log('Google Signup Clicked');

  return (
    <div className="bg-green-700 flex items-center justify-center px-4 sm:px-8 lg:px-20 py-8 sm:py-12 lg:py-24 pt-20 sm:pt-24 lg:pt-32 overflow-hidden min-h-screen">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 w-full max-w-xs sm:max-w-2xl lg:max-w-6xl">
        {/* Signup Card */}
        <div className="bg-gray-300 shadow-xl rounded-2xl px-4 sm:px-6 py-6 w-full max-w-xs sm:max-w-md lg:max-w-lg mt-8 sm:mt-12 lg:mt-16">
          {/* Top: Logo + Heading */}
          <div className="flex items-center justify-between mb-4">
            <Image src="/images/logo (3).png" alt="Signup Logo" width={60} height={60} className="sm:w-[80px] sm:h-[80px]" style={{ height: 'auto', width: 'auto' }} />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-green-800 tracking-tight drop-shadow-xl">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5">
            {/* Name */}
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full sm:w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full sm:w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {/* Mobile */}
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {/* Vehicle */}
            <input
              type="text"
              name="vehicle"
              placeholder="Vehicle Details"
              value={formData.vehicle}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {/* Passwords */}
            <div className="flex gap-2 flex-col sm:flex-row">
              {/* Password */}
              <div className="relative w-full sm:w-1/2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Confirm Password */}
              <div className="relative w-full sm:w-1/2 mt-2 sm:mt-0">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {/* Forgot Password */}
            <div className="flex justify-end -mt-1">
              <a href="/user/forgot-password" className="text-xs text-green-600 hover:underline font-medium">Forgot Password?</a>
            </div>
            {/* User Type */}
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="" disabled>Select Type</option>
              <option value="partner">Partner</option>
              <option value="service-center">Service Center</option>
            </select>
            {/* Document Upload */}
            <div className="flex flex-col">
              <label className="text-xs mb-1 font-medium text-gray-700">Upload Your Picture</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  // onClick={() => document.getElementById('fileInput').click()}
                  className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-xs"
                >
                  Choose File
                </button>
                <span className="text-xs text-gray-600">
                  {document ? document.name : "No file chosen"}
                </span>
              </div>
              <input
                type="file"
                id="fileInput"
                name="document"
                accept="image/*"
                // onChange={(e) => setDocument(e.target.files[0])}
                className="hidden"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-3 rounded-2xl font-bold hover:from-green-600 hover:to-green-800 shadow-xl transition text-lg tracking-wide transform hover:scale-105 focus:scale-105 duration-200"
            >
              Signup
            </button>
          </form>
          {/* Google Signup */}
          <button
            onClick={handleGoogleSignup}
            className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-400 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            <FaGoogle size={16} />
            Sign up with Google
          </button>
          {/* Login Link */}
          <p className="text-xs text-center text-gray-700 mt-2">
            Already have an account?{' '}
            <a href="/user/Login" className="text-green-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
        {/* Animation Side */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col items-center justify-center">
          {animationData && (
            <Lottie animationData={animationData} loop={true} className="w-full h-auto" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
