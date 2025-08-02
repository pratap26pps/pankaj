import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/users";
import ResetToken from "../../../models/ResetToken";
import { sendResetEmail } from "../../../lib/nodemailpass";
import crypto from "crypto";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await ResetToken.create({ email, token, expiresAt });

  const resetUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password?token=${token}&email=${email}`;
  await sendResetEmail(email, resetUrl);

  return res.status(200).json({ message: "Reset email sent successfully" });
}

