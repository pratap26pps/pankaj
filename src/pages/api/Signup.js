import { transporter } from "@/lib/mail";
import tempUserStore from "@/lib/tempUserStore";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const {
    firstName, lastName, email, phone, vehicleDetails,
    password, confirmPassword, type, profilePic
  } = await req.json();

  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ error: "Passwords do not match" }), { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000;

  // Temporarily store user
  tempUserStore.set(email, {
    userData: {
      firstName, lastName, email, phone,
      vehicleDetails, password: hashedPassword,
      type, profilePic
    },
    otp,
    expiresAt,
  });

  // Send OTP via email
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Signup OTP Verification",
    html: `<p>Your OTP for signup is <b>${otp}</b>. It is valid for 5 minutes.</p>`
  });

  return new Response(JSON.stringify({ message: "OTP sent to your email" }), { status: 200 });
}
