import connectDB from '@/lib/dbConnect';
import Order from '@/models/Order';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    await connectDB();
    const orders = await Order.find()
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name price images');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
} 