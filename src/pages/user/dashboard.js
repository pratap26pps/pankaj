'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Dashboard = () => {
  const [showServiceHistory, setShowServiceHistory] = useState(true);

  const user = {
    name: 'Pankaj Singh',
    userType: 'EV Owner',
    mobile: '+91 9876543210',
    vehicle: 'Tata Nexon EV - UP32 AB 1234',
    profileImage: '/images/default-user.png',
  };

  const services = [
    { name: 'Battery Replacement', status: 'Completed', date: '15 June 2025' },
    { name: 'Motor Service', status: 'In Progress', date: '25 June 2025' },
    { name: 'Brake Checkup', status: 'Scheduled', date: '5 July 2025' },
  ];

  return (
    <div className="min-h-screen pt-44 lg:pt-56 bg-gradient-to-br from-green-700 via-green-600 to-green-800 lg:bg-white px-2 sm:px-4 py-6 md:px-8 lg:px-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 max-w-7xl mx-auto gap-4 sm:gap-0">
        {/* Left: Logo + Profile */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Profile Image + Welcome */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Image
              src="/images/pankaj.jpg"
              alt="User Profile"
              width={90}
              height={90}
              className="aspect-square rounded-full object-bottom border-4 border-green-400 shadow-lg"
              style={{ width: 'auto', height: 'auto' }}
            />
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">Welcome, {user.name} 👋</h2>
              <p className="text-base sm:text-lg font-extrabold text-green-200 tracking-wide">{user.userType}</p>
              <p className="text-xs text-green-200">{user.mobile}</p>
              <p className="text-xs text-green-200">{user.vehicle}</p>
            </div>
          </div>
        </div>
        {/* SOS Button */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-4 sm:mt-0">
          <button className="bg-red-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-red-700 text-base font-bold transition-all animate-pulse">
            🚨 SOS Emergency
          </button>
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 drop-shadow-lg">
        Welcome to Your Dashboard
      </h1>

      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Service Progress */}
        <div className="bg-white/80 rounded-2xl shadow-lg p-5">
          <h3 className="text-lg font-semibold mb-3 text-green-800">Service Progress</h3>
          <div className="space-y-3">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2 text-sm">
                <div>
                  <p className="font-medium text-gray-800">{service.name}</p>
                  <p className="text-gray-500">{service.date}</p>
                </div>
                <span
                  className={`font-bold ${
                    service.status === 'Completed'
                      ? 'text-green-600'
                      : service.status === 'In Progress'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`}
                >
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Service History Toggle */}
        <div className="bg-white/80 rounded-2xl shadow-lg p-5">
          <button
            onClick={() => setShowServiceHistory(!showServiceHistory)}
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 text-sm font-semibold transition w-full sm:w-auto mx-auto block"
          >
            {showServiceHistory ? 'Hide Service History' : 'Show Service History'}
          </button>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${showServiceHistory ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {showServiceHistory && (
              <div>
                <h3 className="text-md font-semibold mb-2 text-green-800">Service History</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  {services.map((service, index) => (
                    <li key={index}>
                      {service.name} - {service.date} (
                      <span className="font-medium">{service.status}</span>)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white/80 rounded-2xl shadow-lg p-5 text-sm">
          <h3 className="text-md font-semibold mb-2 text-green-800">About Our EV Service Center</h3>
          <p className="text-gray-700">
            We provide fast and reliable electric vehicle services, including battery care,
            motor diagnostics, and emergency support across multiple cities.
          </p>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/service-booking"
            className="text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition text-base font-semibold shadow"
          >
            🚗 Book a Service
          </Link>
          <Link
            href="/payments"
            className="text-center bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition text-base font-semibold shadow"
          >
            💳 Payments
          </Link>
          <Link
            href="/referrals"
            className="text-center bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition text-base font-semibold shadow"
          >
            🎉 Refer & Earn
          </Link>
          <Link
            href="/live-tracking"
            className="text-center bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition text-base font-semibold shadow"
          >
            📍 Live Tracking
          </Link>
          <Link
            href="/vehicle-details"
            className="text-center bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition text-base font-semibold shadow"
          >
            🚙 Vehicle Details
          </Link>
          <Link
            href="/service-history"
            className="text-center bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition text-base font-semibold shadow"
          >
            📑 Full Service History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
