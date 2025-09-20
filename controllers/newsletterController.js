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
const mailchimp = require("../config/mailchimp");

exports.SendNewsLetter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // REGEX PATTERN
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Check if already subscribed
    const existing = await newsletterModel.findOne({ email });
    if (existing && existing.subscribed) {
      return res.status(400).json({
        success: false,
        message: "Already subscribed",
      });
    }

    // Create or update subscription in database
    const subscriber = await newsletterModel.findOneAndUpdate(
      { email },
      {
        email,
        subscribed: true,
        subscribedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    // Mailchimp integration (handles both new and existing members)
    try {
      const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
      const subscriberHash = require("crypto")
        .createHash("md5")
        .update(email.toLowerCase())
        .digest("hex");

      await mailchimp.lists.setListMember(mailchimpListId, subscriberHash, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: "",
        },
        tags: ["website-signup"],
      });

      console.log("Mailchimp subscription successful");
    } catch (mailchimpError) {
      console.error(
        "Mailchimp error:",
        mailchimpError.response?.body || mailchimpError.message
      );
    }

    // Send welcome email
    try {
      await sendMail({
        to: subscriber.email,
        subject: "Welcome to wearVBO Newsletter! 🎉",
        text: `Hello, welcome to wearVBO!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #667eea; margin-bottom: 10px;">Welcome to wearVBO! 🎉</h1>
              <p style="color: #666; font-size: 16px;">Thank you for joining our community!</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
              <h2 style="color: #333; margin-bottom: 20px;">What to expect:</h2>
              <ul style="color: #555; line-height: 1.8;">
                <li>🏃‍♀️ Weekly activewear trends and reviews</li>
                <li>💰 Exclusive discount codes and early access to sales</li>
                <li>💪 Fitness tips and workout inspiration</li>
                <li>👕 New product launches and collections</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="https://www.wearvbo.com" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Start Shopping
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px;">
                Best regards,<br>
                The wearVBO Team
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Welcome email failed:", emailError.message);
    }

    res.status(201).json({
      success: true,
      message:
        "Thank you for subscribing to wearVBO newsletter! Welcome email will be sent shortly.",
      subscriber,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to subscribe. Please try again later.",
    });
  }
};
