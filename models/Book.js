const mongoose = require("mongoose");

// Completar

const Book = new mongoose.Schema({
  title: String,
  author: String,
  publishedOn: String,
  description: String,
  image: Object,
  favorite: { type: Boolean, default: false }
});

module.exports = new mongoose.model("Book", Book);
