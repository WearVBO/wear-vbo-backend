const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema({
  // fullname: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  subscribed: { type: Boolean, default: true },
});

module.exports = mongoose.model("newsletter", NewsletterSchema);
