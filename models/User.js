const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true, trim },
  LastName: { type: String, required: true, trim },
  PhoneNumber: { type: Number, required: true, trim },
  Password: { type: String, required: true, trim },
  email: { type: String, required: true, trim },
  createdAt: { timestamps: true },
});

module.exports = mongoose.model("User", userSchema);
