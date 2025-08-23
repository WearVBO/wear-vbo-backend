const nodemailer = require("nodemailer");

// using nodemailer
async function sendMail({ to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "lakaka@gmail.com",
      subject: "Hello world",
      text: "Hello world",
      html: "<b>Hello world</b>",
    });

    console.log("Email sent:", info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error("Email failed to send:", error);
    return { success: false, error };
  }
}

module.exports = sendMail;
