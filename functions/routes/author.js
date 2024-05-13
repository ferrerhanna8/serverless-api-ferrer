const express = require("express");
const AuthorModel = require("../models/author");
const router = express.Router();

// Get all authors
router.get("/", async (req, res) => {
  try {
    const authors = await AuthorModel.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single author by ID
router.get("/:id", getAuthor, (req, res) => {
  res.json(res.author);
});

// Create a new author
router.post("/create", async (req, res) => {
  try {
    // Validate request body
    if (!req.body.title || !req.body.author || !req.body.message) {
      return res.status(400).json({ message: "Title, author, and message are required" });
    }

    // Check if the author already exists
    const existingAuthor = await AuthorModel.findOne({ author: req.body.author });
    if (existingAuthor) {
      return res.status(400).json({ message: "Author already exists" });
    }

    const author = new AuthorModel(req.body);
    const newAuthor = await author.save();

    res.status(201).json({ message: "Author created successfully", author: newAuthor });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing author partially
router.patch("/:id", getAuthor, async (req, res) => {
  try {
    if (req.body.title != null) {
      res.author.title = req.body.title;
      const updatedAuthor = await res.author.save();
      res.json(updatedAuthor);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing author completely
router.put("/:id", getAuthor, async (req, res) => {
  try {
    const updatedAuthor = await AuthorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an author
router.delete("/:id", getAuthor, async (req, res) => {
  try {
    await res.author.remove();
    res.json({ message: "Author deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single author by id
async function getAuthor(req, res, next) {
  try {
    const author = await AuthorModel.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.author = author;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
