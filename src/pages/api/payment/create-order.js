import Razorpay from 'razorpay';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { amount, currency = 'INR', receipt, notes = {} } = req.body;

    // Validate required fields
    if (!amount || !receipt) {
      return res.status(400).json({
        success: false,
        message: 'Amount and receipt are required'
      });
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Amount in paise (multiply by 100)
      currency,
      receipt,
      notes,
      payment_capture: 1, // Auto capture payment
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at,
        key_id: process.env.RAZORPAY_KEY, // Send key_id for frontend
      }
    });

  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message
    });
  }
}
