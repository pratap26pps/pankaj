import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHistory, FaSpinner, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

// Dummy Card and CardContent components
const Card = ({ children, className }) => (
    <div className={`rounded-xl ${className}`}>{children}</div>
);
const CardContent = ({ children, className }) => (
    <div className={className}>{children}</div>
);

const   BookingFormHistory = () => {
  const [serviceBookings, setServiceBookings] = useState([]);
  console.log(serviceBookings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const user = useSelector((state) => state.auth.user);

  // Status options for Admin and SuperAdmin
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
    { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

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

  // Function to update booking status
  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      setUpdatingStatus(bookingId);
      
      const response = await fetch(`/api/service-booking/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the local state
        setServiceBookings(prev => 
          prev.map(booking => 
            booking._id === bookingId 
              ? { ...booking, status: newStatus }
              : booking
          )
        );
        
        // Show success message
        toast.success(`Booking status updated to ${newStatus}`);
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update booking status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Check if user can change status
  const canChangeStatus = user?.accountType === 'Admin' || user?.accountType === 'SuperAdmin';

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchValue);
  };

  // Filter bookings based on search term
  const filteredBookings = serviceBookings.filter((booking) => {
    if (!searchTerm) return true;
    return booking.bookingId && booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
      case 'processing':
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
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
        <Card className="border-0">
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaHistory className="mr-3 text-emerald-600" />
                        Booking Form History
                    </h2>
                    
                    {/* Search Field */}
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search by Booking ID..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            Search
                        </button>
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSearchValue("");
                                }}
                                className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </form>
                </div>
                {serviceBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <FaHistory className="mx-auto text-6xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Service History</h3>
                    <p className="text-gray-500">You haven't booked any services yet.</p>
                  </div>
                ) : filteredBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <FaHistory className="mx-auto text-6xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Bookings Found</h3>
                    <p className="text-gray-500">No bookings match your search criteria: "{searchTerm}"</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
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
                              
                              {/* Status Change Controls for Admin/SuperAdmin */}
                              {canChangeStatus && (
                                <div className="flex items-center gap-2 ml-2">
                                  <div className="relative">
                                    <select
                                      value={booking.status}
                                      onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                                      disabled={updatingStatus === booking._id}
                                      className={`text-xs border rounded-md px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                        updatingStatus === booking._id 
                                          ? 'bg-gray-100 cursor-not-allowed border-gray-300' 
                                          : 'bg-white border-gray-300 hover:border-gray-400 cursor-pointer'
                                      }`}
                                    >
                                      {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                    {updatingStatus === booking._id && (
                                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                        <svg className="animate-spin h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-500 font-medium">Change Status</span>
                                </div>
                              )}
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

export default BookingFormHistory;