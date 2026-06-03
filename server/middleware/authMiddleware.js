const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ status: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: "Not authorized, token failed" });
  }
};

module.exports = { protect };
