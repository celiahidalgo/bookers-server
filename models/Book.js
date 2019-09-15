const mongoose = require("mongoose");

// Completar

const Book = new mongoose.Schema({
  bookId: { type: String },
  title: String,
  author: String,
  publishedOn: String,
  description: String,
  // bookInfo: String,
  categories: Object,
  image: Object,
});

module.exports = new mongoose.model("Book", Book);
