const mongoose = require("mongoose");


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
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books', default: [] }]
});

module.exports = new mongoose.model("User", User);
