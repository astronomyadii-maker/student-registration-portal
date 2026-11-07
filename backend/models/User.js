const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    enroll: { type: String, required: true, unique: true, uppercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    branch: { type: String, enum: ["it", "ec", "me", "ce", "ee"], required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);