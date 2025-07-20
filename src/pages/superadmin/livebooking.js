import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaBookOpen, FaEye } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Sample bookings data
const bookingsData = [
    {
        id: 101,
        service: "Car Wash",
        user: "Amit Sharma",
        center: "Downtown Center",
        amount: 499,
        status: "Confirmed",
        dispute: false,
    },
    {
        id: 102,
        service: "Bike Service",
        user: "Priya Singh",
        center: "Uptown Garage",
        amount: 299,
        status: "Completed",
        dispute: false,
    },
    {
        id: 103,
        service: "Car Detailing",
        user: "Rahul Verma",
        center: "City Center",
        amount: 999,
        status: "Pending",
        dispute: true,
    },
];

export default function LiveBookingPage() {
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
                                        ? "bg-red-50 border-red-200"
                                        : "bg-gray-50 border-gray-200"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                                                booking.dispute ? "bg-red-100" : "bg-emerald-100"
                                            }`}
                                        >
                                            {booking.dispute ? (
                                                <FaExclamationTriangle className="text-red-600" />
                                            ) : (
                                                <FaBookOpen className="text-emerald-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                Booking #{booking.id}
                                            </p>
                                            <p className="text-sm text-gray-600">{booking.service}</p>
                                            <p className="text-xs text-gray-500">
                                                {booking.user} • {booking.center}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-800">
                                            ₹{booking.amount}
                                        </p>
                                        <Badge
                                            className={
                                                booking.dispute
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-emerald-100 text-emerald-800"
                                            }
                                        >
                                            {booking.dispute ? "Dispute" : booking.status}
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
}