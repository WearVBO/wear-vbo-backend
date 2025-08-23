const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema({
  fullname: { type: String, trim, required: true },
  email: { type: String, trim, required: true },
  subscribed: { type: Boolean, default: true },
  createdAt: { timestamps: true },
});

module.exports = mongoose.model("newsletter", NewsletterSchema);
