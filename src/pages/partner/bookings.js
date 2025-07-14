'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  Calendar,
  User,
  Car,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

const bookingsData = [
  {
    id: 1,
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    customerEmail: "rahul@email.com",
    vehicleModel: "Maruti Swift",
    vehicleNumber: "MH-12-AB-1234",
    serviceType: "Basic Service",
    bookingDate: "2024-01-25",
    preferredTime: "10:00 AM",
    status: "Pending",
    amount: 2500,
    priority: "High",
    location: "Mumbai, Maharashtra",
    notes: "Customer requested urgent service"
  },
  {
    id: 2,
    customerName: "Priya Patel",
    customerPhone: "+91 87654 32109",
    customerEmail: "priya@email.com",
    vehicleModel: "Hyundai i20",
    vehicleNumber: "MH-12-CD-5678",
    serviceType: "Battery Replacement",
    bookingDate: "2024-01-26",
    preferredTime: "2:00 PM",
    status: "In Progress",
    amount: 4500,
    priority: "Medium",
    location: "Mumbai, Maharashtra",
    notes: "Battery completely dead"
  },
  {
    id: 3,
    customerName: "Amit Kumar",
    customerPhone: "+91 76543 21098",
    customerEmail: "amit@email.com",
    vehicleModel: "Tata Nexon",
    vehicleNumber: "MH-12-EF-9012",
    serviceType: "General Service",
    bookingDate: "2024-01-27",
    preferredTime: "11:00 AM",
    status: "Completed",
    amount: 1800,
    priority: "Low",
    location: "Mumbai, Maharashtra",
    notes: "Regular maintenance"
  },
  {
    id: 4,
    customerName: "Sneha Singh",
    customerPhone: "+91 65432 10987",
    customerEmail: "sneha@email.com",
    vehicleModel: "Ola S1",
    vehicleNumber: "MH-12-GH-3456",
    serviceType: "Brake Service",
    bookingDate: "2024-01-28",
    preferredTime: "3:00 PM",
    status: "Pending",
    amount: 3200,
    priority: "High",
    location: "Mumbai, Maharashtra",
    notes: "Brake noise issue"
  }
];

export default function Bookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [filteredBookings, setFilteredBookings] = useState(bookingsData);

  useEffect(() => {
    let filtered = bookingsData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'All') {
      filtered = filtered.filter(booking => booking.priority === priorityFilter);
    }

    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, priorityFilter]);

  const handleBookingAction = (bookingId, action) => {
    // Implement booking action logic here (e.g., API call)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Booking Management</h1>
              <p className="text-gray-600">Manage all service bookings and customer requests</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search customers, vehicles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <Button variant="outline" className="flex items-center justify-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Service Bookings ({filteredBookings.length})</span>
                <div className="text-sm text-gray-600">
                  Showing {filteredBookings.length} of {bookingsData.length} bookings
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-semibold">Customer</th>
                      <th className="text-left p-4 font-semibold">Vehicle</th>
                      <th className="text-left p-4 font-semibold">Service</th>
                      <th className="text-left p-4 font-semibold">Date & Time</th>
                      <th className="text-left p-4 font-semibold">Amount</th>
                      <th className="text-left p-4 font-semibold">Priority</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-left p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <motion.tr
                        key={booking.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{booking.customerName}</p>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Phone className="w-3 h-3 mr-1" />
                              {booking.customerPhone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-3 h-3 mr-1" />
                              {booking.location}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{booking.vehicleModel}</p>
                            <p className="text-sm text-gray-600">{booking.vehicleNumber}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium">{booking.serviceType}</p>
                          {booking.notes && (
                            <p className="text-sm text-gray-600 mt-1">{booking.notes}</p>
                          )}
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{booking.bookingDate}</p>
                            <p className="text-sm text-gray-600">{booking.preferredTime}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-green-600">₹{booking.amount}</p>
                        </td>
                        <td className="p-4">
                          <Badge className={getPriorityColor(booking.priority)}>
                            {booking.priority}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {booking.status === 'Pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleBookingAction(booking.id, 'accept')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleBookingAction(booking.id, 'reject')}
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            {booking.status === 'In Progress' && (
                              <Button
                                size="sm"
                                onClick={() => handleBookingAction(booking.id, 'complete')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Complete
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
