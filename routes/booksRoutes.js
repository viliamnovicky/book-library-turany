const express = require('express');
const booksController = require('./../controllers/booksController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(booksController.getAllBooks)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    booksController.uploadBookCoverPhoto,
    booksController.resizeBookCoverPhoto,
    booksController.createBook,
  );

  router
  .route('/:id')
  .get(booksController.getOneBook)

module.exports = router;
