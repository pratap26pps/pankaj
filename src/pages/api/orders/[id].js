import connectDB from '@/lib/dbConnect';
import Order from '@/models/Order';

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const { status } = req.body;

      // Validate status
      const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Valid statuses are: ' + validStatuses.join(', ')
        });
      }

      // Find and update the order by _id
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { 
          status,
          updatedAt: new Date()
        },
        { 
          new: true,
          runValidators: true
        }
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
      console.error('Error updating order status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order status',
        error: error.message
      });
    }
    return;
  }

  if (req.method === 'GET') {
    try {
      // Get single order by ID
      const order = await Order.findById(id)
        .populate('user', 'firstName lastName email mobile phone')
        .select('-__v');

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.status(200).json({
        success: true,
        data: order
      });

    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order',
        error: error.message
      });
    }
    return;
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'PATCH']);
  res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`
  });
}
