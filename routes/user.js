var express = require("express");
var router = express.Router();
const jwtMiddleware = require("../middlewares/jwt");
const UserModel = require("../models/User");

// Esta es la ruta para un usuario
// Habría que crear una ruta con los datos de todos los usuarios y dejar / para todos y /:id para un usuario
router.get("/", jwtMiddleware, async (req, res) => {
  const user = await UserModel.findOne({ "user._id": req.userId });
  if (!user) {
    console.log(user);
    return res.status(400).send();
  }

  return res.status(200).json({ user });
});

module.exports = router;
