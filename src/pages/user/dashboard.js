// Enhanced + Mobile-Responsive VoltCareUserDashboard with Dynamic Features

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser,
  FaHistory,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaBatteryHalf,
  FaTools,
  FaSignOutAlt,
  FaEdit,
  FaMotorcycle,
  FaBolt,

  FaBell,
  FaHome,
  FaChevronDown,
  FaHeart,
  FaStar,
  FaArrowLeft,
  FaTimes,
  FaBars,
  FaPhone,
  FaEnvelope,
  FaMapPin,
  FaCalendar,
  FaSave
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader, ClipboardCheck, PackageCheck } from "lucide-react"; // or use react-icons
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartCount] = useState(3);
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data with editable fields
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, New Delhi, India',
    avatar: '/images/pankaj.jpg',
    evDetails: {
      model: 'Hero Electric Optima',
      batteryCapacity: '60V 20Ah',
      registrationNumber: 'DL01AB1234',
      purchaseDate: '2023-06-15',
      lastService: '2024-01-20',
      nextService: '2024-04-20',
      totalDistance: '2,450 km',
      batteryHealth: '85%',
      color: 'Pearl White',
      year: '2023',
      insuranceExpiry: '2025-06-15'
    }
  });

  // Editable form data
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
    vehicleModel: userData.evDetails.model,
    batteryCapacity: userData.evDetails.batteryCapacity,
    registrationNumber: userData.evDetails.registrationNumber,
    color: userData.evDetails.color,
    year: userData.evDetails.year
  });

  // Navigation items
  const navItems = [
    { id: 'profile', label: 'Profile', icon: FaUser, type: 'section' },
    { id: 'service-history', label: 'Service History', icon: FaHistory, type: 'section' },
    { id: 'cart', label: 'Cart', icon: FaShoppingCart, type: 'section' },
    { id: 'book-service', label: 'Book Service', icon: FaTools, type: 'button', route: '/ServiceForm' },
    { id: 'buy-battery', label: 'Buy Battery', icon: FaBatteryHalf, type: 'button', route: "" },
    { id: 'update-profile', label: 'Update Profile', icon: FaEdit, type: 'section' },
    { id: 'logout', label: 'Logout', icon: FaSignOutAlt, type: 'button', action: 'logout' }
  ];

  const handleNavigation = (item) => {
    if (item.type === 'section') {
      setActiveSection(item.id);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    } else if (item.type === 'button') {
      if (item.action === 'logout') {
        router.push('/');
      } else if (item.route) {
        router.push(item.route);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setUserData(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      evDetails: {
        ...prev.evDetails,
        model: formData.vehicleModel,
        batteryCapacity: formData.batteryCapacity,
        registrationNumber: formData.registrationNumber,
        color: formData.color,
        year: formData.year
      }
    }));
    setIsEditing(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaUser className="mr-3 text-emerald-600" />
                  Profile Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{userData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{userData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{userData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium">{userData.address}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">EV Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-medium">{userData.evDetails.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Battery:</span>
                        <span className="font-medium">{userData.evDetails.batteryCapacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reg. No:</span>
                        <span className="font-medium">{userData.evDetails.registrationNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color:</span>
                        <span className="font-medium">{userData.evDetails.color}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

    
      <CardContent className="p-8">
        <div className="flex items-center mb-6 gap-3">
          <FaTools className="text-gray-800 text-3xl" />
          <h3 className="sm:text-2xl 2xl:text-5xl  font-bold text-gray-800 tracking-wide">Service Progress</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-inner">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="text-white w-4 h-4" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Service Booked</h4>
                <p className="text-sm text-slate-500">Your booking has been confirmed.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <Loader className="text-white w-4 h-4 animate-spin" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">In Service</h4>
                <p className="text-sm text-slate-500">Vehicle is currently being serviced.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <PackageCheck className="text-white w-4 h-4" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Ready for Pickup</h4>
                <p className="text-sm text-slate-500">Service completed and ready for delivery.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white w-4 h-4" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Completed</h4>
                <p className="text-sm text-slate-500">Vehicle handed over to the customer.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
   
          </motion.div>
        );

      case 'update-profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <FaEdit className="mr-3 text-emerald-600" />
                    Update Profile
                  </h2>
                  <div className="flex space-x-3">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={handleSave}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <FaSave className="mr-2" />
                          Save Changes
                        </Button>
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <FaEdit className="mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                      <FaUser className="mr-2 text-emerald-600" />
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                        <textarea
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          disabled={!isEditing}
                          rows="3"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                      <FaMotorcycle className="mr-2 text-emerald-600" />
                      Vehicle Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Vehicle Model</label>
                        <input
                          type="text"
                          value={formData.vehicleModel}
                          onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Battery Capacity</label>
                        <input
                          type="text"
                          value={formData.batteryCapacity}
                          onChange={(e) => handleInputChange('batteryCapacity', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Registration Number</label>
                        <input
                          type="text"
                          value={formData.registrationNumber}
                          onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Color</label>
                          <input
                            type="text"
                            value={formData.color}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Year</label>
                          <input
                            type="text"
                            value={formData.year}
                            onChange={(e) => handleInputChange('year', e.target.value)}
                            disabled={!isEditing}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'service-history':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaHistory className="mr-3 text-emerald-600" />
                  Service History
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{ scale: 1.02 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">Service #{item}</h3>
                          <p className="text-gray-600 text-sm">Battery check, Motor inspection</p>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-600 font-semibold">₹299</div>
                          <div className="text-gray-500 text-sm">2024-01-{20 - item}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'cart':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaShoppingCart className="mr-3 text-emerald-600" />
                  Shopping Cart
                </h2>
                <div className="text-center py-8">
                  <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-center bg-cover" style={{ backgroundImage: "url('/images/book.jpg')" }}>
      {/* Beautiful Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl py-4 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <Image
                src="/images/logo (3).png"
                alt="GNB EV Service"
                width={120}
                height={40}
                className="object-contain"
              />
            </motion.div>

            {/* Center Navigation - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-8">
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

            {/* Right Side - Menu Button, Cart, and Profile */}
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



              {/* Cart with Badge */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Button variant="ghost" size="sm" className="relative p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 border-0">
                  <FaShoppingCart className="text-lg" />
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold shadow-lg">
                    {cartCount}
                  </span>
                </Button>
              </motion.div>

              {/* Profile Dropdown - Desktop Only */}
              <div className="hidden lg:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 p-2 rounded-lg border-0 hover:bg-gray-200 transition-colors duration-200"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userData.avatar} />
                        <AvatarFallback className="bg-emerald-500 text-white font-semibold">
                          {userData.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left ">
                        <p className="text-sm font-medium text-gray-700">{userData.name}</p>
                        <p className="text-xs text-gray-500">Dashboard</p>
                      </div>
                      <FaChevronDown className="text-gray-400 text-xs" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2 bg-white">
                    <DropdownMenuLabel className="text-emerald-700">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setActiveSection('profile')} className="cursor-pointer">
                      <FaUser className="mr-2 h-4 w-4 text-emerald-600" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/')} className="cursor-pointer text-red-600">
                      <FaSignOutAlt className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex pt-3 pb-10 overflow-x-hidden">
        {/* Left Sidebar - Desktop */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="hidden lg:block w-64 bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl mr-6 ml-4 mt-4 h-fit sticky top-20"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaBars className="mr-3 text-emerald-600" />
              Navigation
            </h2>
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
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

        {/* Mobile Sidebar Overlay */}
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

        {/* Main Content Area */}
        <div className="flex-1 p-4 lg:p-8 lg:pr-8">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
