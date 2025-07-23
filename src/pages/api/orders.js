import connectDB from '@/lib/dbConnect';
import Order from '@/models/Order';
import User from '@/models/users';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { status, limit = 50, page = 1, userId, orderId } = req.query;
      
      // Build query filter
      const filter = {};
      if (status) filter.status = status;
      if (userId) filter.user = userId;
      if (orderId) filter.orderId = orderId;
      
      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Fetch orders with user details populated
      const orders = await Order.find(filter)
        .populate('user', 'firstName lastName email mobile phone') // Populate user details
        .sort({ createdAt: -1 }) // Most recent first
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'); // Exclude version field
      
      // Get total count for pagination
      const totalCount = await Order.countDocuments(filter);
      
      // Transform data for frontend consumption
      const transformedOrders = orders.map(order => ({
        _id: order._id,
        orderId: order.orderId,
        user: {
          name: order.user ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim() : 'Unknown User',
          email: order.user?.email,
          phone: order.user?.mobile || order.user?.phone
        },
        items: order.items,
        totalAmount: order.totalAmount,
        status: order.status || 'pending',
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        // Calculate if this might be a disputed order (you can customize this logic)
        dispute: order.status === 'cancelled' || order.status === 'refunded',
        // Extract service details for service packages
        serviceDetails: order.items?.map(item => ({
          packageName: item.packageName,
          selectedProblems: item.selectedProblems,
          carBrand: item.carBrand,
          carModel: item.carModel,
          warranty: item.warranty,
          duration: item.duration
        })).filter(item => item.packageName) // Only include service packages
      }));
      
      res.status(200).json({
        success: true,
        data: transformedOrders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / parseInt(limit)),
          totalCount,
          hasNext: skip + orders.length < totalCount,
          hasPrev: parseInt(page) > 1
        }
      });
      
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      });
    }
    return;
  }

  if (req.method === 'PUT') {
    try {
      const { orderId } = req.query;
      const { status } = req.body;
      
      if (!orderId || !status) {
        return res.status(400).json({
          success: false,
          message: 'Order ID and status are required'
        });
      }
      
      const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status provided'
        });
      }
      
      const updatedOrder = await Order.findOneAndUpdate(
        { orderId },
        { status, updatedAt: new Date() },
        { new: true }
      ).populate('user', 'firstName lastName email mobile phone');
      
      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        data: updatedOrder
      });
      
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order',
        error: error.message
      });
    }
    return;
  }

  res.status(405).json({ message: 'Method not allowed' });
}
