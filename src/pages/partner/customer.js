"use client"; // only if you're using app router

import { useState } from "react";
import { motion } from "framer-motion";

const dummyCustomers = [
  {
    id: "1",
    name: "Amit Sharma",
    vehicle: "Tata Nexon EV",
    phone: "9876543210",
    totalSpent: "₹8,500",
    status: "Active",
    avatar: "AS",
  },
  {
    id: "2",
    name: "Priya Verma",
    vehicle: "Ola S1",
    phone: "9998887776",
    totalSpent: "₹4,200",
    status: "Inactive",
    avatar: "PV",
  },
  {
    id: "3",
    name: "Rahul Yadav",
    vehicle: "Hero Electric Optima",
    phone: "9876541230",
    totalSpent: "₹7,000",
    status: "Active",
    avatar: "RY",
  },
];

export default function CustomersPage() {
  const [customersData] = useState(dummyCustomers);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 space-y-6 max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Customer Management</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {customersData.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
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
                <div className="text-right space-y-1">
                  <p className="font-medium text-gray-900">{customer.totalSpent}</p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {customer.status}
                  </span>
                </div>
              </div>
            ))}

            {customersData.length === 0 && (
              <p className="text-center text-gray-500">No customers found.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
