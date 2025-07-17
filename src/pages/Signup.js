'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// ✅ Validation schema using Yup
const schema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile')
    .required('Mobile number is required'),
  vehicle: yup.string(),
  password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm your password'),
  userType: yup.string().required('Select a user type'),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [animationData, setAnimationData] = useState(null);
  const router = useRouter();

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Load Lottie animation
  useEffect(() => {
    fetch('/Animations/Signup.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Animation load error:', err));
  }, []);

  // ✅ Final form submit handler
  const onSubmit = async (formData) => {
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'confirmPassword') {
          payload.append(key, value?.toString() ?? '');
        }
      });

      if (selectedFile) {
        payload.append('document', selectedFile);
      }

      // ✅ Console log for debug
      console.log('🟩 Submitted FormData values:');
      for (let [key, value] of payload.entries()) {
        console.log(`${key}:`, value);
      }

      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Signup failed');
        return;
      }

      toast.success('Signup successful! Verify OTP.');
      router.push(`/verify-otp?email=${formData.email}`);
    } catch (err) {
      toast.error('Signup failed');
    }
  };

  return (
    <div className="bg-green-700 flex items-center justify-center px-4 py-52 min-h-screen">
      <div className="flex flex-col-reverse lg:flex-row gap-6 w-full max-w-6xl">
        {/* Signup Form */}
        <div className="bg-gray-300 shadow-xl rounded-2xl px-6 py-6 w-full max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <Image src="/images/logo (3).png" alt="Logo" width={90} height={60} />
            <h2 className="text-2xl font-extrabold text-gray-600 uppercase">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Name Fields */}
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="w-full sm:w-1/2">
                <input
                  {...register('firstname')}
                  placeholder="First Name"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
                {errors.firstname && <p className="text-xs text-red-600">{errors.firstname.message}</p>}
              </div>
              <div className="w-full sm:w-1/2">
                <input
                  {...register('lastName')}
                  placeholder="Last Name"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
                {errors.lastName && <p className="text-xs text-red-600">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}

            {/* Mobile */}
            <input
              {...register('mobile')}
              placeholder="Mobile Number"
              maxLength={10}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            {errors.mobile && <p className="text-xs text-red-600">{errors.mobile.message}</p>}

            {/* Vehicle */}
            <input
              {...register('vehicle')}
              placeholder="Vehicle Details"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />

            {/* Passwords */}
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="relative w-full sm:w-1/2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
              </div>

              <div className="relative w-full sm:w-1/2">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  placeholder="Confirm Password"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* User Type */}
            <select
              {...register('userType')}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              defaultValue=""
            >
              <option value="" disabled>Select Type</option>
              <option value="Customer">Customer</option>
              <option value="partner">Partner</option>
              <option value="technician">Technician</option>
              <option value="service-center">Service Center</option>
            </select>
            {errors.userType && <p className="text-xs text-red-600">{errors.userType.message}</p>}

            {/* File Upload */}
            <div className="flex flex-col">
              <label className="text-xs mb-1">Upload Your Picture</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => document.getElementById('fileInput').click()}
                  className="px-3 py-2 bg-green-600 text-white rounded text-xs"
                >
                  Choose File
                </button>
                <span className="text-xs text-gray-600">
                  {selectedFile ? selectedFile.name : 'No file chosen'}
                </span>
              </div>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="hidden"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-3 rounded-2xl font-bold hover:from-green-600 hover:to-green-800"
            >
              {isSubmitting ? 'Submitting...' : 'Signup'}
            </button>
          </form>

          {/* Google Signup Placeholder */}
          <button
            onClick={() => console.log('Google Signup')}
            className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-400 py-2 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <FaGoogle size={16} /> Sign up with Google
          </button>

          {/* Redirect to login */}
          <p className="text-xs text-center text-gray-700 mt-2">
            Already have an account?{' '}
            <a href="/user/login" className="text-green-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>

        {/* Lottie Animation */}
        <div className="w-full max-w-lg flex flex-col items-center justify-center">
          {animationData && <Lottie animationData={animationData} loop className="w-full h-auto" />}
        </div>
      </div>
    </div>
  );
};

export default Signup;
