// routes/blogPosts.js
const express = require("express");
const BlogPostModel = require("../models/blogPost");
const router = express.Router();

// Get all blog posts
router.get("/api/blogPosts", async (req, res) => {
  try {
    const blogPosts = await BlogPostModel.find();
    res.status(200).json(blogPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single blog post by ID
router.get("/api/blogPosts/:id", getBlogPost, (req, res) => {
  res.status(200).json(res.blogPost);
});

// Create a new blog post
router.post("/api/create", async (req, res) => {
  const { title, author, message } = req.body;
  const blogPost = new BlogPostModel({
    title,
    author,
    message
  });

  try {
    const newBlogPost = await blogPost.save();
    res.status(201).json(newBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing blog post
router.put("/api/update/:id", getBlogPost, async (req, res) => {
  const { title, author, message } = req.body;
  if (title != null) {
    res.blogPost.title = title;
  }
  if (author != null) {
    res.blogPost.author = author;
  }
  if (message != null) {
    res.blogPost.message = message;
  }

  try {
    const updatedBlogPost = await res.blogPost.save();
    res.status(200).json(updatedBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog post by ID
router.delete("/api/delete/:id", getBlogPost, async (req, res) => {
  try {
    await res.blogPost.remove();
    res.status(200).json({ message: "Deleted Blog Post" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single blog post by id
async function getBlogPost(req, res, next) {
  let blogPost;
  try {
    blogPost = await BlogPostModel.findById(req.params.id);
    if (blogPost == null) {
      return res.status(404).json({ message: "Blog post not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.blogPost = blogPost;
  next();
}

module.exports = router;
