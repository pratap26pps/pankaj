import connectDB from '@/lib/dbConnect';
import ServiceBooking from '@/models/ServiceBooking';

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const { status } = req.body;

      // Validate status
      const validStatuses = ['pending', 'confirmed', 'processing', 'completed', 'cancelled'];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Valid statuses are: ' + validStatuses.join(', ')
        });
      }

      // Find and update the booking
      const updatedBooking = await ServiceBooking.findByIdAndUpdate(
        id,
        { 
          status,
          updatedAt: new Date()
        },
        { 
          new: true,
          runValidators: true
        }
      );

      if (!updatedBooking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Booking status updated successfully',
        data: updatedBooking
      });

    } catch (error) {
      console.error('Error updating booking status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update booking status',
        error: error.message
      });
    }
    return;
  }

  if (req.method === 'GET') {
    try {
      // Get single booking by ID
      const booking = await ServiceBooking.findById(id).select('-__v');

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

  // Method not allowed
  res.setHeader('Allow', ['GET', 'PATCH']);
  res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`
  });
}
