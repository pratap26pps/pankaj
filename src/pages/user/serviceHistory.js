import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHistory, FaSpinner, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

// Dummy Card and CardContent components
const Card = ({ children, className }) => (
    <div className={`rounded-xl ${className}`}>{children}</div>
);
const CardContent = ({ children, className }) => (
    <div className={className}>{children}</div>
);

const ServiceHistory = () => {
  const [serviceBookings, setServiceBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchServiceHistory();
  }, [user]);

  const fetchServiceHistory = async () => {
    try {
      setLoading(true);
      let url = '/api/service-booking';
      
      // If user is logged in and has phone number, filter by phone
      if (user?.phone) {
        url += `?phone=${user.phone}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setServiceBookings(data.data);
        setPagination(data.pagination);
      } else {
        setError(data.message || 'Failed to fetch service history');
      }
    } catch (err) {
      console.error('Error fetching service history:', err);
      setError('Failed to load service history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'in-progress':
        return <FaClock className="text-blue-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center py-24"
      >
        <FaSpinner className="animate-spin text-4xl text-emerald-600" />
        <span className="ml-3 text-lg text-gray-600">Loading service history...</span>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-24 text-center"
      >
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button
          onClick={fetchServiceHistory}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <Card className="border-0 py-24    ">
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaHistory className="mr-3 text-emerald-600" />
                    Service History
                </h2>
                {serviceBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <FaHistory className="mx-auto text-6xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Service History</h3>
                    <p className="text-gray-500">You haven't booked any services yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {serviceBookings.map((booking) => (
                      <motion.div
                        key={booking._id}
                        whileHover={{ scale: 1.02 }}
                        className=" border   rounded-lg p-6 hover:shadow-md transition-all duration-200 "
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-800">Booking #{booking.bookingId}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-1">
                              <strong>Vehicle:</strong> {booking.vehicleType}
                              {booking.regNumber && ` (${booking.regNumber})`}
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                              <strong>Services:</strong> {booking.services.join(', ')}
                              {booking.servicesOther && ` + ${booking.servicesOther}`}
                            </p>
                            <p className="text-gray-600 text-sm">
                              <strong>Mode:</strong> {booking.mode}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              {getStatusIcon(booking.status)}
                            </div>
                            <div className="text-gray-500 text-sm mb-1">
                              <strong>Scheduled:</strong> {formatDate(booking.date)}
                            </div>
                            <div className="text-gray-500 text-sm">
                              <strong>Booked:</strong> {formatDate(booking.createdAt)}
                            </div>
                            {booking.timeSlot && (
                              <div className="text-gray-500 text-sm">
                                <strong>Time:</strong> {booking.timeSlot}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Additional Details */}
                        <div className="border-t pt-3 mt-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <strong>Contact:</strong> {booking.phone}
                              {booking.email && ` | ${booking.email}`}
                            </div>
                            <div>
                              <strong>Address:</strong> {booking.address}, {booking.cityState}
                            </div>
                            {booking.plan && (
                              <div>
                                <strong>Plan:</strong> {booking.plan}
                              </div>
                            )}
                            {booking.payment && (
                              <div>
                                <strong>Payment:</strong> {booking.payment}
                              </div>
                            )}
                          </div>
                          {booking.notes && (
                            <div className="mt-2 text-sm text-gray-600">
                              <strong>Notes:</strong> {booking.notes}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Pagination Info */}
                    {pagination && pagination.totalCount > 0 && (
                      <div className="text-center text-sm text-gray-500 mt-6">
                        Showing {serviceBookings.length} of {pagination.totalCount} bookings
                        {pagination.totalPages > 1 && (
                          <span> (Page {pagination.currentPage} of {pagination.totalPages})</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
            </CardContent>
        </Card>
    </motion.div>
  );
};

export default ServiceHistory;