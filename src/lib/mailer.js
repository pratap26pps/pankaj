// lib/mailer.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,      // your Gmail address
    pass: process.env.EMAIL_PASS,      // App password (not your Gmail login)
  },
});

export const sendOtpMail = async (email, otp) => {
  const mailOptions = {
    from: `"GNB Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code for Verification",
    html: `
      <div style="font-family:sans-serif; padding: 20px;">
        <h2>Hello!</h2>
        <p>Your OTP is:</p>
        <h1 style="color: #4CAF50;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
