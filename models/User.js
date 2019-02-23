const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: String,
    picture: String,
    socialId: String
});

module.exports = new mongoose.model("User", User);