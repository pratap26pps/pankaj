import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaHistory,
  FaSpinner,
  FaClock,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

// Card wrappers (could be replaced with actual component libs)
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
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  const user = useSelector((state) => state.auth.user);
console.log("serviceBookings",serviceBookings)
   useEffect(() => {
    fetchServiceHistory();
  }, [user]);

  const submitForm = async (booking) => {
 
  try {
    const response = await fetch('/api/service-booking/newbooking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: booking.fullName,
        phone: booking.phone,
        address: booking.address,
        cityState: booking.cityState,
        vehicleType: booking.vehicleType,
        mode: booking.mode,
        date: booking.date,
        timeSlot: booking.timeSlot,  
        plan: booking.plan,         // optional
        services: booking.services,
        servicesOther: booking.servicesOther,
        email: booking.email,
        notes: booking.notes,
        agreeTerms: true,
        agreeRepair: true,
        userId: user._id,
      }),
    });

    const data = await response.json();
    console.log("data",data)

    if (data?.success) {
      toast.success(`Service booked successfully! Booking ID: ${data?.data?.newBooking?.bookingId}`);
     
    } else {
      toast.error(data?.message || 'Failed to book service');
      if (data?.errors) {
        data.errors.forEach(error => toast.error(error));
      }
    }
  } catch (error) {
    console.error('Booking submission error:', error);
    toast.error('Failed to submit booking. Please try again.');
  }
};

const fetchServiceHistory = async (page = 1, limit = 10) => {
  try {
    setLoading(true);
    let url = `/api/user-service-booking?page=${page}&limit=${limit}`;

    if (user?.email) {
      url += `&email=${user.email}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);

    if (data?.success) {
      setServiceBookings(data?.data);
      setPagination(data?.pagination);
      setShowModal(false);
      setSelectedBooking(null);
    } else {
      setError(data?.message || "Failed to fetch service history");
    }
  } catch (err) {
    setError("Failed to load service history");
  } finally {
    setLoading(false);
  }
};

 

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "confirmed":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
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
        <span className="ml-3 text-lg text-gray-600">
          Loading service history...
        </span>
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-0 py-24">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaHistory className="mr-3 text-emerald-600" />
            Service History
          </h2>
          <div className="flex justify-end mb-4">
  <Button
    className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all"
    onClick={fetchServiceHistory}
  >
    Refresh
  </Button>
</div>

          {serviceBookings.length === 0 ? (
            <div className="text-center py-12">
              <FaHistory className="mx-auto text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Service History
              </h3>
              <p className="text-gray-500">
                You haven't booked any services yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {serviceBookings.map((booking) => (
                <motion.div
                  key={booking?._id}
                  whileHover={{ scale: 1.01 }}
                  className="rounded-xl pb-8 p-8 lg:border  transition-all duration-200"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* User Details */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        User Details
                      </h3>
                      <table className="w-full  text-sm">
                        <tbody>
                          <tr>
                            <td className="font-semibold px-2 py-1">Booking ID</td>
                            <td className="px-2 py-1">#{booking?.bookingId}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold px-2 py-1">Status</td>
                            <td className="px-2 py-1">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  booking?.status
                                )}`}
                              >
                                {booking?.status.charAt(0).toUpperCase() +
                                  booking?.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="font-semibold px-2 py-1">Name</td>
                            <td className="px-2 py-1">{booking?.fullName}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold px-2 py-1">Contact</td>
                            <td className="px-2 py-1">
                              {booking?.phone}
                              {booking?.email && ` | ${booking?.email}`}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-semibold px-2 py-1">Address</td>
                            <td className="px-2 py-1">
                              {booking?.address}, {booking?.cityState}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                       {/* Booking Schedule */}
                       <div>
                      <h3 className="font-semibold md:mt:0 text-lg mb-2">
                        Booking Schedule
                      </h3>
                      <table className="w-full   text-sm">
                        <tbody>
                          <tr>
                            <td className="font-semibold px-2 py-1">Mode</td>
                            <td className="px-2 py-1">{booking?.mode}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold px-2 py-1">Scheduled</td>
                            <td className="px-2 py-1">
                              {formatDate(booking?.date)}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-semibold px-2 py-1">Booked On</td>
                            <td className="px-2 py-1">
                              {formatDate(booking?.createdAt)}
                            </td>
                          </tr>
                          {booking?.timeSlot && (
                            <tr>
                              <td className="font-semibold px-2 py-1">
                                Time Slot
                              </td>
                              <td className="px-2 py-1">{booking?.timeSlot}</td>
                            </tr>
                          )}
                          {booking?.notes && (
                            <tr>
                              <td className="font-semibold px-2 py-1">Notes</td>
                              <td className="px-2 py-1">{booking?.notes}</td>
                            </tr>
                          )}
                        </tbody>
                 
                      </table>

                    </div>

                    {/* Vehicle & Services */}
                    <div>
                      <h3 className="font-semibold  md:mt:0 text-lg mb-2">
                        Vehicle & Services
                      </h3>
                      <table className="w-full   text-sm">
                        <tbody>
                          <tr>
                            <td className="font-semibold px-2 py-1">Vehicle</td>
                            <td className="px-2 py-1">
                              {booking?.vehicleType}{" "}
                              {booking?.regNumber && `(${booking?.regNumber})`}
                            </td>
                          </tr>
                          <tr>  
                            <td className="font-semibold px-2 ">Services</td>
                           
                            <ol className="list-decimal  mt-10 mb-2 list-inside space-y-1">
                              {booking?.services?.map((service, index) => (
                                <li key={index}>{service}</li>
                              ))}
                            </ol>
                          
                          </tr>
                          {booking?.plan && (
                            <tr>
                              <td className="font-semibold px-2 py-1">Plan</td>
                              <td className="px-2 py-1">{booking?.plan}</td>
                            </tr>
                          )}
                          {booking?.payment && (
                            <tr>
                              <td className="font-semibold px-2 py-1">
                                Payment
                              </td>
                              <td className="px-2 py-1">{booking?.payment}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {booking?.status === "completed" && (
          
                      <Button
                      className="text-center mt-2 bg-blue-600 w-40 h-10 text-white cursor-pointer hover:bg-blue-800 hover:border-blue-600 transition-all duration-200 rounded-full"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowModal(true);
                      }}
                    >
                      Book Again
                    </Button>
        
              
              )}
                    </div>

                 
                  </div>
                </motion.div>
              ))}

