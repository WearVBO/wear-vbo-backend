// const newsletterModel = require("../models/newsletterProfile");
// const sendMail = require("../utils/sendMail");

// // newsletter controller
// exports.SendNewsLetter = async (req, res) => {
//   try {
//     const { email, subscribed = true } = req.body;

//     const existing = await newsletterModel.findOne({ email });
//     if (existing && existing.subscribed) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Already subscribed" });
//     }

//     const subscriber = await newsletterModel.findOneAndUpdate(
//       { email },
//       { email, subscribed },
//       { upsert: true, new: true }
//     );

//     await sendMail({
//       to: subscriber.email,
//       subject: "wearVBO Newsletter",
//       text: `Hello ${subscriber.email}, welcome to wearVBO.`,
//       html: `<p>Hello ${subscriber.email}.</p>`,
//     });

//     res.status(201).json({
//       success: true,
//       message: `Thank you for subscribing to wearVBO newsletter`,
//       subscriber,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to subscribe" });
//   }
// };

const newsletterModel = require("../models/newsletterProfile");
const sendMail = require("../utils/sendMail");

exports.SendNewsLetter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    // Check if already subscribed
    const existing = await newsletterModel.findOne({ email });
    if (existing && existing.subscribed) {
      return res
        .status(400)
        .json({ success: false, message: "Already subscribed" });
    }

    // Create or update subscription
    const subscriber = await newsletterModel.findOneAndUpdate(
      { email },
      { email, subscribed: true },
      { upsert: true, new: true }
    );

    // Send welcome mail
    await sendMail({
      to: subscriber.email,
      subject: "wearVBO Newsletter",
      text: `Hello ${subscriber.email}, welcome to wearVBO.`,
      html: `<p>Hello ${subscriber.email}.</p>`,
    });

    res.status(201).json({
      success: true,
      message: `Thank you for subscribing to wearVBO newsletter`,
      subscriber,
    });
  } catch (error) {
    console.error("Newsletter error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: error.message || "Failed to subscribe",
      });
  }
};
