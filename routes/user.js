var express = require("express");
var router = express.Router();
const jwtMiddleware = require("../middlewares/jwt");
const UserModel = require("../models/User");

router.get("/", async (req, res) => {
  const users = await UserModel.find({ user: req.user });
  if (!users) {
    console.log(users);
    return res.status(400).send();
  }

  return res.status(200).json({ users });
});

router.get("/:id", jwtMiddleware, async (req, res) => {
  const user = await UserModel.findOne({ "user._id": req.params.userId });
  if (!user) {
    console.log(user);
    return res.status(400).send();
  }

  return res.status(200).json({ user });
});

module.exports = router;
