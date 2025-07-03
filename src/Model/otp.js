import tempUserStore from "@/lib/tempUserStore";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(req) {
  await connectDB();
  const { email, otp } = await req.json();

  const tempData = tempUserStore.get(email);
  if (!tempData) {
    return new Response(JSON.stringify({ error: "No signup request found or OTP expired" }), { status: 400 });
  }

  if (tempData.expiresAt < Date.now()) {
    tempUserStore.delete(email);
    return new Response(JSON.stringify({ error: "OTP expired" }), { status: 400 });
  }

  if (parseInt(otp) !== tempData.otp) {
    return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 400 });
  }

  // Save user
  const savedUser = await User.create(tempData.userData);
  tempUserStore.delete(email);

  return new Response(JSON.stringify({ message: "User registered successfully", user: savedUser }), { status: 201 });
}
