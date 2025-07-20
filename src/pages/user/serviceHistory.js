import React from "react";
import { motion } from "framer-motion";
import { FaHistory } from "react-icons/fa";

// Dummy Card and CardContent components
const Card = ({ children, className }) => (
    <div className={`rounded-xl ${className}`}>{children}</div>
);
const CardContent = ({ children, className }) => (
    <div className={className}>{children}</div>
);

const ServiceHistory = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <Card className="border-0 py-24 shadow-lg bg-gradient-to-br from-white to-gray-50">
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

export default ServiceHistory;