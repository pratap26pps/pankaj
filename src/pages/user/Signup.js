'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [animationData, setAnimationData] = useState(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstname: '',
    lastName: '',
    email: '',
    mobile: '',
    vehicle: '',
    password: '',
    confirmPassword: '',
    userType: '',
  });

  useEffect(() => {
    fetch('/Animations/Signup.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Animation load error:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData,
      [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
      if (selectedFile) {
        payload.append('document', selectedFile);
      }

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Registration failed');
        return;
      }

      toast.success('Registered successfully! Please verify OTP.');
      router.push(`/verify-otp?email=${formData.email}`);
    } catch (err) {
      console.error(err);
      toast.error('Signup failed');
    }
  };

  return (
    <div className="bg-green-700 flex items-center justify-center px-4 py-52 min-h-screen">
      <div className="flex flex-col-reverse lg:flex-row gap-6 w-full max-w-6xl">
        {/* Signup Card */}
        <div className="bg-gray-300 shadow-xl rounded-2xl px-6 py-6 w-full max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <Image src="/images/logo (3).png" alt="Logo" width={60} height={60} />
            <h2 className="text-3xl font-extrabold text-green-800">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex gap-2 flex-col sm:flex-row">
              <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required className="w-full sm:w-1/2 px-3 py-2 border rounded-lg text-sm" />
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="w-full sm:w-1/2 px-3 py-2 border rounded-lg text-sm" />
            </div>

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-sm" />

            <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-sm" />

            <input type="text" name="vehicle" placeholder="Vehicle Details" value={formData.vehicle} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm" />

            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="relative w-full sm:w-1/2">
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 text-gray-500">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="relative w-full sm:w-1/2">
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-sm" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-2 text-gray-500">
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <select name="userType" value={formData.userType} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-sm">
              <option value="" disabled>Select Type</option>
              <option value="partner">Partner</option>
              <option value="service-center">Service Center</option>
            </select>

            {/* Profile Picture */}
            <div className="flex flex-col">
              <label className="text-xs mb-1">Upload Your Picture</label>
              <div className="flex items-center space-x-2">
                <button type="button" onClick={() => document.getElementById('fileInput').click()} className="px-3 py-2 bg-green-600 text-white rounded text-xs">Choose File</button>
                <span className="text-xs text-gray-600">{selectedFile ? selectedFile.name : 'No file chosen'}</span>
              </div>
              <input type="file" id="fileInput" name="document" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} className="hidden" />
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-3 rounded-2xl font-bold hover:from-green-600 hover:to-green-800">Signup</button>
          </form>

          <button onClick={() => console.log('Google Signup')} className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-400 py-2 rounded-lg bg-gray-50 hover:bg-gray-100">
            <FaGoogle size={16} /> Sign up with Google
          </button>

          <p className="text-xs text-center text-gray-700 mt-2">
            Already have an account?{' '}
            <a href="/user/login" className="text-green-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>

        {/* Animation Side */}
        <div className="w-full max-w-lg flex flex-col items-center justify-center">
          {animationData && <Lottie animationData={animationData} loop className="w-full h-auto" />}
        </div>
      </div>
    </div>
  );
};

export default Signup;