var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const googleStrategy = require("../strategies/google");

const generateJWT = require("../lib/jwt-creator");

passport.use(googleStrategy);

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false
  })
);
router.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const token = await generateJWT(req.user._id);

      return res.redirect(`${process.env.CLIENT_URL}/Home?token=${token}&id=${req.user._id}`);
    } catch (err) {
      console.log(err);
      return res.redirect(process.env.CLIENT_URL);
    }
  }
);
module.exports = router;
