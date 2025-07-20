import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaPlus, FaUsers, FaTools } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dummy data for users and centers
const users = [
    {
        id: 1,
        avatar: "PP",
        name: "Pankaj Pratap",
        email: "pankaj@example.com",
        lastActive: "2 hours ago",
        status: "Active",
        type: "Admin",
    },
    {
        id: 2,
        avatar: "JS",
        name: "Jane Smith",
        email: "jane@example.com",
        lastActive: "1 day ago",
        status: "Inactive",
        type: "User",
    },
];

const centers = [
    {
        id: 1,
        avatar: "SC",
        name: "Service Center 1",
        email: "center1@example.com",
        totalBookings: 120,
        status: "Active",
    },
    {
        id: 2,
        avatar: "MC",
        name: "Main Center",
        email: "maincenter@example.com",
        totalBookings: 80,
        status: "Inactive",
    },
];

export default function ManageUserPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = useMemo(
        () =>
            users.filter(
                (u) =>
                    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [searchQuery]
    );

    const filteredCenters = useMemo(
        () =>
            centers.filter(
                (c) =>
                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.email.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [searchQuery]
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    Manage Users & Service Centers
                </h2>
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
                                            <span className="font-semibold text-emerald-600">
                                                {user.avatar}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{user.name}</p>
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                            <p className="text-xs text-gray-500">
                                                Last active: {user.lastActive}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge
                                            className={
                                                user.status === "Active"
                                                    ? "bg-emerald-100 text-emerald-800"
                                                    : "bg-orange-100 text-orange-800"
                                            }
                                        >
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
                                            <span className="font-semibold text-blue-600">
                                                {center.avatar}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {center.name}
                                            </p>
                                            <p className="text-sm text-gray-600">{center.email}</p>
                                            <p className="text-xs text-gray-500">
                                                {center.totalBookings} bookings
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge
                                            className={
                                                center.status === "Active"
                                                    ? "bg-emerald-100 text-emerald-800"
                                                    : "bg-orange-100 text-orange-800"
                                            }
                                        >
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
}