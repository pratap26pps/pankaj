import connectDB from '@/lib/dbConnect';
import ServiceBooking from '@/models/ServiceBooking';

export default async function handler(req, res) {
  await connectDB();

  const { email, page = 1, limit = 10 } = req.query;

  if (req.method === 'GET') {
    try {
      const query = {};
      if (email) query.email = email;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const bookings = await ServiceBooking.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await ServiceBooking.countDocuments(query);

      return res.status(200).json({
        success: true,
        data: bookings,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Error fetching booking:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch booking',
        error: error.message
      });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`
  });
}
