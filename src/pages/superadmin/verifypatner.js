import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaUserTimes } from "react-icons/fa";
import { useEffect } from "react";

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
    
        const partner = User.filter((u) => u.accountType === "Partner" || u.accountType === "Admin");
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
                      role: u.role,
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

          const handleApprove = (id) => {
            setUser((prev) =>
                prev.map((u) => {
                    if (u.id === id) {
                        const role = u.accountType === "Partner" 
                            ? "Partner" 
                            : u.accountType === "Admin" 
                                ? "Admin" 
                                : u.role; // fallback to existing role if no match
                        return { ...u, role };
                    }
                    return u;
                })
            );
        };
        

    const handleReject = (id) => {
        setUser((prev) =>
            prev.map((u) =>
                u.id === id ? { ...u, accountType: "Rejected" } : u
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
                        {partner.map((partner) => (
                                <motion.div
                                    key={partner?._id}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center justify-between p-6 bg-orange-50 rounded-lg border border-orange-200"
                                >
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                                            <span className="font-semibold text-orange-600">{partner?.firstName?.charAt(0) + partner?.lastName?.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{partner?.firstName} {partner?.lastName}</p>
                                            <p className="text-sm text-gray-600">{partner?.email}</p>
                                            <p className="text-xs text-orange-600">Pending verification</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                                            onClick={() => handleApprove(partner?._id)}
                                        >
                                            <FaCheck className="mr-2" />
                                            Approve
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-red-300 text-red-600 hover:bg-red-50 border"
                                            onClick={() => handleReject(partner?._id)}
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
        </motion.div>
    );
}