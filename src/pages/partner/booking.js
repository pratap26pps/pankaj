"use client"; // Only needed in app router

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const dummyBookings = [
  {
    id: "1",
    customerName: "Amit Sharma",
    vehicleModel: "Tata Nexon EV",
    serviceType: "Battery Replacement",
    amount: 4500,
    status: "Completed",
  },
  {
    id: "2",
    customerName: "Priya Verma",
    vehicleModel: "Ola S1",
    serviceType: "Brake Check",
    amount: 1500,
    status: "In Progress",
  },
  {
    id: "3",
    customerName: "Rahul Yadav",
    vehicleModel: "Hero Electric Optima",
    serviceType: "General Service",
    amount: 1200,
    status: "Cancelled",
  },
];

export default function BookingsPage() {
  const [bookingSearch, setBookingSearch] = useState("");
  const [filteredBookings, setFilteredBookings] = useState(dummyBookings);

  useEffect(() => {
    const filtered = dummyBookings.filter((b) =>
      b.customerName.toLowerCase().includes(bookingSearch.toLowerCase())
    );
    setFilteredBookings(filtered);
  }, [bookingSearch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 space-y-6 max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search bookings..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <div className="text-right space-y-1">
                    <p className="font-medium text-gray-900">₹{booking.amount}</p>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredBookings.length === 0 && (
              <p className="text-center text-gray-500">No bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
