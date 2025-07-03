import nodemailer from 'nodemailer';

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: 'your_email@gmail.com', // Apna email yahan daalo
      subject: 'Test Email ✔',
      html: `<p>This is a test email from your Next.js app</p>`,
    });

    return new Response(JSON.stringify({ success: true, message: "Email sent ✅" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
