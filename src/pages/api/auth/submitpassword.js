import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/users";
import ResetToken from "../../../models/ResetToken";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, token, password } = req.body;
  if (!email || !token || !password) return res.status(400).json({ message: "Missing fields" });

  const tokenDoc = await ResetToken.findOne({ email, token });
  if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });
  await ResetToken.deleteMany({ email });

  return res.status(200).json({ message: "Password reset successful" });
}
