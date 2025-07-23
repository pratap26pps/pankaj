import mongoose from 'mongoose';

const ServiceBookingSchema = new mongoose.Schema({
  // Customer Details
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  cityState: {
    type: String,
    required: true,
    trim: true
  },

  // Vehicle Information
  vehicleType: {
    type: String,
    required: true,
    enum: ['Two-Wheeler', 'Three-Wheeler / E-Rickshaw', 'Four-Wheeler', 'Commercial EV']
  },
  regNumber: {
    type: String,
    trim: true,
    uppercase: true
  },
  purchaseDate: {
    type: Date
  },
  lastService: {
    type: String,
    enum: ['Within 1 month', '3 months', '6+ months', 'Never Serviced']
  },

  // Service Details
  services: [{
    type: String,
    enum: [
      'General Check-Up',
      'Brake Inspection / Repair',
      'Battery Issue / Swelling / Drain',
      'Tyre Puncture / Replacement',
      'Motor/Controller Issue',
      'Charging Port Problem',
      'Light/Indicator/Electrical Issue',
      'Emergency Breakdown Service'
    ]
  }],
  servicesOther: {
    type: String,
    trim: true
  },
  plan: {
    type: String,
    enum: ['Basic Care Plan', 'Urban Commuter Plan', 'Power Rider Plan', 'Not sure – need recommendation']
  },
  mode: {
    type: String,
    required: true,
    enum: ['Pick-up & Drop', 'Visit Nearest Service Center', 'On-Site Technician (Doorstep)']
  },

  // Scheduling
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening']
  },
  notes: {
    type: String,
    trim: true
  },

  // Payment
  payment: {
    type: String,
    enum: ['Pay Now (UPI/Card/NetBanking)', 'Pay on Completion', 'Prepaid Plan']
  },

  // Agreements
  agreeTerms: {
    type: Boolean,
    required: true,
    default: false
  },
  agreeRepair: {
    type: Boolean,
    required: true,
    default: false
  },

  // System Fields
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  bookingId: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate unique booking ID before saving
ServiceBookingSchema.pre('save', async function(next) {
  if (!this.bookingId) {
    const count = await mongoose.model('ServiceBooking').countDocuments();
    this.bookingId = `SB${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Index for faster queries
ServiceBookingSchema.index({ phone: 1 });
ServiceBookingSchema.index({ date: 1 });
ServiceBookingSchema.index({ status: 1 });
ServiceBookingSchema.index({ bookingId: 1 });

export default mongoose.models.ServiceBooking || mongoose.model('ServiceBooking', ServiceBookingSchema);
