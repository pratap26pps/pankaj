import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'; // ✅ FIXED HERE
import User from '@/Model/User';
import Otp from '@/Model/Otp';
import { sendOtpMail } from '@/lib/mailer';
import { writeFile } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFormData(req) {
  const formData = await req.formData();
  const fields = {};
  for (let [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      fields[key] = value;
    } else if (value instanceof File) {
      const filePath = `public/uploads/${Date.now()}_${value.name}`;
      const bytes = await value.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));
      fields.photoUrl = filePath.replace('public', '');
    }
  }
  return fields;
}

export async function POST(req) {
  await connectDB(); // ✅ Will now work

  try {
    const form = await parseFormData(req);
    const { firstname, lastName, email, mobile, password, userType } = form;

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    await User.create({
      name: `${firstname} ${lastName}`,
      email,
      password,
      phone: mobile,
      userType,
      isVerified: false,
      photoUrl: form.photoUrl || '',
    });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.findOneAndUpdate(
      { email },
      { otp: otpCode, createdAt: new Date() },
      { upsert: true }
    );

    await sendOtpMail(email, otpCode);

    return NextResponse.json({ message: 'Signup successful, OTP sent to email', email });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ message: 'Signup failed', error: err.message }, { status: 500 });
  }
}
