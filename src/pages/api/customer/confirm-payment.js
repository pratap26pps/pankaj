import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { orderId, razorpayOrderId, paymentId, signature, status } = req.body;

    if (!orderId || !paymentId || !signature || !razorpayOrderId || status !== "paid") {
      return res.status(400).json({ message: "Missing or invalid payment data" });
    }

    // Step 1: Verify Razorpay Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpayOrderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Step 2: Update Order in DB
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paidAt = new Date();
    order.status = "processing";
    order.paymentMethod = "razorpay";
    order.paymentId = paymentId;

    await order.save();

    return res.status(200).json({ message: "Payment confirmed", order });
  } catch (error) {
    console.error("Confirm payment error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
