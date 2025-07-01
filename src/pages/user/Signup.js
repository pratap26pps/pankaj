'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'lottie-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    vehicle: '',
    password: '',
    confirmPassword: '',
    types:""
  });

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/Animations/signup.json')  // ✅ Correct animation path
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
    // ✅ Signup form submit logic goes here
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const handleGoogleSignup = () => {
    console.log('Google Signup Clicked');
    // ✅ Google signup logic
  };

  return (
    <div className=" bg-green-700 flex flex-col-reverse overflow-hidden h-[900px]  lg:flex-row items-center justify-around px-4 pt-44  lg:-mb-34">

      {/* Signup Card */}
      <div className="bg-gray-300 shadow-xl lg:mb-24  sm:mb-0 rounded-2xl px-6 py-2 sm:py-8 sm:pb-12 w-full max-w-md">
        {/* Top: Logo + Heading */}
        <div className="flex items-center justify-between -mt-6 mb-4">
          <Image src="/images/logo.png" alt="Signup Logo" width={70} height={70} />
          <h2 className="text-2xl font-extrabold text-gray-800">Create Account</h2>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-3 -mt-6 mb-0">
          {/* First & Last Name */}
          <div className="flex gap-2.5">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Vehicle */}
          <input
            type="text"
            name="vehicle"
            placeholder="Vehicle Details"
            value={formData.vehicle}
            onChange={handleChange}
            autoComplete="off"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <div className=" gap-2.5 flex flex-row">
            <div  className='flex flex-col items-end relative justify-center '>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-1.5  flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
                  </div>
          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          </div>

                 <select className="px-4 py-3 rounded-md w-72 text-black">
  <option selected disabled>Select Type</option>
  <option value="partner">Partner</option>
  <option value="service-center">Service Center</option>
                 </select>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
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
          <a href="/Login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
       {/* Left Side Animation */}
      {animationData && (
        <div className="w-full max-w-sm mb-6 lg:mb-0 lg:mr-10">
          <Lottie animationData={animationData} loop={true} />
        </div>
      )}

    </div>
  );
};

export default Signup;
