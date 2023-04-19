const Book = require('./../models/bookModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const axios = require('axios');

exports.searchBookByName = catchAsync(async (req, res, next) => {
    const data = await axios({
        method: 'GET',
        url: `https://www.googleapis.com/books/v1/volumes?q=${titleName
          .split(' ')
          .join('+')}+inauthor:${authorName.split(' ').join('+')}`,
      });

    console.log(data);
    next()
})