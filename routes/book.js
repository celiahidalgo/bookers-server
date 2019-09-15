const express = require("express");
const router = express.Router();

const BookController = require('../controllers/book.controller');

router.route('/')
  .get(BookController.bookGET)
  .post(BookController.bookPOST);

router.route('/:id')
  .get(BookController.bookIdGET);

module.exports = router;
