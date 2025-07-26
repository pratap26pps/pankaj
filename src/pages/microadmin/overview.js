import React from "react";
import { FaUser } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";

 
export default function MicroAdminOverview() {
    const userData = useSelector((state) => state.auth.user);
    console.log(userData);
    return (
        <div
            className="space-y-6"
            style={{
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 0.5s, transform 0.5s",
            }}
        >
            <Card className=" bg-green-50 ">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <FaUser className="mr-3 text-emerald-600" />
                        Profile Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Name:</span>
                                    <span className="font-medium">{userData?.name || userData?.firstName + " " + userData?.lastName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="font-medium">{userData?.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Phone:</span>
                                    <span className="font-medium">{userData?.mobile}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Address:</span>
                                    <span className="font-medium">{userData?.address}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Bloodgroup:</span>
                                    <span className="font-medium">{userData?.bloodgroup}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Pincode:</span>
                                    <span className="font-medium">{userData?.pincode}</span>
                                </div>
                               
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">EV Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Year of Experience:</span>
                                    <span className="font-medium">{userData?.yearofexperience}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Bank Account Number:</span>
                                    <span className="font-medium">{userData?.bankaccountnumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Bank Name:</span>
                                    <span className="font-medium">{userData?.bankname}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">IFSC:</span>
                                    <span className="font-medium">{userData?.ifsc}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Adhar Number:</span>
                                    <span className="font-medium">{userData?.adharNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Pan Number:</span>
                                    <span className="font-medium">{userData?.panNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
 
        </div>
    );
}