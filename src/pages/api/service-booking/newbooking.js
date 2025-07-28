import connectDB from '@/lib/dbConnect';
import ServiceBooking from '@/models/ServiceBooking';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const {
        fullName,
        phone,
        email,
        address,
        cityState,
        vehicleType,
        regNumber,
        purchaseDate,
        lastService,
        services,
        servicesOther,
        plan,
        mode,
        date,
        timeSlot,
        notes,  
        agreeTerms,
        agreeRepair,
      } = req.body;

    console.log("req.body",req.body)
      if (
         !fullName || !phone || !address || !cityState ||
        !vehicleType || (!services?.length && !servicesOther) ||
        !date || !timeSlot || !agreeTerms || !agreeRepair
      ) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
      }

      const newBooking = await ServiceBooking.create({
        fullName,
        phone,
        email,
        address,
        cityState,
        vehicleType,
        regNumber,
        purchaseDate,
        lastService,
        services,
        servicesOther,
        plan,
        mode,
        date,
        timeSlot,
        notes,
        agreeTerms,
        agreeRepair,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
 
      return res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: {
          newBooking
        },
      });

    } catch (error) {
      console.error('Error creating booking:', error);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong while creating the booking',
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }
}
