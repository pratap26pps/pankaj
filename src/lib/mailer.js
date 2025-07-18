 

import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, 
    auth: {
     user: process.env.EMAIL_USER,       
    pass: process.env.EMAIL_PASS,     
    },
  });

  await transporter.sendMail({
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
  });
};
