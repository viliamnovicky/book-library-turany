const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const { updateOne } = require('../models/bookModel');

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
      read:sortedBooksRead,
      borrowed:sortedBooksBorrowed,
      reserved: sortedBooksReserved  
    },
  });
});

exports.updateBorrowedBooks = catchAsync(async(userId, bookId) => {
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

