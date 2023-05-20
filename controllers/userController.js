const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const { updateOne } = require('../models/bookModel');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Nahrať môžete iba obrázok.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(400, 400)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  // 1. Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'Táto cesta neslúži na zmenu hesla. Prosím, použite túto cestu: /updateMyPassword.',
        400
      )
    );
  }

  // 2. Filter out unwanted fields, that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User)

exports.getUsersSortedBooks = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;

  const user = await User.findById(req.user.id);
  const sortedBooksRead = user.booksRead.sort((a, b) => b.wasAdded - a.wasAdded);
  const sortedBooksBorrowed = user.booksBorrowed.sort((a, b) => b.wasAdded - a.wasAdded)
  const sortedBooksReserved = user.booksReserved.sort((a, b) => b.wasAdded - a.wasAdded);

  res.status(200).json({
    status: 'success',
    data: {
      user,
      read: sortedBooksRead,
      borrowed: sortedBooksBorrowed,
      reserved: sortedBooksReserved
    },
  });
});

exports.updateBorrowedBooks = catchAsync(async (userId, bookId) => {
  // Update the User model
  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { booksBorrowed: { book: bookId, wasAdded: new Date() } } },
    { new: true }
  );

  // Update the Book model
  const book = await Book.findByIdAndUpdate(
    bookId,
    { $set: { isBorrowed: true } },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user
    },
  });
})

