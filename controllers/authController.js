const UserModel = require("../models/userprofile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");

// signup authentication
exports.RegisterUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, password, email } = req.body;

    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);

    // Check If details are present
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return res
        .status(400)
        .json({ error: "Some fields are missing, Please input them again" });
    }

    const user = await UserModel.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedpassword,
    });

    // send email upon successful registration
    await sendMail({
      to: user.email,
      subject: "Welcome wearVBO",
      text: `Hello ${user.firstName}, welcome to wearVBO.`,
      html: `<p>Hello ${user.lastName}.</p>`,
    });

    res.status(200).json({
      message: `Your account has been created successfully, welcome ${firstName} ${lastName}`,
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
    const { email, password } = req.body;

    const SingleUser = await UserModel.findOne({ email });
    // check if an account has been created.
    if (!SingleUser) {
      return res
        .status(400)
        .json({ error: "This account has not been registered" });
    }

    // check if password matches
    const isMatch = bcrypt.compare(password, SingleUser.password);
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
