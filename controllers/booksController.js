const Book = require('./../models/bookModel');
const catchAsync = require('./../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadBookCoverPhoto = upload.single('coverImage');

exports.resizeBookCoverPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  console.log(req.file);
  console.log(req.body);

  req.file.filename = `book-cover-${req.body.author
    .split(' ')
    .join('-')
    .replaceAll('.', '-')}-${req.body.name
    .split(' ')
    .join('-')
    .replaceAll('.', '-')}.jpeg`;
  req.body.coverImage = req.file.filename;
  console.log(req.body);

  await sharp(req.file.buffer)
    .resize(400, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 80 })
    .toFile(`public/img/books/${req.file.filename}`);

  next();
});

exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);
  console.log(req.body);
  if (req.file) req.body.coverImage = req.file.filename;

  res.status(201).json({
    status: 'success',
    data: {
      book: newBook,
    },
  });
});

exports.getAllBooks = factory.getAll(Book);

exports.getAllBooksI = catchAsync(async (req, res, next) => {
  const searchField = req.query.field;
  const searchQuery = req.query.query;
  const regex = new RegExp(searchQuery, 'i');
  const searchCriteria = {};
  searchCriteria[searchField] = regex;
  const books = await Book.find(searchCriteria);
  console.log(req.query.query);
  console.log(req.query.field);

  res.status(200).json({
    title: 'success',
    results: books.length,
    data: {
      books,
    },
  });
});

exports.getOneBook = factory.getOne(Book);
