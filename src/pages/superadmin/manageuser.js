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
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedUser, setSelectedUser] = useState(null);

    const partner = User.filter((u) =>( u.accountType === "Partner") );
    const admin = User.filter((u) =>( u.accountType === "Admin") );

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
                  status: u.status,
                  vehicalRegistrationNumber: u.vehicalRegistrationNumber,
                  address: u.address,
                  adharNumber: u.adharNumber,
                  panNumber: u.panNumber,
                  emergencyContact: u.emergencyContact,
                  alternatecontact: u.alternatecontact,
                  bankaccountnumber: u.bankaccountnumber,
                  ifsc: u.ifsc,
                  bankname: u.bankname,
                  typeOfEntity: u.typeOfEntity,
                  yearofexperience: u.yearofexperience,
                  bloodgroup: u.bloodgroup,
                  pincode: u.pincode,
                  typeOfEntity: u.typeOfEntity,
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
        
        const handleUserClick = (user) => {
            setSelectedUser(user);
            setIsModalOpen(true);
          };
      
          const closeModal = () => {
            setIsModalOpen(false);
            setSelectedUser(null);
          };
      
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
                <Card  className="shadow-lg border-0">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <FaUsers className="mr-2 text-emerald-600" />
                            Partner ({partner.length})
                        </h3>
                        <div className="space-y-4">
                            {partner?.map((user) => (
                                <motion.div
                                onClick={() => handleUserClick(user)}
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
                                onClick={() => handleUserClick(user)} 
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
             {/* User Details Modal */}
                        {isModalOpen && selectedUser && (
                            <div className="fixed inset-0 pt-28    backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-200   flex items-center justify-center z-50 p-4">
                                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                    <div className="p-6 border-b border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-semibold text-gray-800">User Details</h3>
                                            <button
                                                onClick={closeModal}
                                                className="text-gray-400 hover:text-gray-600 text-2xl"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 space-y-6">
                                        {/* Basic Information */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.name || selectedUser.firstName + " " + selectedUser.lastName}</p>
                                            </div>
                                           
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.email || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                                                <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.mobile || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                                                <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.accountType || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                                <p className={`p-2 rounded font-medium ${
                                                    selectedUser.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                    selectedUser.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {selectedUser.status || 'Pending'}
                                                </p>
                                            </div>
                                        </div>
            
                                        {/* Admin/Partner specific fields */}
                                        {(selectedUser.accountType === 'Admin' || selectedUser.accountType === 'Partner') && (
                                            <>
                                                <div className="border-t pt-3">
                                                    <h4 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {selectedUser.adharNumber && (
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                                                                <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.adharNumber}</p>
                                                            </div>
                                                        )}
                                                        {selectedUser.panNumber && (
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                                                                <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.panNumber}</p>
                                                            </div>
                                                        )}
                                                        {selectedUser.alternatecontact && (
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Contact</label>
                                                                <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.alternatecontact}</p>
                                                            </div>
                                                        )}
                                                        {selectedUser.emergencyContact && (
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                                                                <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.emergencyContact}</p>
                                                            </div>
                                                        )}
                                                        {selectedUser.bloodgroup && (
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                                                                <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.bloodgroup}</p>
                                                            </div>
                                                        )}
                                                        {selectedUser.yearofexperience && (
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                                                                <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.yearofexperience}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
            
                                                {selectedUser.address && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.address}</p>
                                                    </div>
                                                )}
            
                                                {selectedUser.pincode && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.pincode}</p>
                                                    </div>
                                                )}
            
                                                {selectedUser.accountType === 'Admin' && (
                                                    <div className="border-t pt-4">
                                                        <h4 className="text-lg font-medium text-gray-800 mb-4">Banking Information</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {selectedUser.bankname && (
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.bankname}</p>
                                                                </div>
                                                            )}
                                                            {selectedUser.bankaccountnumber && (
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.bankaccountnumber}</p>
                                                                </div>
                                                            )}
                                                            {selectedUser.ifsc && (
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                                                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.ifsc}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
            
                                                {selectedUser.accountType === 'Partner' && selectedUser.typeOfEntity && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type of Entity</label>
                                                        <p className="text-gray-900 bg-gray-50 p-2 rounded capitalize">{selectedUser.typeOfEntity}</p>
                                                    </div>
                                                )}
                                            </>
                                        )}
            
                                      
             
                                    
                                    </div>
                                </div>
                            </div>
                        )}
        </motion.div>
    );
}