// File: src/pages/api/Signup.js
import { connectDB } from "@/lib/db";
import User from '@/Model/User';
import Otp from '@/Model/Otp';
import { sendOtpMail } from "@/lib/mailer";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  await connectDB();

  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      vehicle,
      password,
      userType,
    } = req.body;

    console.log('Signup input:', { firstName, lastName, email, mobile, vehicle, password, userType });

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create the new user (you may want to hash password here)
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone: mobile,
      vehicleDetails: vehicle,
      Role: userType,
    });

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.findOneAndUpdate(
      { email },
      { otp: otpCode, createdAt: new Date() },
      { upsert: true }
    );

    // Send OTP via email
    await sendOtpMail(email, otpCode);

    return res.status(200).json({
      message: 'Signup successful, OTP sent to email',
      email: newUser.email,
    });

  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Signup failed', error: err.message });
  }
}