{showModal && selectedBooking && (
  <div className="fixed inset-0 z-50 bg-black/50 h-screen flex justify-center items-center">
    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Reschedule Booking</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          className="w-full border rounded px-2 py-1"
          value={selectedBooking?.date?.split('T')[0]}
          onChange={(e) =>
            setSelectedBooking({ ...selectedBooking, date: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Time Slot</label>
        <input
          type="text"
          placeholder="e.g., 10:00 AM - 12:00 PM"
          className="w-full border rounded px-2 py-1"
          value={selectedBooking?.timeSlot || ''}
          onChange={(e) =>
            setSelectedBooking({ ...selectedBooking, timeSlot: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Mode</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={selectedBooking?.mode || ''}
          onChange={(e) =>
            setSelectedBooking({ ...selectedBooking, mode: e.target.value })
          }
        >
          <option value="pickup">Pickup</option>
          <option value="drop">Drop</option>
          <option value="onsite">Onsite</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => {
            setShowModal(false);
            setSelectedBooking(null);
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-emerald-600 text-white rounded"
          onClick={() => {
            submitForm(selectedBooking);
            setShowModal(false);
            setSelectedBooking(null);
          }}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  </div>
)}


              {/* Pagination */}
              {pagination && pagination.totalCount > 0 && (
                <div className="text-center text-sm text-gray-500 mt-6">
                  Showing {serviceBookings.length} of {pagination.totalCount}{" "}
                  bookings
                  {pagination.totalPages > 1 && (
                    <span>
                      {" "}
                      (Page {pagination.currentPage} of{" "}
                      {pagination.totalPages})
                    </span>
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
