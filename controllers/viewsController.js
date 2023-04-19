const Book = require('../models/bookModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getHomePage = catchAsync(async (req, res, next) => {
  res.status(200).render('about', {
    title: 'Knižnica Turany nad Ondavou',
  });
});

exports.getDatabase = catchAsync(async (req, res, next) => {
  const books = await Book.find().sort('name');

  res.status(200).render('books', {
    title: 'Knižnica Turany nad Ondavou',
    currentUrl: req.url,
    books,
  });
});

exports.newBookForm = catchAsync(async (req, res, next) => {
  res.status(200).render('new-book-form', {
    title: 'Pridanie novej knihy',
  });
});

exports.getContactPage = catchAsync(async (req, res, next) => {
  res.status(200).render('contact', {
    title: 'Kontakt',
  });
});

exports.getBookPage = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const book = await Book.findOne({ slug: req.params.slug });

  if (!book) {
    return next(new AppError('V databáze sa táto kniha nenašla', 404));
  }

  res.status(200).render('book', {
    book,
  });
});

exports.getProfilePage = catchAsync(async (req, res, next) => {
  res.status(200).render('profile', {
    title: 'Profil',
  });
});
