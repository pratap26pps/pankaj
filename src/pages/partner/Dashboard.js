'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  FaHome,
  FaCalendar,
  FaDollarSign,
  FaBookOpen,
  FaStar,
  FaFileAlt,
  FaUser,
  FaEdit,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaTools,
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaUpload,
  FaEye,
  FaUsers,
  FaBank,
  FaSmartphone,
  FaCreditCard,
  FaSearch,
  FaFilter,
  FaMotorcycle,
  FaCog,
  FaChartLine,
  FaChevronDown,
  FaBell,
  FaSave,
  FaHeart,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaBatteryHalf
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const PartnerDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const router = useRouter();

  // Handle client-side time display to prevent hydration mismatch
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Listen for localStorage changes from navbar
  useEffect(() => {
    const checkLocalStorage = () => {
      const menuState = localStorage.getItem('partnerDashboardMobileMenu');
      if (menuState === 'open' && !isSidebarOpen) {
        setIsSidebarOpen(true);
        localStorage.removeItem('partnerDashboardMobileMenu');
      }
    };

    const interval = setInterval(checkLocalStorage, 100);
    return () => clearInterval(interval);
  }, [isSidebarOpen]);

  // Mock data
  const partnerData = {
    name: 'AutoCare Center',
    center: 'AutoCare Service Center',
    totalEarnings: 125000,
    totalBookings: 45,
    completedServices: 42,
    pendingServices: 3,
    rating: 4.8
  };

  const bookingsData = [
    {
      id: 'BK001',
      customerName: 'Rahul Sharma',
      customerPhone: '+91 98765 43210',
      vehicleModel: 'Maruti Swift',
      serviceType: 'Battery Replacement',
      bookingDate: '2024-01-25',
      amount: 2500,
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 'BK002',
      customerName: 'Priya Patel',
      customerPhone: '+91 87654 32109',
      vehicleModel: 'Hyundai i20',
      serviceType: 'General Service',
      bookingDate: '2024-01-25',
      amount: 1800,
      status: 'In Progress',
      priority: 'Medium'
    },
    {
      id: 'BK003',
      customerName: 'Amit Kumar',
      customerPhone: '+91 76543 21098',
      vehicleModel: 'Tata Nexon',
      serviceType: 'Charging Issue',
      bookingDate: '2024-01-25',
      amount: 3200,
      status: 'Completed',
      priority: 'Low'
    }
  ];

  const customersData = [
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      email: "rahul@email.com",
      vehicle: "Maruti Swift",
      lastService: "2024-01-25",
      totalSpent: "₹12,500",
      status: "Active",
      avatar: "RS"
    },
    {
      id: 2,
      name: "Priya Patel",
      phone: "+91 87654 32109",
      email: "priya@email.com",
      vehicle: "Hyundai i20",
      lastService: "2024-01-20",
      totalSpent: "₹8,900",
      status: "Active",
      avatar: "PP"
    },
    {
      id: 3,
      name: "Amit Kumar",
      phone: "+91 76543 21098",
      email: "amit@email.com",
      vehicle: "Tata Nexon",
      lastService: "2024-01-15",
      totalSpent: "₹15,200",
      status: "Active",
      avatar: "AK"
    },
    {
      id: 4,
      name: "Sneha Singh",
      phone: "+91 65432 10987",
      email: "sneha@email.com",
      vehicle: "Ola S1",
      lastService: "2024-01-10",
      totalSpent: "₹6,800",
      status: "Inactive",
      avatar: "SS"
    },
    {
      id: 5,
      name: "Vikram Mehta",
      phone: "+91 54321 09876",
      email: "vikram@email.com",
      vehicle: "Bajaj Chetak",
      lastService: "2024-01-05",
      totalSpent: "₹9,400",
      status: "Active",
      avatar: "VM"
    }
  ];

  const earningsData = [
    { month: 'Jan', earnings: 58000, bookings: 25 },
    { month: 'Dec', earnings: 52000, bookings: 22 },
    { month: 'Nov', earnings: 48000, bookings: 20 },
    { month: 'Oct', earnings: 45000, bookings: 18 }
  ];

  const reviewsData = [
    { id: 1, customerName: 'Rahul Sharma', rating: 5, comment: 'Excellent service! Very professional team.' },
    { id: 2, customerName: 'Priya Patel', rating: 4, comment: 'Good work, but took longer than expected.' },
    { id: 3, customerName: 'Amit Kumar', rating: 5, comment: 'Best service center in the area!' }
  ];

  // Filter customers based on search
  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigation items - matching user dashboard structure
  const navItems = [
    { id: 'overview', label: 'Overview', icon: FaHome, type: 'section' },
    { id: 'bookings', label: 'Bookings', icon: FaCalendar, type: 'section' },
    { id: 'customers', label: 'Customers', icon: FaUsers, type: 'section' },
    { id: 'earnings', label: 'Earnings', icon: FaDollarSign, type: 'section' },
    { id: 'training', label: 'Training', icon: FaBookOpen, type: 'section' },
    { id: 'reviews', label: 'Reviews', icon: FaStar, type: 'section' },
    { id: 'documents', label: 'Documents', icon: FaFileAlt, type: 'section' },
    { id: 'profile', label: 'Profile', icon: FaUser, type: 'section' },
    { id: 'update-profile', label: 'Update Profile', icon: FaEdit, type: 'section' },
    { id: 'logout', label: 'Logout', icon: FaSignOutAlt, type: 'button', action: 'logout' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    router.push('/');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Professional Welcome Section - Two Cards Aligned */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Welcome Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      Welcome back, {partnerData.name}! 👋
                    </h1>
                    <p className="text-gray-600 text-sm">
                      Here's your dashboard overview for today
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FaUser className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Current Time</p>
                    <p className="text-lg font-semibold text-gray-800">{currentTime || '--:--'}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-sm text-gray-500">Today's Date</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">Quick Overview</h2>
                    <p className="text-gray-600 text-sm">Your performance highlights</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaChartLine className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">
                      {partnerData.rating}⭐
                    </div>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {partnerData.totalBookings}
                    </div>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaDollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-800">₹{partnerData.totalEarnings.toLocaleString('en-US')}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <FaChartLine className="w-4 h-4 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaCalendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-800">{partnerData.totalBookings}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-blue-600">
                  <FaChartLine className="w-4 h-4 mr-1" />
                  <span>+8% from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-gray-800">{partnerData.completedServices}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-emerald-600">
                  <FaChartLine className="w-4 h-4 mr-1" />
                  <span>93% completion rate</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaClock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-gray-800">{partnerData.pendingServices}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-orange-600">
                  <FaClock className="w-4 h-4 mr-1" />
                  <span>Requires attention</span>
                </div>
              </div>
            </motion.div>

            {/* Today's Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FaCalendar className="mr-3 text-emerald-600" />
                  Today's Bookings
                </h2>
                <p className="text-sm text-gray-600 mt-1">Manage your current service appointments</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {bookingsData.slice(0, 3).map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <FaUser className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{booking.customerName}</p>
                          <p className="text-sm text-gray-600">{booking.serviceType} • {booking.vehicleModel}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600 text-lg">₹{booking.amount}</p>
                        <Badge className={`mt-1 ${
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          booking.status === 'In Progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}>
                          {booking.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
                    <FaCalendar className="mr-2" />
                    View All Bookings
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case 'customers':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Customer Search Header */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaUsers className="mr-2 text-blue-600" />
                  Customer Information
                </h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <FaDownload className="mr-2" />
                  Export
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or vehicle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Customer Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700">Customer</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Contact</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Vehicle</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Last Service</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Total Spent</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer, index) => (
                      <tr key={customer.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {customer.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{customer.name}</p>
                              <p className="text-sm text-gray-600">{customer.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-700">{customer.phone}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-700">{customer.vehicle}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-700">{customer.lastService}</p>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-green-600">{customer.totalSpent}</span>
                        </td>
                        <td className="p-4">
                          <Badge className={customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {customer.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <FaEye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <FaPhone className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center p-4 border-t border-gray-200">
                <p className="text-gray-600">Showing {filteredCustomers.length} customers</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button size="sm" className="bg-blue-600 text-white">1</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'bookings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Simple Bookings Header */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaCalendar className="mr-2 text-blue-600" />
                  Service Bookings
                </h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <FaDownload className="mr-2" />
                  Export
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-lg font-bold text-gray-800">{bookingsData.length}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-lg font-bold text-gray-800">{bookingsData.filter(b => b.status === 'Pending').length}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-lg font-bold text-gray-800">{bookingsData.filter(b => b.status === 'In Progress').length}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-lg font-bold text-gray-800">{bookingsData.filter(b => b.status === 'Completed').length}</p>
                </div>
              </div>
            </div>

            {/* Bookings List */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">All Bookings</h3>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {bookingsData.map((booking, index) => (
                    <div key={booking.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-800">{booking.customerName}</h3>
                          <p className="text-sm text-gray-600">ID: #{booking.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">₹{booking.amount}</p>
                          <p className="text-sm text-gray-600">{booking.bookingDate}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div className="flex items-center">
                          <FaMotorcycle className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-700">{booking.vehicleModel}</span>
                        </div>
                        <div className="flex items-center">
                          <FaTools className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-700">{booking.serviceType}</span>
                        </div>
                        <div className="flex items-center">
                          <FaPhone className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-700">{booking.customerPhone}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className={`${
                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {booking.status}
                          </Badge>
                          <span className="text-sm text-gray-600">Priority: {booking.priority}</span>
                        </div>

                        <div className="flex space-x-2">
                          {booking.status === 'Pending' && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                Accept
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                                Reject
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            <FaEye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'earnings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Simple Earnings Overview */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaDollarSign className="mr-2 text-green-600" />
                  Earnings Overview
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Earnings</p>
                                     <p className="text-2xl font-bold text-gray-800">₹{partnerData.totalEarnings.toLocaleString('en-US')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-800">₹58,000</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Last Month</p>
                  <p className="text-2xl font-bold text-gray-800">₹52,000</p>
                </div>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Monthly Breakdown</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {earningsData.map((month, index) => (
                    <div key={month.month} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-800">{month.month} 2024</h3>
                          <p className="text-sm text-gray-600">{month.bookings} bookings</p>
                        </div>
                        <div className="text-right">
                                                     <p className="text-xl font-bold text-green-600">₹{month.earnings.toLocaleString('en-US')}</p>
                          <p className="text-sm text-gray-600">Avg: ₹{(month.earnings / month.bookings).toFixed(0)}</p>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min((month.earnings / 70000) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'training':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaBookOpen className="mr-2 text-blue-600" />
                Training Modules
              </h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">EV Safety Protocols</h3>
                      <p className="text-sm text-gray-600">Duration: 2 hours</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">100% Complete</span>
                    <Button size="sm" variant="outline">
                      <FaDownload className="w-4 h-4 mr-2" />
                      Certificate
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">Customer Service Excellence</h3>
                      <p className="text-sm text-gray-600">Duration: 1.5 hours</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">60% Complete</span>
                    <Button size="sm" variant="outline">Continue</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">Advanced Diagnostics</h3>
                      <p className="text-sm text-gray-600">Duration: 3 hours</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">0% Complete</span>
                    <Button size="sm" variant="outline" disabled>Start</Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'reviews':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaStar className="mr-2 text-yellow-600" />
                Customer Reviews
              </h2>
              <div className="space-y-4">
                {reviewsData.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{review.customerName}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'documents':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaFileAlt className="mr-2 text-blue-600" />
                Documents
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <FaFileAlt className="w-8 h-8 text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium">Business License</p>
                      <p className="text-sm text-gray-600">Uploaded: 2024-01-15</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    <Button size="sm" variant="outline">
                      <FaEye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <FaDownload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <FaFileAlt className="w-8 h-8 text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium">GST Certificate</p>
                      <p className="text-sm text-gray-600">Uploaded: 2024-01-20</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    <Button size="sm" variant="outline">
                      <FaEye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <FaDownload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <FaFileAlt className="w-8 h-8 text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium">Insurance Policy</p>
                      <p className="text-sm text-gray-600">Uploaded: 2024-01-10</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    <Button size="sm" variant="outline">
                      <FaEye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <FaDownload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaUser className="mr-2 text-blue-600" />
                  Profile Information
                </h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <FaEdit className="mr-2" />
                  Edit Profile
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Center Name</label>
                  <input
                    type="text"
                    value={partnerData.name}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Service Center</label>
                  <input
                    type="text"
                    value={partnerData.center}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    value="autocare@email.com"
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                  <input
                    type="tel"
                    value="+91 98765 43210"
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                  <textarea
                    value="123 Service Lane, Mumbai, Maharashtra"
                    disabled
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Section not found</h2>
            </div>
          </motion.div>
        );
    }
  };

  const handleNavigation = (item) => {
    if (item.type === 'section') {
      setActiveSection(item.id);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    } else if (item.type === 'button') {
      if (item.action === 'logout') {
        handleLogout();
      }
    }
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover "style={{ backgroundImage: "url('/images/book.jpg')" }}>
      {/* Header - matching user dashboard structure */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo and Navigation */}
            <div className="flex items-center  space-x-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center"
              >
                <FaHome className="mr-2" />
                Home
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/Servicepage')}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center"
              >
                <FaStar className="mr-2" />
                Services
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/about')}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium flex items-center"
              >
                <FaHeart className="mr-2" />
                About
              </motion.button>
            </div>

            {/* Right Side - Menu Button and Profile */}
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <FaBars className="text-gray-600 text-lg" />
              </motion.button>

              {/* Profile - Desktop Only */}
              <div className="hidden lg:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 p-2 rounded-lg border-0 hover:bg-gray-200 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {partnerData.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700">{partnerData.name}</p>
                    <p className="text-xs text-gray-500">Partner Dashboard</p>
                  </div>
                  <FaChevronDown className="text-gray-400 text-xs" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex pt-3 pb-10 overflow-x-hidden">
        {/* Left Sidebar  Desktop - matching user dashboard exactly */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="hidden lg:block w-64 bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl mr-6 ml-4 mt-4 h-full sticky top-8 overflow-y-hidden"
        >
          <div className="p-6 ">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaBars className="mr-3 text-emerald-600" />
              Navigation
            </h2>
            <div className="space-y-3 max-h-[calc(100vh)] overflow-hidden">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 text-left ${
                    activeSection === item.id && item.type === 'section'
                      ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200 shadow-md'
                      : 'bg-gray-50/50 hover:bg-gray-100/80 text-gray-700 hover:text-gray-900'
                  } ${item.id === 'logout' ? 'mt-6 bg-red-50 hover:bg-red-100 text-red-600' : ''}`}
                >
                  <item.icon className="mr-3 text-lg flex-shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile Sidebar Overlay - matching user dashboard exactly */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="lg:hidden fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50"
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Mobile Sidebar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                    <Button
                      onClick={() => setIsSidebarOpen(false)}
                      variant="ghost"
                      size="sm"
                      className="p-2"
                    >
                      <FaTimes className="text-gray-600" />
                    </Button>
                  </div>

                  {/* Mobile Navigation Items */}
                  <div className="flex-1 space-y-3 overflow-y-auto">
                    {navItems.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavigation(item)}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center p-4 rounded-xl transition-all duration-200 text-left ${
                          activeSection === item.id && item.type === 'section'
                            ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200 shadow-md'
                            : 'bg-gray-50/50 hover:bg-gray-100/80 text-gray-700 hover:text-gray-900'
                        } ${item.id === 'logout' ? 'mt-auto bg-red-50 hover:bg-red-100 text-red-600' : ''}`}
                      >
                        <item.icon className="mr-3 text-lg flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area - matching user dashboard layout */}
        <div className="flex-1 p-4 lg:p-8 lg:pr-8">
          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;