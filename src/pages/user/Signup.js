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
    fetch('/Animations/signup.json')
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
    <div className="bg-green-700 flex flex-col-reverse  lg:flex-row items-center justify-around px-4 pt-44 overflow-hidden lg:-mb-34">

      {/* Signup Card */}
      <div className="bg-gray-300 mb-44 shadow-xl rounded-2xl px-4 py-3 w-full max-w-md">
        {/* Top: Logo + Heading */}
        <div className="flex items-center justify-between mb-4">
          <Image src="/images/logo (3).png" alt="Signup Logo" width={70} height={70} />
          <h2 className="text-2xl font-extrabold text-gray-800">Create Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div className="flex gap-2.5">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Vehicle */}
          <input
            type="text"
            name="vehicle"
            placeholder="Vehicle Details"
            value={formData.vehicle}
            onChange={handleChange}
            autoComplete="off"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Passwords */}
          <div className="flex gap-2.5">
            {/* Password */}
            <div className="relative w-1/2">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative w-1/2">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* User Type */}
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select Type</option>
            <option value="partner">Partner</option>
            <option value="service-center">Service Center</option>
          </select>

          {/* Document Upload */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-gray-700">Upload Your Picture</label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                // onClick={() => document.getElementById('fileInput').click()} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Choose File
              </button>
              <span className="text-sm text-gray-600">
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

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Create Account
          </button>
        </form>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-400 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
        >
          <FaGoogle size={18} />
          Sign up with Google
        </button>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-700 mt-4">
          Already have an account?{' '}
          <a href="/user/Login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>

      {/* Lottie Animation */}
      {animationData && (
        <div className="w-auto h-[800px] max-w-sm sm:pt-44 lg:mb-0 lg:mr-10">
          <Lottie animationData={animationData} loop={true} />
        </div>
      )}
    </div>
  );
};

export default Signup;
