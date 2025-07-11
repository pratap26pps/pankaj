// Enhanced + Mobile-Responsive VoltCareUserDashboard with Dynamic Features

'use client';

import React, { useState } from 'react';
import { Battery, Bell, Calendar, Clock, Shield, User, Zap, ArrowRight, MapPin, Phone, Mail, Settings, RefreshCcw, Gift, LocateFixed, AlertTriangle, CreditCard, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const userProfile = {
    name: 'Rahul Sharma',
    mobile: '+91 9876543210',
    email: 'rahul.sharma@gmail.com',
    location: 'New Delhi, India',
    vehicle: {
      type: 'Scooter',
      model: 'Ola S1 Pro',
      battery: 'Lithium Ion 60V',
      regNo: 'DL 01 AB 1234',
    },
    vip: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 bg-no-repeat bg-center bg-cover "    style={{ backgroundImage: "url('/images/book.jpg')" }}
     >
      {/* Header */}
      <header className="backdrop-blur-xl bg-gradient-to-r from-emerald-900/95 via-teal-800/95 to-emerald-900/95 border-b border-emerald-300/20 shadow-sm  sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
          <div className="flex items-center space-x-3">
          {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo (3).png"
            alt="EV Repair"
            width={90}
            height={36}
            className="object-contain"
          />
        </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className='flex flex-row'>
             <ShoppingCart className="h-5 w-5" /><sup className='text-xl font-bold text-blue-600'>3</sup>
             </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">

            </button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">

                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white hidden sm:inline">{userProfile.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Split Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 py-8">
        {/* Sidebar */}
        <aside className="col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">

              <User className="h-10 w-10 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{userProfile.name}</h2>
            <p className="text-sm text-gray-500">{userProfile.location}</p>
          </div>

          <div className="bg-white rounded-2xl   shadow p-6 space-y-2">
            <h3 className="font-semibold text-gray-700 mb-2">EV Details</h3>
            <p className="text-sm text-gray-600">Type: <span className="font-medium">{userProfile.vehicle.type}</span></p>
            <p className="text-sm text-gray-600">Model: <span className="font-medium">{userProfile.vehicle.model}</span></p>
            <p className="text-sm text-gray-600">Battery: <span className="font-medium">{userProfile.vehicle.battery}</span></p>
            <p className="text-sm text-gray-600">Reg No: <span className="font-medium">{userProfile.vehicle.regNo}</span></p>
          </div>

          <div className="space-y-4">
            <button onClick={() => setActiveTab('batteries')} className="w-full bg-indigo-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-indigo-700">
              <Battery className="h-5 w-5" /> Buy Batteries
            </button>
            <button onClick={() => setActiveTab('book-service')} className="w-full bg-green-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-green-700">
              <Calendar className="h-5 w-5" /> Book Service
            </button>
            <button className="w-full bg-yellow-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-yellow-600">
              <Settings className="h-5 w-5" /> Update Profile
            </button>
            <button className="w-full bg-gray-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-900">
              <ShoppingCart className="h-5 w-5" /> View Cart
            </button>
          </div>

        </aside>

        {/* Main Content */}
        <main className="col-span-1 lg:col-span-3 space-y-10">
          {/* Welcome Section */}
        <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="hidden md:block bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl"
>
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold mb-1">
        Welcome back, {userProfile.name}! 👋
      </h1>
      <p className="text-indigo-100 text-lg">
        Your trusted EV service partner
      </p>
    </div>
    <div className="bg-white/10 p-4 rounded-xl">
      {/* Extra content if needed */}
    </div>
  </div>
</motion.div>


          {/* Service Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Service History</p>
                  <p className="text-xl font-bold text-gray-800">12 Services</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <RefreshCcw className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Next Service</p>
                  <p className="text-xl font-bold text-gray-800">In 15 Days</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Referrals & Rewards</p>
                  <p className="text-xl font-bold text-gray-800">Available</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Gift className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Enabled Features */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Your Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Feature icon={<LocateFixed className="text-green-600" />} label="Live Tracking History & ETA" />
              <Feature icon={<AlertTriangle className="text-red-500" />} label="Emergency SOS" />
              <Feature icon={<CreditCard className="text-blue-500" />} label="Online Payments (UPI, Cards)" />
              <Feature icon={<RefreshCcw className="text-orange-500" />} label="Service History & Ratings" />
              <Feature icon={<Star className="text-yellow-500" />} label="Referral & Rewards System" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const Feature = ({ icon, label }) => (
  <div className="bg-indigo-50 hover:bg-indigo-100 rounded-xl p-4 shadow flex items-center space-x-3 transition">
    <div className="bg-white p-2 rounded-full shadow">{icon}</div>
    <div className="text-gray-700 font-medium text-sm">{label}</div>
  </div>
);

export default Dashboard;
