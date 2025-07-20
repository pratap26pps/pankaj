'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const handleLogout = () => {
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">₹{partnerData.totalEarnings.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaDollarSign className="text-green-600 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{partnerData.totalBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaCalendar className="text-blue-600 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed Services</p>
                    <p className="text-2xl font-bold text-gray-900">{partnerData.completedServices}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-emerald-600 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{partnerData.rating}/5</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <FaStar className="text-yellow-600 text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaUser className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.customerName}</p>
                          <p className="text-sm text-gray-600">{booking.serviceType}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹{booking.amount}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{booking.customerName}</h4>
                          <p className="text-sm text-gray-600">{booking.vehicleModel}</p>
                          <p className="text-sm text-gray-600">{booking.serviceType}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">₹{booking.amount}</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'customers':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Customer Management</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {customersData.map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">{customer.avatar}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{customer.name}</h4>
                          <p className="text-sm text-gray-600">{customer.vehicle}</p>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{customer.totalSpent}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Select a section from the sidebar</h3>
          </div>
        );
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: FaHome },
    { id: 'bookings', label: 'Bookings', icon: FaCalendar },
    { id: 'customers', label: 'Customers', icon: FaUsers },
    { id: 'earnings', label: 'Earnings', icon: FaDollarSign },
    { id: 'services', label: 'Services', icon: FaTools },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  const handleNavigation = (item) => {
    setActiveSection(item.id);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <FaBars className="text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">{partnerData.center}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">{currentTime}</div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="text-lg" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {renderSection()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;