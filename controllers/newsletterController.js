const newsletterModel = require("../models/newsletter");
const sendMail = require("../utils/sendMail");

// newsletter controller
exports.SendNewsLetter = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await newsletterModel.findOne({ email });
    if (existing && existing.subscribed) {
      return res
        .status(400)
        .json({ success: false, message: "Already subscribed" });
    }

    const subscriber = await newsletterModel.findOneAndUpdate(
      { email },
      { email, subscribed: true },
      { upsert: true, new: true }
    );

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
    res.status(500).json({ success: false, message: "Failed to subscribe" });
  }
};
