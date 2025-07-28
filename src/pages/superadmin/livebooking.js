import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle,FaEye, FaSpinner, FaSyncAlt, FaShoppingCart, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from 'sonner';

// Simple component replacements
const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
        {children}
    </div>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

const Badge = ({ children, className = "", variant = "default" }) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    const variantClasses = {
        default: "bg-blue-100 text-blue-800",
        secondary: "bg-gray-100 text-gray-800",
        destructive: "bg-red-100 text-red-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800"
    };
    return (
        <span className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`}>
            {children}
        </span>
    );
};

const Button = ({ children, className = "", size = "default", onClick, disabled = false, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const sizeClasses = {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8"
    };
    return (
        <button 
            className={`${baseClasses} ${sizeClasses[size]} bg-blue-600 text-white hover:bg-blue-700 ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};



export default function LiveBookingPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(null);

    // Status options for dropdown
    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    useEffect(() => {
        fetchOrders();
    }, [statusFilter]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            let url = '/api/orders?limit=20';
            if (statusFilter) {
                url += `&status=${statusFilter}`;
            }
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.success) {
                setOrders(data.data);
                setPagination(data.pagination);
                setError(null);
            } else {
                setError(data.message || 'Failed to fetch orders');
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const refreshOrders = async () => {
        setRefreshing(true);
        await fetchOrders();
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            console.log('Updating order status:', { orderId, newStatus });
            setUpdatingStatus(orderId);
            
            if (!orderId) {
                throw new Error('Order ID is required');
            }
            
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Update the specific order in the state
                setOrders(prev => 
                    prev.map(order => 
                        order._id === orderId 
                            ? { ...order, status: newStatus } 
                            : order
                    )
                );
                
                toast.success(`Order status updated to ${newStatus}`);
            } else {
                throw new Error(data.message || 'Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status');
        } finally {
            setUpdatingStatus(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-emerald-100 text-emerald-800';
            case 'cancelled':
            case 'refunded':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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
                <span className="ml-3 text-lg text-gray-600">Loading orders...</span>
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
                <Button onClick={fetchOrders} className="bg-emerald-600 hover:bg-emerald-700">
                    <FaSyncAlt className="mr-2" />
                    Try Again
                </Button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Header with filters */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Orders & Management</h2>
                <div className="flex gap-4 items-center">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <Button 
                        onClick={refreshOrders} 
                        disabled={refreshing}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        <FaSyncAlt className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Statistics */}
            {pagination && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-emerald-600">{pagination.totalCount}</div>
                            <div className="text-sm text-gray-600">Total Orders</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === 'pending').length}</div>
                            <div className="text-sm text-gray-600">Pending</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'delivered').length}</div>
                            <div className="text-sm text-gray-600">Delivered</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-red-600">{orders.filter(o => o.dispute).length}</div>
                            <div className="text-sm text-gray-600">Disputes</div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <FaShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Found</h3>
                            <p className="text-gray-500">No orders match the current filter criteria.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <motion.div
                                    key={order._id}
                                    whileHover={{ scale: 1.01 }}
                                    className={`p-6 rounded-lg border ${
                                        order.dispute
                                            ? "bg-red-50 border-red-200"
                                            : "bg-gray-50 border-gray-200"
                                    }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start">
                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                                                    order.dispute ? "bg-red-100" : "bg-emerald-100"
                                                }`}
                                            >
                                                {order.dispute ? (
                                                    <FaExclamationTriangle className="text-red-600" />
                                                ) : (
                                                    <FaShoppingCart className="text-emerald-600" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <p className="font-semibold text-gray-800">
                                                        Order #{order.orderId}
                                                    </p>
                                                    <Badge className={getStatusColor(order.status)}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </Badge>
                                                    {order.dispute && (
                                                        <Badge className="bg-red-100 text-red-800">
                                                            Dispute
                                                        </Badge>
                                                    )}
                                                </div>
                                                
                                                {/* Customer Info */}
                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                    <div className="flex items-center gap-1">
                                                        <FaUser className="text-gray-400" />
                                                        <span>{order.user.name || 'Unknown User'}</span>
                                                    </div>
                                                    {order.user.phone && (
                                                        <div className="flex items-center gap-1">
                                                            <FaPhone className="text-gray-400" />
                                                            <span>{order.user.phone}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Order Items */}
                                                <div className="text-sm text-gray-600 mb-2">
                                                    <strong>Items ({order.items.length}):</strong>
                                                    <div className="ml-2">
                                                        {order.items.map((item, index) => (
                                                            <div key={index} className="mb-1">
                                                                {item.packageName ? (
                                                                    <span>
                                                                        {item.packageName} 
                                                                        {item.carBrand && `(${item.carBrand} - ${item.carModel})`}
                                                                        - ₹{item.price} × {item.quantity}
                                                                    </span>
                                                                ) : (
                                                                    <span>Product ID: {item.product} - ₹{item.price} × {item.quantity}</span>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Address */}
                                                {order.shippingAddress && (
                                                    <div className="flex items-start gap-1 text-sm text-gray-600">
                                                        <FaMapMarkerAlt className="text-gray-400 mt-0.5" />
                                                        <span>
                                                            {order.shippingAddress.address}, {order.shippingAddress.city}, 
                                                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="text-right">
                                            <p className="font-semibold text-lg text-gray-800 mb-1">
                                                ₹{order.totalAmount}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-2">
                                                {formatDate(order.createdAt)}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Payment: {order.paymentMethod}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-between items-center pt-3 border-t">
                                        <div className="flex gap-2">
                                            {order.status === 'pending' && (
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => {
                                                        console.log('Order object:', order);
                                                        updateOrderStatus(order._id, 'confirmed');
                                                    }}
                                                    className="bg-emerald-600 hover:bg-emerald-700"
                                                    disabled={updatingStatus === order._id}
                                                >
                                                    Confirm Order
                                                </Button>
                                            )}
                                            {order.status === 'confirmed' && (
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => updateOrderStatus(order._id, 'processing')}
                                                    className="bg-blue-600 hover:bg-blue-700"
                                                    disabled={updatingStatus === order._id}
                                                >
                                                    Start Processing
                                                </Button>
                                            )}
                                            {order.status === 'processing' && (
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => updateOrderStatus(order._id, 'shipped')}
                                                    className="bg-purple-600 hover:bg-purple-700"
                                                    disabled={updatingStatus === order._id}
                                                >
                                                    Mark as Shipped
                                                </Button>
                                            )}
                                            {order.status === 'shipped' && (
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => updateOrderStatus(order._id, 'delivered')}
                                                    className="bg-green-600 hover:bg-green-700"
                                                    disabled={updatingStatus === order._id}
                                                >
                                                    Mark as Delivered
                                                </Button>
                                            )}
                                            {order.dispute && (
                                                <Button 
                                                    size="sm" 
                                                    className="bg-red-500 hover:bg-red-600"
                                                >
                                                    <FaEye className="mr-2" />
                                                    Resolve Dispute
                                                </Button>
                                            )}
                                        </div>
                                        
                                        {/* Status Change Dropdown */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500 font-medium">Change Status:</span>
                                            <div className="relative">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => {
                                                        console.log('Dropdown order object:', order);
                                                        updateOrderStatus(order._id, e.target.value);
                                                    }}
                                                    disabled={updatingStatus === order._id}
                                                    className={`text-xs border rounded-md px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                                                        updatingStatus === order._id 
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
                                                {updatingStatus === order._id && (
                                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                                        <svg className="animate-spin h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}