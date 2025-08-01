import dbConnect from '../../../lib/dbConnect';
import bcrypt from 'bcrypt';
import Otp from '../../../models/Otp';
import users from '../../../models/users';
import { signupSchema } from '../../../lib/zodSchemas/userSchema';
import { serialize } from "cookie";
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { code, ...pendingSignup } = req.body;
    const parsed = signupSchema.safeParse(pendingSignup);
    console.log("Parsed Data:", parsed);
     if (!parsed.success) {
      return res.status(400).json({ message: "Validation error", error: parsed.error });
    }

    const { email, password,accountType } = parsed.data;

    const validOtp = await Otp.findOne({ email, code: code.toString() });

    if (!validOtp || validOtp.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
   
    const image = "/images/avatar.png";


    let userId;

    if (accountType === "Admin") {
      const adminCount = await users.countDocuments({ accountType: "Admin" });
      const nextNumber = (adminCount + 1).toString().padStart(3, '0'); // e.g., '001', '002'
      userId = `admin${nextNumber}`;
    } else if (accountType === "Partner") {
      const partnerCount = await users.countDocuments({ accountType: "Partner" });
      const nextNumber = (partnerCount + 1).toString().padStart(3, '0'); // e.g., '001', '002'
      userId = `partner${nextNumber}`;
    } else if (accountType === "User") {
      const userCount = await users.countDocuments({ accountType: "User" });
      const nextNumber = (userCount + 1).toString().padStart(6, '0');  
      userId = `user${nextNumber}`;
    }



    console.log("Data to insert:", {
  ...parsed.data,
      userId: userId,
  password: hashedPassword,
  image,
   
});

  const userdata=  await users.create({
      ...parsed.data,
      password: hashedPassword,
      image,
     userId: userId,
    });
    await Otp.deleteMany({ email });

     // Set cookie
    const cookie = serialize("customUser", JSON.stringify({
      id: userdata._id,
      userId: userdata.userId,
      email: userdata.email,
      name: userdata.firstName + " " + userdata.lastName,
      image: userdata.image || "/images/avatar.png",
      mobile: userdata.mobile,
      role: userdata.accountType,
      GstNo: userdata.GstNo,
      Area: userdata.Area,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,  
    });
  res.setHeader("Set-Cookie", cookie);  

    return res.status(200).json({ message: "Email verified successfully" ,data:userdata});
  }

  res.status(405).end("Method Not Allowed");
}
