'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const [animationData, setAnimationData] = useState(null);
  const [animationData1, setAnimationData1] = useState(null);

  useEffect(() => {
    fetch('/Animations/hello.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      // Removed debug catch, handle error meaningfully
      .catch(() => setAnimationData(null));
  }, []);

  useEffect(() => {
    fetch('/Animations/Login.json')
      .then((response) => response.json())
      .then((data) => setAnimationData1(data))
      // Removed debug catch, handle error meaningfully
      .catch(() => setAnimationData1(null));
  }, []);

  // Handle input changes and clear error
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Replace with your actual login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Store auth token and user info
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userType', data.userType || 'user');
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        // Redirect based on user type
        if (data.userType === 'partner') {
          router.push('/partner/Dashboard');
        } else {
          router.push('/user/Dashboard');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      // Handle error gracefully
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder for Google login (implement OAuth as needed)
  const handleGoogleLogin = () => {
    // Google OAuth logic here
  };

  return (
    <div className="min-h-screen flex flex-col pt-54   lg:flex-row-reverse items-center justify-around  bg-green-700 px-4 py-10 gap-10">

      {/* Left Side Animation */}
      {animationData1 && (
        <div className="w-full max-w-sm lg:max-w-md">
          <Lottie animationData={animationData1} loop={true} />
        </div>
      )}

      {/* Login Card */}
      <div className="bg-gray-300 shadow-xl rounded-2xl px-4 py-4 w-full max-w-md">

        {/* Top Logo + Welcome */}
        <div className="flex justify-between items-center mb-3">
          <Image src="/images/logo (3).png" alt="GNB Logo" width={80} height={60} />
          <h2 className="text-2xl uppercase font-extrabold text-gray-800 tracking-tight drop-shadow-lg">Login to Your Account</h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
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
                autoComplete="off"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end -mt-1">
            <a href="/UpdatePassword" className="text-xs text-green-600 hover:underline font-medium">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 rounded-lg font-semibold transition duration-200 mt-2 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
        >
          <FaGoogle size={16} />
          Login with Google
        </button>

        {/* Signup Link */}
        <p className="text-sm text-center text-gray-600 mt-3">
          Don't have an account?{' '}
          <a href="/Signup" className="text-green-600 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
