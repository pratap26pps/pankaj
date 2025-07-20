import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaUserTimes } from "react-icons/fa";

// Dummy Card and Button components (replace with your UI library if needed)
const Card = ({ children, className }) => (
    <div className={`bg-white rounded-lg ${className}`}>{children}</div>
);
const CardContent = ({ children, className }) => (
    <div className={className}>{children}</div>
);
const Button = ({ children, className, ...props }) => (
    <button className={`flex items-center px-4 py-2 rounded ${className}`} {...props}>
        {children}
    </button>
);

// Dummy users data
const initialUsersData = [
    {
        id: 1,
        name: "Amit Sharma",
        email: "amit@example.com",
        type: "Partner",
        status: "Pending",
        avatar: "AS",
    },
    {
        id: 2,
        name: "Priya Singh",
        email: "priya@example.com",
        type: "Partner",
        status: "Pending",
        avatar: "PS",
    },
    {
        id: 3,
        name: "John Doe",
        email: "john@example.com",
        type: "Customer",
        status: "Active",
        avatar: "JD",
    },
];

export default function VerifyPartner() {
    const [usersData, setUsersData] = useState(initialUsersData);

    const handleApprove = (id) => {
        setUsersData((prev) =>
            prev.map((u) =>
                u.id === id ? { ...u, status: "Approved" } : u
            )
        );
    };

    const handleReject = (id) => {
        setUsersData((prev) =>
            prev.map((u) =>
                u.id === id ? { ...u, status: "Rejected" } : u
            )
        );
    };

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
                        {usersData
                            .filter((u) => u.type === "Partner" && u.status === "Pending")
                            .map((partner) => (
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
                                        <Button
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                                            onClick={() => handleApprove(partner.id)}
                                        >
                                            <FaCheck className="mr-2" />
                                            Approve
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-red-300 text-red-600 hover:bg-red-50 border"
                                            onClick={() => handleReject(partner.id)}
                                        >
                                            <FaUserTimes className="mr-2" />
                                            Reject
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        {usersData.filter((u) => u.type === "Partner" && u.status === "Pending").length === 0 && (
                            <div className="text-center text-gray-500 py-8">No pending partners to verify.</div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}