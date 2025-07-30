import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaUserTimes } from "react-icons/fa";
import { useEffect } from "react";
import { toast } from 'sonner';

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

 
export default function VerifyPartner() {
 


        const [User, setUser] = useState([]);
        const [selectedUser, setSelectedUser] = useState(null);
        const [isModalOpen, setIsModalOpen] = useState(false);
    
        const partner = User.filter((u) => (u.accountType === "Partner" || u.accountType === "Admin" ) && (u.status === "Rejected" || u.status === "Pending"));
        console.log("partner",partner)
      
    
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

          const handleApprove = async (id) => {
            try {
              const response = await fetch('/api/users/update-status', {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: id,
                  status: 'Approved'
                })
              });
              
              if (response.ok) {
                const data = await response.json();

                if(data.status === "Approved"){
                setUser( null)
                toast.success(`User approved successfully`);
                }
              } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to approve user');
              }
            } catch (error) {
              console.error('Error approving user:', error);
              toast.error('Failed to approve user');
            }
          };
        

    const handleReject = async (id) => {
      try {
        const response = await fetch('/api/users/update-status', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: id,
            status: 'Rejected'
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          if(data.status === "Rejected"){
          setUser(null)
          toast.success(`User rejected successfully`);
          }
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Failed to reject user');
        }
      } catch (error) {
        console.error('Error rejecting user:', error);
        toast.error('Failed to reject user');
      }
    };

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
            <h2 className="text-2xl font-bold text-gray-800">Verify Service Partners</h2>
            <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                    <div className="space-y-4">
                        {partner.map((partner) => (
                                <motion.div
                                    key={partner?.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center justify-between p-6 bg-orange-50 rounded-lg border border-orange-200"
                                >
                                    <div 
                                        className="flex items-center cursor-pointer flex-1"
                                        onClick={() => handleUserClick(partner)}
                                    >
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                                            <span className="font-semibold text-orange-600">{partner?.firstName?.charAt(0) + partner?.lastName?.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{partner?.firstName} {partner?.lastName}</p>
                                            <p className="text-sm text-gray-600">{partner?.email}</p>
                                            <p className="text-xs text-orange-600">Pending verification - Click to view details</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white"
                                            onClick={() => handleApprove(partner?.id)}
                                        >
                                            <FaCheck className="mr-2" />
                                            Approve
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-red-300 cursor-pointer text-red-600 hover:bg-red-50 border"
                                            onClick={() => handleReject(partner?.id)}
                                        >
                                            <FaUserTimes className="mr-2" />
                                            Reject
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        {partner.filter((u) => u.accountType === "Partner").length === 0  || partner.filter((u) => u.accountType === "Admin").length === 0 ? (
                            <div className="text-center text-gray-500 py-8">No pending partners to verify.</div>
                        ) : null}
                    </div>
                </CardContent>
            </Card>

            {/* User Details Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0  pt-20   backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-200   flex items-center justify-center z-50 p-4">
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.firstName || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.lastName || 'N/A'}</p>
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
                                    <div className="border-t pt-4">
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

                            {/* User specific fields */}
                            {selectedUser.accountType === 'User' && selectedUser.vehicalRegistrationNumber && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Registration Number</label>
                                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedUser.vehicalRegistrationNumber}</p>
                                </div>
                            )}

                            {/* Action buttons in modal */}
                            <div className="border-t pt-4 flex justify-end space-x-3">
                                <Button
                                    className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white"
                                    onClick={() => {
                                        handleApprove(selectedUser.id);
                                        closeModal();
                                    }}
                                >
                                    <FaCheck className="mr-2" />
                                    Approve
                                </Button>
                                <Button
                                    className="border-red-300 cursor-pointer text-red-600 hover:bg-red-50 border"
                                    onClick={() => {
                                        handleReject(selectedUser.id);
                                        closeModal();
                                    }}
                                >
                                    <FaUserTimes className="mr-2" />
                                    Reject
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}