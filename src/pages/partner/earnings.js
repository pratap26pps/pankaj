'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  CreditCard,
  Bank,
  Smartphone,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Settings,
  RefreshCw,
  Filter
} from 'lucide-react';

const earningsData = [
  { month: "Jan", earnings: 45000, bookings: 45, expenses: 12000 },
  { month: "Feb", earnings: 52000, bookings: 52, expenses: 13500 },
  { month: "Mar", earnings: 48000, bookings: 48, expenses: 11800 },
  { month: "Apr", earnings: 55000, bookings: 55, expenses: 14200 },
  { month: "May", earnings: 62000, bookings: 62, expenses: 15800 },
  { month: "Jun", earnings: 58000, bookings: 58, expenses: 14500 }
];

const transactionHistory = [
  {
    id: 1,
    type: "Credit",
    amount: 2500,
    description: "Basic Service - Rahul Sharma",
    date: "2024-01-25",
    status: "Completed"
  },
  {
    id: 2,
    type: "Credit",
    amount: 4500,
    description: "Battery Replacement - Priya Patel",
    date: "2024-01-26",
    status: "Completed"
  },
  {
    id: 3,
    type: "Debit",
    amount: 1800,
    description: "Payout to Bank Account",
    date: "2024-01-27",
    status: "Processing"
  },
  {
    id: 4,
    type: "Credit",
    amount: 3200,
    description: "Brake Service - Sneha Singh",
    date: "2024-01-28",
    status: "Completed"
  }
];

const payoutMethods = [
  {
    id: 1,
    type: "Bank Account",
    details: "HDFC Bank - ****1234",
    isDefault: true,
    status: "Active"
  },
  {
    id: 2,
    type: "UPI",
    details: "autocare@hdfc",
    isDefault: false,
    status: "Active"
  }
];

export default function Earnings() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState(1);

  const totalEarnings = earningsData.reduce((sum, month) => sum + month.earnings, 0);
  const totalBookings = earningsData.reduce((sum, month) => sum + month.bookings, 0);
  const totalExpenses = earningsData.reduce((sum, month) => sum + month.expenses, 0);
  const netEarnings = totalEarnings - totalExpenses;
  const averagePerBooking = totalEarnings / totalBookings;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
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
              <h1 className="text-3xl font-bold text-gray-800">Earnings & Payouts</h1>
              <p className="text-gray-600">Track your earnings, manage payouts, and view transaction history</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalEarnings.toLocaleString('en-US')}</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12.5% from last month
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Net Earnings</p>
                  <p className="text-2xl font-bold text-blue-600">₹{netEarnings.toLocaleString('en-US')}</p>
                  <p className="text-sm text-blue-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8.3% from last month
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-purple-600">{totalBookings}</p>
                  <p className="text-sm text-purple-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +15.2% from last month
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. per Booking</p>
                  <p className="text-2xl font-bold text-orange-600">₹{averagePerBooking.toFixed(0)}</p>
                  <p className="text-sm text-orange-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +5.7% from last month
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Earnings Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Monthly Earnings</CardTitle>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="3months">Last 3 Months</option>
                    <option value="6months">Last 6 Months</option>
                    <option value="12months">Last 12 Months</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earningsData.map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="font-medium">{month.month}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₹{month.earnings.toLocaleString('en-US')}</p>
                        <p className="text-sm text-gray-600">{month.bookings} bookings</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payout Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Payout Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payoutMethods.map((method) => (
                    <div key={method.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          {method.type === "Bank Account" ? (
                            <Bank className="w-5 h-5 text-blue-500 mr-2" />
                          ) : (
                            <Smartphone className="w-5 h-5 text-green-500 mr-2" />
                          )}
                          <h3 className="font-medium">{method.type}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {method.isDefault && (
                            <Badge className="bg-green-100 text-green-800">Default</Badge>
                          )}
                          <Badge className={getStatusColor(method.status)}>
                            {method.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{method.details}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Add New Payout Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Transaction History</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-semibold">Type</th>
                      <th className="text-left p-4 font-semibold">Description</th>
                      <th className="text-left p-4 font-semibold">Amount</th>
                      <th className="text-left p-4 font-semibold">Date</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-left p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center">
                            {transaction.type === "Credit" ? (
                              <ArrowUpRight className="w-4 h-4 text-green-500 mr-2" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-500 mr-2" />
                            )}
                            <span className={`font-medium ${transaction.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
                              {transaction.type}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium">{transaction.description}</p>
                        </td>
                        <td className="p-4">
                          <p className={`font-bold ${transaction.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
                            {transaction.type === "Credit" ? "+" : "-"}₹{transaction.amount}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-600">{transaction.date}</p>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
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
