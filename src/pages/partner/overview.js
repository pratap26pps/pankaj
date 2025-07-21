import React from 'react';
import { FaDollarSign, FaCalendar, FaCheckCircle, FaStar, FaUser } from 'react-icons/fa';

// Dummy data for demonstration
const partnerData = {
    totalEarnings: 125000,
    totalBookings: 320,
    completedServices: 295,
    rating: 4.7,
};

const filteredBookings = [
    {
        id: 1,
        customerName: 'Amit Sharma',
        serviceType: 'Home Cleaning',
        amount: 1500,
        status: 'Completed',
    },
    {
        id: 2,
        customerName: 'Priya Singh',
        serviceType: 'AC Repair',
        amount: 1200,
        status: 'In Progress',
    },
    {
        id: 3,
        customerName: 'Rahul Verma',
        serviceType: 'Plumbing',
        amount: 800,
        status: 'Cancelled',
    },
];

const PartnerOverview = () => {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                            <p className="text-2xl font-bold text-gray-900">₹{partnerData.totalEarnings.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <FaDollarSign className="text-green-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                            <p className="text-2xl font-bold text-gray-900">{partnerData.totalBookings}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FaCalendar className="text-blue-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Completed Services</p>
                            <p className="text-2xl font-bold text-gray-900">{partnerData.completedServices}</p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <FaCheckCircle className="text-emerald-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Rating</p>
                            <p className="text-2xl font-bold text-gray-900">{partnerData.rating}/5</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <FaStar className="text-yellow-600 text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <FaUser className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{booking.customerName}</p>
                                        <p className="text-sm text-gray-600">{booking.serviceType}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-900">₹{booking.amount}</p>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        booking.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerOverview;