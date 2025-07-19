import { connectDB } from "@/lib/db";
import User from "@/Model/User";
import Otp from "@/Model/Otp";

export async function POST(req) {
  await connectDB();

  const { email, otp } = await req.json();

  const otpRecord = await Otp.findOne({ email, otp });

  if (!otpRecord) {
    return Response.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  // Mark user as verified
  await User.updateOne({ email }, { isVerified: true });

  // Remove OTP after use
  await Otp.deleteOne({ email });

  return Response.json({ message: "User verified successfully" });
}
