'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  FaUsers,
  FaCheckCircle,
  FaBookOpen,
  FaMoneyBill,
  FaGift,
  FaChartBar,
  FaBatteryHalf,
  FaSearch,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaEye,
  FaEdit,
  FaTrash,
  FaUpload,
  FaImage,
  FaPlus,
  FaDownload,
  FaFilter,
  FaBell,
  FaCog,
  FaHome,
  FaUserCheck,
  FaUserTimes,
  FaStar,
  FaCalendar,
  FaDollarSign,
  FaShoppingCart,
  FaExclamationTriangle,
  FaCheck,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaPercent,
  FaTools,
  FaSave,
  FaChevronDown,
  FaHeart
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const router = useRouter();

  // Helper function for consistent number formatting
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Handle client-side time display
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

  // Mock data for admin dashboard
  const adminData = {
    name: 'Admin Panel',
    totalUsers: 1247,
    totalPartners: 89,
    totalBookings: 456,
    totalEarnings: 285000,
    pendingVerifications: 12,
    activeDisputes: 5,
    lowStockItems: 8
  };

  const usersData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      type: 'User',
      status: 'Active',
      avatar: 'JD',
      lastActive: '2 hours ago',
      totalBookings: 15
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      type: 'Partner',
      status: 'Pending',
      avatar: 'JS',
      lastActive: '1 day ago',
      totalBookings: 8
    },
    {
      id: 3,
      name: 'AutoCare Center',
      email: 'center1@example.com',
      type: 'Service Center',
      status: 'Active',
      avatar: 'AC',
      lastActive: '30 min ago',
      totalBookings: 45
    },
    {
      id: 4,
      name: 'TechFix Solutions',
      email: 'techfix@example.com',
      type: 'Service Center',
      status: 'Active',
      avatar: 'TF',
      lastActive: '1 hour ago',
      totalBookings: 32
    }
  ];

  const bookingsData = [
    {
      id: 'B001',
      user: 'John Doe',
      center: 'AutoCare Center',
      service: 'Battery Replacement',
      status: 'Active',
      dispute: false,
      amount: 2500,
      date: '2024-01-25'
    },
    {
      id: 'B002',
      user: 'Jane Smith',
      center: 'TechFix Solutions',
      service: 'General Service',
      status: 'Dispute',
      dispute: true,
      amount: 1800,
      date: '2024-01-25'
    },
    {
      id: 'B003',
      user: 'Mike Johnson',
      center: 'AutoCare Center',
      service: 'Charging Issue',
      status: 'Completed',
      dispute: false,
      amount: 3200,
      date: '2024-01-24'
    }
  ];

  const commissionsData = [
    {
      id: 1,
      partner: 'Jane Smith',
      amount: 1200,
      status: 'Paid',
      date: '2024-01-25',
      commission: '15%'
    },
    {
      id: 2,
      partner: 'AutoCare Center',
      amount: 800,
      status: 'Pending',
      date: '2024-01-24',
      commission: '12%'
    },
    {
      id: 3,
      partner: 'TechFix Solutions',
      amount: 1500,
      status: 'Paid',
      date: '2024-01-23',
      commission: '10%'
    }
  ];

  const offersData = [
    {
      id: 1,
      title: 'New Year Discount',
      description: 'Get 20% off on all services',
      active: true,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      usage: 45
    },
    {
      id: 2,
      title: 'Free Service',
      description: 'Free general service for new users',
      active: false,
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      usage: 12
    },
    {
      id: 3,
      title: 'Battery Replacement',
      description: 'Special pricing on battery replacements',
      active: true,
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      usage: 28
    }
  ];

  const inventoryData = [
    {
      id: 1,
      battery: 'Lithium-Ion 60V 20Ah',
      stock: 20,
      orders: 5,
      price: 8500,
      status: 'In Stock'
    },
    {
      id: 2,
      battery: 'Lead Acid 48V 12Ah',
      stock: 10,
      orders: 2,
      price: 3200,
      status: 'Low Stock'
    },
    {
      id: 3,
      battery: 'Lithium-Ion 72V 30Ah',
      stock: 15,
      orders: 8,
      price: 12000,
      status: 'In Stock'
    }
  ];

  const analyticsData = {
    users: { current: 1247, change: '+12%', trend: 'up' },
    partners: { current: 89, change: '+5%', trend: 'up' },
    bookings: { current: 456, change: '+8%', trend: 'up' },
    earnings: { current: 285000, change: '+15%', trend: 'up' }
  };

  // Filter data based on search
  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCenters = usersData.filter(user =>
    user.type === 'Service Center' && (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: FaHome, type: 'section' },
    { id: 'manage-users', label: 'Manage Users & Centers', icon: FaUsers, type: 'section' },
    { id: 'verify-partners', label: 'Verify Partners', icon: FaUserCheck, type: 'section' },
    { id: 'live-bookings', label: 'Live Bookings & Disputes', icon: FaBookOpen, type: 'section' },
    { id: 'commissions', label: 'Commissions & Payouts', icon: FaMoneyBill, type: 'section' },
    { id: 'offers', label: 'Offers & Promotions', icon: FaGift, type: 'section' },
    { id: 'analytics', label: 'Analytics', icon: FaChartBar, type: 'section' },
    { id: 'inventory', label: 'Battery Inventory', icon: FaBatteryHalf, type: 'section' },
    { id: 'carousel', label: 'Carousel Images', icon: FaImage, type: 'section' },
    { id: 'logout', label: 'Logout', icon: FaSignOutAlt, type: 'button', action: 'logout' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    router.push('/');
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    setSelectedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setSelectedImages(prev => prev.filter(img => img.id !== id));
  };

  // Remove debug logs from navigation and section rendering
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

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Welcome Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      Welcome to Admin Panel! 👋
                    </h1>
                    <p className="text-gray-600">Manage your EV service platform</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Current Time</div>
                    <div className="text-lg font-mono font-bold text-emerald-600">{currentTime}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-lg"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={() => setActiveSection('verify-partners')} className="bg-emerald-500 hover:bg-emerald-600">
                    <FaUserCheck className="mr-2" />
                    Verify Partners
                  </Button>
                  <Button onClick={() => setActiveSection('live-bookings')} className="bg-orange-500 hover:bg-orange-600">
                    <FaExclamationTriangle className="mr-2" />
                    Handle Disputes
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-800">{analyticsData.users.current}</p>
                    <div className="flex items-center text-sm text-emerald-600">
                      <FaArrowUp className="mr-1" />
                      {analyticsData.users.change}
                    </div>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <FaUsers className="text-emerald-600 text-xl" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Partners</p>
                    <p className="text-2xl font-bold text-gray-800">{analyticsData.partners.current}</p>
                    <div className="flex items-center text-sm text-emerald-600">
                      <FaArrowUp className="mr-1" />
                      {analyticsData.partners.change}
                    </div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUserCheck className="text-blue-600 text-xl" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-800">{analyticsData.bookings.current}</p>
                    <div className="flex items-center text-sm text-emerald-600">
                      <FaArrowUp className="mr-1" />
                      {analyticsData.bookings.change}
                    </div>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <FaBookOpen className="text-orange-600 text-xl" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-800">₹{formatNumber(analyticsData.earnings.current)}</p>
                    <div className="flex items-center text-sm text-emerald-600">
                      <FaArrowUp className="mr-1" />
                      {analyticsData.earnings.change}
                    </div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaDollarSign className="text-purple-600 text-xl" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {bookingsData.slice(0, 3).map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="bg-emerald-100 p-2 rounded-full mr-4">
                          <FaBookOpen className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{booking.service}</p>
                          <p className="text-sm text-gray-600">{booking.user} • {booking.center}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{booking.amount}</p>
                        <Badge className={booking.dispute ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}>
                          {booking.dispute ? 'Dispute' : booking.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'manage-users':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Manage Users & Service Centers</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users or centers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  <FaPlus className="mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Users */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FaUsers className="mr-2 text-emerald-600" />
                    Users ({filteredUsers.length})
                  </h3>
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <motion.div
                        key={user.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                            <span className="font-semibold text-emerald-600">{user.avatar}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-500">Last active: {user.lastActive}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={user.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}>
                            {user.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{user.type}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Service Centers */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FaTools className="mr-2 text-blue-600" />
                    Service Centers ({filteredCenters.length})
                  </h3>
                  <div className="space-y-4">
                    {filteredCenters.map((center) => (
                      <motion.div
                        key={center.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <span className="font-semibold text-blue-600">{center.avatar}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{center.name}</p>
                            <p className="text-sm text-gray-600">{center.email}</p>
                            <p className="text-xs text-gray-500">{center.totalBookings} bookings</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={center.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}>
                            {center.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      case 'verify-partners':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Verify Service Partners</h2>
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {usersData.filter(u => u.type === 'Partner' && u.status === 'Pending').map((partner) => (
                    <motion.div
                      key={partner.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-6 bg-orange-50 rounded-lg border border-orange-200"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                          <span className="font-semibold text-orange-600">{partner.avatar}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{partner.name}</p>
                          <p className="text-sm text-gray-600">{partner.email}</p>
                          <p className="text-xs text-orange-600">Pending verification</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="bg-emerald-500 hover:bg-emerald-600">
                          <FaCheck className="mr-2" />
                          Approve
                        </Button>
                        <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                          <FaUserTimes className="mr-2" />
                          Reject
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'live-bookings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Live Bookings & Disputes</h2>
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {bookingsData.map((booking) => (
                    <motion.div
                      key={booking.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 rounded-lg border ${
                        booking.dispute
                          ? 'bg-red-50 border-red-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                            booking.dispute ? 'bg-red-100' : 'bg-emerald-100'
                          }`}>
                            {booking.dispute ? (
                              <FaExclamationTriangle className="text-red-600" />
                            ) : (
                              <FaBookOpen className="text-emerald-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">Booking #{booking.id}</p>
                            <p className="text-sm text-gray-600">{booking.service}</p>
                            <p className="text-xs text-gray-500">{booking.user} • {booking.center}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">₹{booking.amount}</p>
                          <Badge className={booking.dispute ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}>
                            {booking.dispute ? 'Dispute' : booking.status}
                          </Badge>
                          {booking.dispute && (
                            <Button className="mt-2 bg-red-500 hover:bg-red-600">
                              <FaEye className="mr-2" />
                              Resolve Dispute
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'commissions':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Commissions & Payouts</h2>
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {commissionsData.map((commission) => (
                    <motion.div
                      key={commission.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-6 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                          <FaMoneyBill className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{commission.partner}</p>
                          <p className="text-sm text-gray-600">Commission: {commission.commission}</p>
                          <p className="text-xs text-gray-500">{commission.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{commission.amount}</p>
                        <Badge className={commission.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}>
                          {commission.status}
                        </Badge>
                        {commission.status === 'Pending' && (
                          <Button className="mt-2 bg-emerald-500 hover:bg-emerald-600">
                            <FaMoneyBill className="mr-2" />
                            Process Payout
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'offers':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Offers & Promotions</h2>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <FaPlus className="mr-2" />
                Create Offer
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offersData.map((offer) => (
                <motion.div
                  key={offer.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">{offer.title}</h3>
                    <Badge className={offer.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}>
                      {offer.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>Start: {offer.startDate}</p>
                    <p>End: {offer.endDate}</p>
                    <p>Usage: {offer.usage} times</p>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <FaEdit className="mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <FaEye className="mr-1" />
                      View
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'analytics':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(analyticsData).map(([key, data]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 capitalize">{key}</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {key === 'earnings' ? `₹${formatNumber(data.current)}` : data.current}
                      </p>
                      <div className="flex items-center text-sm text-emerald-600">
                        {data.trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                        {data.change}
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${
                      key === 'users' ? 'bg-emerald-100' :
                      key === 'partners' ? 'bg-blue-100' :
                      key === 'bookings' ? 'bg-orange-100' : 'bg-purple-100'
                    }`}>
                      {key === 'users' && <FaUsers className="text-emerald-600 text-xl" />}
                      {key === 'partners' && <FaUserCheck className="text-blue-600 text-xl" />}
                      {key === 'bookings' && <FaBookOpen className="text-orange-600 text-xl" />}
                      {key === 'earnings' && <FaDollarSign className="text-purple-600 text-xl" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Trend</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart Component</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">User Growth</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart Component</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      case 'inventory':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Battery Inventory & Orders</h2>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <FaPlus className="mr-2" />
                Add Battery
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventoryData.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">{item.battery}</h3>
                    <Badge className={item.status === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Stock: {item.stock} units</p>
                    <p>Orders: {item.orders} pending</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <FaEdit className="mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <FaEye className="mr-1" />
                      View Orders
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'carousel':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Carousel Images Management</h2>

            {/* Upload Section */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Upload New Images</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Drag and drop images here or click to browse</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">
                      <FaImage className="mr-2" />
                      Choose Images
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Images */}
            {selectedImages.length > 0 && (
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Uploaded Images ({selectedImages.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedImages.map((image) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                      >
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            onClick={() => removeImage(image.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <FaTrash className="mr-2" />
                            Remove
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 truncate">{image.name}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                      <FaSave className="mr-2" />
                      Save to Carousel
                    </Button>
                    <Button variant="outline">
                      <FaDownload className="mr-2" />
                      Download All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        );

      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover" style={{ backgroundImage: "url('/images/book.jpg')" }}>
      {/* Header - Professional responsive navbar */}
      {/* Header - matching partner and user dashboard structure */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo and Hamburger */}
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <img
                  src="/images/logo (3).png"
                  alt="Admin Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </motion.div>
              {/* Hamburger for mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors duration-200 text-white"
              >
                <FaBars className="text-white text-lg" />
              </motion.button>
            </div>
            {/* Right Side - Carousel Button and Profile */}
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCarouselOpen(true)}
                className="p-2 rounded-lg bg-emerald-500/80 hover:bg-emerald-600/80 transition-colors duration-200 text-white"
              >
                <FaImage className="text-lg" />
              </motion.button>
              <div className="hidden lg:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 p-2 rounded-lg border-0 hover:bg-gray-200 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700">Admin Panel</p>
                    <p className="text-xs text-gray-500">Dashboard</p>
                  </div>
                  <FaChevronDown className="text-gray-400 text-xs" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex pt-3 pb-10 overflow-x-hidden">
        {/* Left Sidebar Desktop - matching partner and user dashboard exactly */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="hidden lg:block w-64 bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl mr-6 ml-4 mt-4 h-full sticky top-8 overflow-y-hidden"
        >
          <div className="p-6">
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

        {/* Mobile Sidebar Overlay - now slides in from the right */}
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
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
                className="lg:hidden fixed right-0 top-0 h-screen w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50"
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

        {/* Main Content Area - matching partner and user dashboard layout */}
        <div className="flex-1 p-4 lg:p-8 lg:pr-8">
          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Modal */}
      <AnimatePresence>
        {isCarouselOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsCarouselOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 sm:inset-8 lg:inset-16 z-50 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            >
              <div className="h-full flex flex-col">
                {/* Carousel Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Carousel Images</h2>
                  <Button
                    onClick={() => setIsCarouselOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="p-2 bg-white/50 hover:bg-white/70 backdrop-blur-sm"
                  >
                    <FaTimes className="text-gray-600" />
                  </Button>
                </div>

                {/* Carousel Content */}
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {selectedImages.map((image) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                      >
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="w-full h-32 sm:h-40 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            onClick={() => removeImage(image.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <FaTrash className="mr-2" />
                            Remove
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 truncate">{image.name}</p>
                      </motion.div>
                    ))}
                  </div>

                  {selectedImages.length === 0 && (
                    <div className="text-center py-12">
                      <FaImage className="text-4xl text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No images uploaded yet</p>
                    </div>
                  )}
                </div>

                {/* Carousel Footer */}
                <div className="p-4 sm:p-6 border-t border-white/20">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="carousel-image-upload"
                    />
                    <label htmlFor="carousel-image-upload">
                      <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer w-full sm:w-auto">
                        <FaUpload className="mr-2" />
                        Upload Images
                      </Button>
                    </label>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <FaSave className="mr-2" />
                      Save to Carousel
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
