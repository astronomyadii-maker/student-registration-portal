const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// POST /api/register
router.post("/register", async (req, res) => {
  try {
    const { fname, enroll, email, dob, gender, branch, password, confirm } = req.body;

    if (!fname || !enroll || !email || !dob || !gender || !branch || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    if (password !== confirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const exists = await User.findOne({
      $or: [{ enroll: enroll.trim().toUpperCase() }, { email: email.trim().toLowerCase() }],
    });
    if (exists) {
      return res.status(409).json({ message: "Enrollment no. or email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name: fname, enroll, email, dob, gender, branch, password: hashed });

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { enroll, password } = req.body;
    if (!enroll || !password) {
      return res.status(400).json({ message: "Enrollment no. and password required" });
    }

    const user = await User.findOne({ enroll: enroll.trim().toUpperCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid enrollment no. or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      user: { name: user.name, enroll: user.enroll, branch: user.branch },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;