'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card as AntdCard, Input, Button as AntdButton, Typography, Badge as AntdBadge } from 'antd';
import { SearchOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { Badge } from '../../components/ui/badge';
const { Title, Text } = Typography;
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

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [bookingSearch, setBookingSearch] = useState('');
  const router = useRouter();

  // Mock data for partner dashboard
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

  // Filtered bookings for search functionality
  const filteredBookings = bookingsData.filter(b => {
    const q = bookingSearch.trim().toLowerCase();
    return (
      !q ||
      (b.customerName && b.customerName.toLowerCase().includes(q)) ||
      (b.serviceType && b.serviceType.toLowerCase().includes(q)) ||
      (b.vehicleModel && b.vehicleModel.toLowerCase().includes(q))
    );
  });

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
    { id: 'training', label: 'Training', icon: FaBookOpen, type: 'section' },
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
            {/* Professional Welcome Section - Only Welcome Card Remains */}
            {/* Welcome Card - Full Width & Responsive */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200 shadow-lg w-full mb-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 truncate">
                    Welcome back, {partnerData.name}! 👋
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base">
                    Here's your dashboard overview for today
                  </p>
                </div>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUser className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

            {/* Today's Bookings - Scrollable, Searchable, Beautiful */}
            <AntdCard
              title={
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CalendarOutlined style={{ color: '#10b981', fontSize: 22 }} />
                  <span style={{ fontWeight: 700, fontSize: 20 }}>Today's Bookings</span>
                </span>
              }
              bordered={false}
              style={{ borderRadius: 16, boxShadow: '0 8px 32px rgba(16,185,129,0.08)', marginBottom: 24 }}
              headStyle={{ background: 'linear-gradient(90deg,#f0fdfa 0%,#e0f2fe 100%)', borderRadius: '16px 16px 0 0' }}
              bodyStyle={{ padding: 0 }}
              extra={<Text type="secondary">Manage your current service appointments</Text>}
            >
              <div style={{ padding: 16, borderBottom: '1px solid #f0f0f0', background: '#fafcff' }}>
                <Input
                  allowClear
                  prefix={<SearchOutlined style={{ color: '#10b981' }} />}
                  placeholder="Search by customer, service, or vehicle..."
                  style={{ maxWidth: 360, width: '100%' }}
                  onChange={e => setBookingSearch(e.target.value)}
                />
              </div>
              <div
                style={{
                  maxHeight: 320,
                  overflowY: 'auto',
                  padding: 16,
                  background: '#fff',
                  borderRadius: '0 0 16px 16px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#10b981 #f0fdfa'
                }}
                className="custom-scrollbar"
              >
                <AnimatePresence>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
                        style={{ marginBottom: 18 }}
                      >
                        <AntdCard
                          hoverable
                          style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(16,185,129,0.06)' }}
                          bodyStyle={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'space-between' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <UserOutlined style={{ color: '#10b981', fontSize: 28 }} />
                            <div>
                              <Title level={5} style={{ margin: 0 }}>{booking.customerName}</Title>
                              <Text type="secondary">{booking.serviceType} • {booking.vehicleModel}</Text>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <Text strong style={{ color: '#10b981', fontSize: 18 }}>₹{booking.amount}</Text>
                            <div style={{ marginTop: 4 }}>
                              <AntdBadge
                                color={
                                  booking.status === 'Pending' ? 'gold' :
                                  booking.status === 'In Progress' ? 'blue' :
                                  'green'
                                }
                                text={booking.status}
                              />
                            </div>
                          </div>
                        </AntdCard>
                      </motion.div>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', color: '#bdbdbd', padding: '48px 0' }}>
                      No bookings found for today.
                    </div>
                  )}
                </AnimatePresence>
              </div>
              <div style={{ padding: 16, textAlign: 'center', background: '#fafcff', borderRadius: '0 0 16px 16px' }}>
                <AntdButton
                  type="primary"
                  icon={<CalendarOutlined />}
                  style={{ background: '#10b981', borderColor: '#10b981', fontWeight: 600, borderRadius: 8 }}
                  size="large"
                >
                  View All Bookings
                </AntdButton>
              </div>
            </AntdCard>
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
                className="lg:hidden fixed left-0 top-0 h-screen w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50"
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
                  <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-120px)]">
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

export default Dashboard;