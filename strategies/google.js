const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require("../models/User");

module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, cb) {
    const prevUser = await UserModel.findOne({ socialId: profile.id }).exec().catch(err => cb(err, null));

    if (prevUser) {
        return cb(null, prevUser);
    }

    const user = new UserModel({
        username: profile.displayName,
        picture: profile.photos[0].value,
        socialId: profile.id
    });
    const newUser = await user.save().catch(err => cb(err, null));

    if (newUser) {
        return cb(null, newUser);
    }
  }
);