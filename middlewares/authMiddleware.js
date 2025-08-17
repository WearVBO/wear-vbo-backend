const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split("")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "this user has not been authenticated yet" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id);
    if (!req.user) return res.status(401).json({ error: "User not found" });
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalid" });
  }
};
