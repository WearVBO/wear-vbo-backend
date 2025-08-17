const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// signup authentication
exports.RegisterUser = async (req, res) => {
  try {
    const { FirstName, LastName, PhoneNumber, email, Password } = req.body;

    // Check If details are present
    if (!FirstName || !LastName || !PhoneNumber || !email || !Password) {
      return res
        .send(400)
        .json({ error: "Some fields are missing, Please input them again" });
    }

    const user = await UserModel.create({
      FirstName,
      LastName,
      PhoneNumber,
      email,
      Password,
    });

    res.status(201).json({
      message: `Your account has been created successfully, welcome ${FirstName} ${LastName}`,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({
      error: "wrong account",
      message: "Your account creation was not successful",
      stack: error.stack,
    });
  }
};

// login authentication
exports.LoginUser = async (req, res) => {
  try {
    const { email, Password } = req.body;

    const SingleUser = await UserModel.findById({ email, Password });
    // check if an account has been created.
    if (!SingleUser) {
      return res
        .status(400)
        .json({ error: "This account has not been registered" });
    }

    // check if password matches
    const isMatch = bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials, no successful matches for this account",
      });
    }

    // authenticates users when they login
    const token = jwt.sign({ id: SingleUser._id }, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRES_IN}`,
    });

    // message data after authentication
    res.status(201).json({
      success: true,
      data: {
        token,
        expiresIn: "24h",
        userId: SingleUser._id,
        email: SingleUser.email,
        message: "Login successful, Welcome to wearVBO",
      },
    });
  } catch (err) {
    res.status(500).json({
      error: "Wrong credentials",
      message: "Could not log in successfully",
    });
  }
};
