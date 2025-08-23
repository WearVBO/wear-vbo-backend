const newsletterModel = require("../models/newsletter");
const sendMail = require("../utils/sendMail");

// test mail function
async function testMail(email, fullname) {
  const result = await sendMail({
    to: `${email}`,
    subject: "Welcome to wearVBO",
    text: `hello ${fullname}, welcome to wearVBO.`,
    html: `<p>hello ${fullname}.</p>`,
  });

  console.log(result); // TODO: To remove later
}

// newsletter controller
exports.SendNewsLetter = async (req, res) => {
  try {
    const { fullname, email } = req.body;

    const existing = await newsletterModel.findOne({ email });
    if (existing && existing.subscribed) {
      return res
        .status(400)
        .json({ success: false, message: "Already subscribed" });
    }

    const subscriber = await newsletterModel.findOneAndUpdate(
      { email },
      { email, fullname, subscribed: true },
      { upsert: true, new: true }
    );

    // check of the response was successful and initiate a mail sent
    await testMail(subscriber.email, subscriber.fullname);

    res.status(201).json({
      success: true,
      message: `Thank you ${fullname} for subscribing to wearVBO newsletter`,
      subscriber,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to subscribe" });
  }
};
