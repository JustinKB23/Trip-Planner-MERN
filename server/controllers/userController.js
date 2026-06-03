const User = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true }).select("-password");
    res.json({ status: true, users });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json({ status: true, user });
  } else {
    res.status(404).json({ status: false, message: "User not found" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ status: false, message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;

    const updated = await user.save();
    res.json({
      status: true,
      user: { _id: updated._id, name: updated.name, email: updated.email, role: updated.role },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = { getUsers, getUserProfile, updateUserProfile };
