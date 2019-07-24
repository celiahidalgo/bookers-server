var express = require("express");
var router = express.Router();


const generateJWT = require("../lib/jwt-creator");
const UserModel = require("../models/User");

router.post("/", async (req, res) => {
  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  await user.save();
  console.log(user);
  const token = await generateJWT(user._id);
  return res.status(201).send({ token });
  // .redirect(`${process.env.CLIENT_URL}/Home?token=${token}`);
});
module.exports = router;
