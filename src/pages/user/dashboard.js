  'use client';
  import React, { useState } from 'react';
  import Image from 'next/image';
  import Link from 'next/link';

  const Dashboard = () => {
    const [showServiceHistory, setShowServiceHistory] = useState(false);

    const user = {
      name: 'Adarsh Tiwari',
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
      <div className="min-h-screen pt-44 bg-gray-100 px-4 py-6 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
          {/* Left: Logo + Profile */}
          <div className="flex items-center space-x-4">
           

            {/* Profile Image + Welcome */}
            <div className="flex items-center space-x-3">

              <div>
                <h2 className="text-lg font-bold text-gray-800">Welcome, {user.name} 👋</h2>
                <p className="text-sm text-gray-500">{user.userType}</p>
              </div>
              <Image
                src="/images/pankaj.jpg"
                alt="User Profile"
width={80}
height={80}
                className="  aspect-square rounded-full object-bottom"
              />
            </div>
          </div>

          {/* Right: SOS Button */}
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 text-sm">
            🚨 SOS Emergency
          </button>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome to Your Dashboard
        </h1>

        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Service Progress */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Service Progress</h3>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 text-sm">
                  <div>
                    <p className="font-medium text-gray-800">{service.name}</p>
                    <p className="text-gray-500">{service.date}</p>
                  </div>
                  <span
                    className={`font-medium ${
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
          <div className="bg-white rounded-lg shadow p-5">
            <button
              onClick={() => setShowServiceHistory(!showServiceHistory)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 text-sm transition"
            >
              {showServiceHistory ? 'Hide Service History' : 'Show Service History'}
            </button>

            {showServiceHistory && (
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2 text-gray-700">Service History</h3>
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

          {/* About Section */}
          <div className="bg-white rounded-lg shadow p-5 text-sm">
            <h3 className="text-md font-semibold mb-2 text-gray-700">About Our EV Service Center</h3>
            <p className="text-gray-600">
              We provide fast and reliable electric vehicle services, including battery care,
              motor diagnostics, and emergency support across multiple cities.
            </p>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/service-booking"
              className="text-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition text-sm"
            >
              🚗 Book a Service
            </Link>
            <Link
              href="/payments"
              className="text-center bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition text-sm"
            >
              💳 Payments
            </Link>
            <Link
              href="/referrals"
              className="text-center bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition text-sm"
            >
              🎉 Refer & Earn
            </Link>
            <Link
              href="/live-tracking"
              className="text-center bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition text-sm"
            >
              📍 Live Tracking
            </Link>
            <Link
              href="/vehicle-details"
              className="text-center bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition text-sm"
            >
              🚙 Vehicle Details
            </Link>
            <Link
              href="/service-history"
              className="text-center bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition text-sm"
            >
              📑 Full Service History
            </Link>
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;
