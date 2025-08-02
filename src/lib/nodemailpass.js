import nodemailer from "nodemailer";

export async function sendResetEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
     host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
    auth: {
      user: process.env.MAIL_AUTH,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"GradioNeo Bharat" <${process.env.MAIL_AUTH}>`,
    to: email,
    subject: "Password Reset",
    html: `
      <p>You requested a password reset.</p>
      <p>Click Here <a href="${resetLink}">${resetLink}</a> to reset your password.</p>
      <p>This link expires in 1 hour.</p>
    `,
  });
}
