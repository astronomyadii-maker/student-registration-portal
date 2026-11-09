const express = require("express");
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const router = express.Router();

// POST /api/blogs  (login required)
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const blog = await Blog.create({ title, content, author: req.userId });
    res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/blogs  (sab blogs dekhne ke liye)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name enroll").sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// GET /api/blogs/:id  (ek blog ki details)
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }
    const blog = await Blog.findById(req.params.id).populate("author", "name branch");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;