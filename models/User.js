const mongoose = require("mongoose");

// Completar

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  picture: String,
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = new mongoose.model("User", User);
