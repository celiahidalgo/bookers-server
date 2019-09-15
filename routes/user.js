var express = require("express");
var router = express.Router();
const jwtMiddleware = require("../middlewares/jwt");
const UserController = require('../controllers/user.controller');

router.route('/')
  .get(UserController.userGET);

router.route('/signup')
  .post(UserController.userPOST);

router.route('/:id', jwtMiddleware)
  .get(UserController.userIdGET);

router.route('login/:id')
  .get(UserController.userIdLoginGET);

router.route('/:id/favs')
  .get(UserController.userFavGET)
  .put(UserController.userFavPUT)
  .delete(UserController.userFavDELETE);

module.exports = router;
