const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    generateToken(res, user._id);

    res.status(201).json({
      status: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ status: false, message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res.status(403).json({ status: false, message: "Account is deactivated" });
    }

    generateToken(res, user._id);

    res.json({
      status: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ status: true, message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
