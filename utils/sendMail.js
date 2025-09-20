const nodemailer = require("nodemailer");

// using nodemailer
async function sendMail({ to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error("Email failed to send:", error);
    return { success: false, error };
  }
}

module.exports = sendMail;
