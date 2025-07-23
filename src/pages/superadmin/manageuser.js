import React, { useState} from "react";
import { motion } from "framer-motion";
import { FaSearch, FaPlus, FaUsers, FaTools } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
 

export default function ManageUserPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [User, setUser] = useState([]);

    const partner = User.filter((u) => u.accountType === "Partner");
    const admin = User.filter((u) => u.accountType === "Admin");

      useEffect(() => {
        async function fetchUsers() {
          try {
           
            const res = await fetch("/api/admin/getusers");
            const data = await res.json();
            console.log("data",data)
            if (res.ok && data.user) {
              setUser(
                data.user.map((u, idx) => ({
                  id: u._id,
                  name: `${u.firstName} ${u.lastName}`,
                  email: u.email,
                  mobile: u.mobile,
                  accountType: u.accountType,
                  orders: [],  
                }))
              );
            
            }
          } catch (err) {
             console.log(err)
          }
        }
        fetchUsers();
      }, []);
   
   
        console.log("Partner",partner);
        console.log("Admin", admin);
 
      
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    Manage Partner & Admin
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
                    
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Users */}
                <Card className="shadow-lg border-0">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <FaUsers className="mr-2 text-emerald-600" />
                            Partner ({partner.length})
                        </h3>
                        <div className="space-y-4">
                            {partner?.map((user) => (
                                <motion.div
                                    key={user?._id}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                                            <span className="font-semibold text-emerald-600">
                                                {user?.avatar}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{user?.name}</p>
                                            <p className="text-sm text-gray-600">{user?.email}</p>
                                            <p className="text-xs text-gray-500">
                                                Last active: {user?.lastActive}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge
                                            className={
                                                user?.status === "Active"
                                                    ? "bg-emerald-100 text-emerald-800"
                                                    : "bg-orange-100 text-orange-800"
                                            }
                                        >
                                            {user?.status}
                                        </Badge>
                                        <p className="text-sm text-gray-600 mt-1">{user?.role}</p>
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
                            <FaUsers className="mr-2 text-emerald-600" />
                            Admin ({admin.length})
                        </h3>
                        <div className="space-y-4">
                            {admin?.map((user) => (
                                <motion.div
                                    key={user?._id}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                                            <span className="font-semibold text-emerald-600">
                                                {user?.avatar}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{user?.name}</p>
                                            <p className="text-sm text-gray-600">{user?.email}</p>
                                            <p className="text-xs text-gray-500">
                                                Last active: {user?.lastActive}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge
                                            className={
                                                user?.status === "Active"
                                                    ? "bg-emerald-100 text-emerald-800"
                                                    : "bg-orange-100 text-orange-800"
                                            }
                                        >
                                            {user?.status}
                                        </Badge>
                                        <p className="text-sm text-gray-600 mt-1">{user?.role}</p>
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