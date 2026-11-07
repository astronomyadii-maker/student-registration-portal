const express = require("express");
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");

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

module.exports = router;