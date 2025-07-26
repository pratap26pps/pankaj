import React from "react";
import { FaUser, FaTools } from "react-icons/fa";
import { ClipboardCheck, Loader, PackageCheck, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";

 
export default function UserOverview() {
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
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">EV Details</h3>
                            <div className="space-y-3">
                                {/* <div className="flex justify-between">
                                    <span className="text-gray-600">Model:</span>
                                    <span className="font-medium">{userData?.evDetails?.model}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Battery:</span>
                                    <span className="font-medium">{userData?.evDetails?.batteryCapacity}</span>
                                </div> */}
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Vehicle Registration Number:</span>
                                    <span className="font-medium">{userData?.vehicalRegistrationNumber}</span>
                                </div>
                                {/* <div className="flex justify-between">
                                    <span className="text-gray-600">Color:</span>
                                    <span className="font-medium">{userData?.evDetails?.color}</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <CardContent className="p-8">
                <div className="flex items-center mb-6 gap-3">
                    <FaTools className="text-gray-800 text-3xl" />
                    <h3 className="sm:text-2xl 2xl:text-5xl font-bold text-gray-800 tracking-wide">
                        Service Progress
                    </h3>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl border border-blue-100 shadow-inner">
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <ClipboardCheck className="text-white w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">Service Booked</h4>
                                <p className="text-sm text-slate-500">Your booking has been confirmed.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                                    <Loader className="text-white w-4 h-4 animate-spin" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">In Service</h4>
                                <p className="text-sm text-slate-500">Vehicle is currently being serviced.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <PackageCheck className="text-white w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">Ready for Pickup</h4>
                                <p className="text-sm text-slate-500">Service completed and ready for delivery.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <CheckCircle className="text-white w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">Completed</h4>
                                <p className="text-sm text-slate-500">Vehicle handed over to the customer.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </div>
    );
}