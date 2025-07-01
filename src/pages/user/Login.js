'use client';
import React, { useState ,useEffect } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'lottie-react';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [animationData, setAnimationData] = useState(null);
 const [animationData1 ,setAnimationData1] =useState(null);
  useEffect(() => {
    fetch('/Animations/hello.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error(error));
  }, []);
    useEffect(() => {
    fetch('/Animations/Login.json')
      .then((response) => response.json())
      .then((data) => setAnimationData1(data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Login logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    console.log('Google Login Clicked');
    // Google OAuth logic here
  };

  return (
    <div className="min-h-screen flex flex-row items-center justify-around  s mx-auto    bg-green-700 lg:pt-44 pb-7  px-4 pt-34 ">
      {/* Login Card */}
      <div className="bg-gray-300 shadow-xl rounded-2xl px-5 py-3.5 w-full max-w-md">
        {/* Top Logo + Welcome */}
        <div className="flex justify-between items-center mb-1">
          <Image src="/images/logo.png" alt="GNB Logo" width={130} height={100} />
          <h2 className="text-2xl flex flex-col mt-1 pt-2.5 items-center justify-center font-extrabold text-gray-700">Welcome Back !
   {animationData && (
              <div className="w-32 h-32">
                <Lottie animationData={animationData} loop={true} />
              </div>
            )}

          </h2>
        </div>

        {/* Heading */}
        <h3 className="text-2xl font-bold text-center mb-6">Login to Your Account</h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
               autoComplete="off"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                 autoComplete="off"x
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg bg-gray-50 transition"
        >
          <FaGoogle size={18} className="blue" />
          Login with Google
        </button>

        {/* Signup Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/user/Signup" className="text-green-600 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>



       {/* Left Side Animation */}
      {animationData && (
        <div className="w-full max-w-sm mb-6 lg:mb-0 lg:mr-10">
          <Lottie animationData={animationData1} loop={true} />
        </div>
      )}

    </div>
  );
};

export default Login;
