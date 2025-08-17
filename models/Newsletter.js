const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema({
  FirstName: { type: String, trim, required: true },
  email: { type: String, trim, required: true },
});

module.exports = mongoose.model("NEWSLETTER", NewsletterSchema);
