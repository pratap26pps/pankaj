import connectDB from '@/lib/dbConnect';
import ServiceBooking from '@/models/ServiceBooking';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { phone, status, limit = 50, page = 1 } = req.query;
      
      // Build query filter
      const filter = {};
      if (phone) filter.phone = phone;
      if (status) filter.status = status;
      
      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Fetch service bookings with pagination
      const serviceBookings = await ServiceBooking.find(filter)
        .sort({ createdAt: -1 }) // Most recent first
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'); // Exclude version field
      
      // Get total count for pagination
      const totalCount = await ServiceBooking.countDocuments(filter);
      
      res.status(200).json({
        success: true,
        data: serviceBookings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / parseInt(limit)),
          totalCount,
          hasNext: skip + serviceBookings.length < totalCount,
          hasPrev: parseInt(page) > 1
        }
      });
      
    } catch (error) {
      console.error('Error fetching service bookings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch service bookings',
        error: error.message
      });
    }
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
      payment,
      agreeTerms,
      agreeRepair
    } = req.body;

    // Validate required fields
    if (!fullName || !phone || !address || !cityState || !vehicleType || !mode || !date) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['fullName', 'phone', 'address', 'cityState', 'vehicleType', 'mode', 'date']
      });
    }

    // Validate phone number
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Please enter a valid 10-digit phone number' });
    }

    // Validate email if provided
    if (email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Validate services
    if (!services || services.length === 0) {
      if (!servicesOther) {
        return res.status(400).json({ message: 'Please select at least one service or specify other services' });
      }
    }

    // Validate agreements
    if (!agreeTerms || !agreeRepair) {
      return res.status(400).json({ message: 'Please agree to both service terms and repair conditions' });
    }

    // Validate date (should be future date)
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (bookingDate < today) {
      return res.status(400).json({ message: 'Booking date cannot be in the past' });
    }

    // Create service booking
    const serviceBooking = new ServiceBooking({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? email.trim().toLowerCase() : undefined,
      address: address.trim(),
      cityState: cityState.trim(),
      vehicleType,
      regNumber: regNumber ? regNumber.trim().toUpperCase() : undefined,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : undefined,
      lastService,
      services: services || [],
      servicesOther: servicesOther ? servicesOther.trim() : undefined,
      plan,
      mode,
      date: bookingDate,
      timeSlot,
      notes: notes ? notes.trim() : undefined,
      payment,
      agreeTerms,
      agreeRepair
    });

    const savedBooking = await serviceBooking.save();

    // Log successful booking creation
    console.log(`Service booking created successfully: ${savedBooking.bookingId}`, {
      phone: savedBooking.phone,
      vehicleType: savedBooking.vehicleType,
      services: savedBooking.services,
      date: savedBooking.date,
      mode: savedBooking.mode
    });

    res.status(201).json({
      message: 'Service booking created successfully',
      booking: {
        bookingId: savedBooking.bookingId,
        fullName: savedBooking.fullName,
        phone: savedBooking.phone,
        vehicleType: savedBooking.vehicleType,
        services: savedBooking.services,
        date: savedBooking.date,
        timeSlot: savedBooking.timeSlot,
        mode: savedBooking.mode,
        status: savedBooking.status,
        createdAt: savedBooking.createdAt
      }
    });

  } catch (error) {
    console.error('Service booking creation error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Handle duplicate booking ID (unlikely but possible)
    if (error.code === 11000) {
      return res.status(500).json({
        message: 'Booking ID conflict. Please try again.'
      });
    }

    res.status(500).json({
      message: 'Failed to create service booking',
      error: error.message
    });
  }
}
