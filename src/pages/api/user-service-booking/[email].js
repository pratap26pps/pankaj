import connectDB from '@/lib/dbConnect';
import ServiceBooking from '@/models/ServiceBooking';

export default async function handler(req, res) {
  await connectDB();

  const { email } = req.query;

  

  if (req.method === 'GET') {
    try {
      
      const booking = await ServiceBooking.find({ email }).sort({ createdAt: -1 });
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      res.status(200).json({
        success: true,
        data: booking
      });

    } catch (error) {
      console.error('Error fetching booking:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch booking',
        error: error.message
      });
    }
    return;
  }

res.setHeader('Allow', ['GET']);
res.status(405).json({
  success: false,
  message: `Method ${req.method} not allowed`
});
}
