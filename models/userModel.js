const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Prosím, zadajte Vaše užívateľské meno.'],
    unique: [true, 'Toto meno už nieje k dispozícii.'],
  },
  email: {
    type: String,
    required: [true, 'Prosím, zadajte Váš email.'],
    unique: [true, 'S týmto emailom už je registrované iné konto.'],
  },
  photo: {
    type: String,
    default: 'avatar-default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Prosím zadajte heslo.'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Prosím potvrďte svoje heslo.'],
    validate: {
      // Works only with CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Heslá sa žiaľ nezhodujú',
    },
  },
  booksRead: [
    {
      book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
      },
      wasAdded: Date,
    },
  ],
  booksBorrowed: [
    {
      book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
      },
      wasAdded: Date,
    },
  ],
  booksReserved: [
    {
      book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
      },
      wasAdded: Date,
    },
  ],
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.index({ name: 1 });

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'booksRead.book',
    select: '-__v -passwordChangedAt',
  });

  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'booksBorrowed.book',
    select: '-__v -passwordChangedAt',
  });

  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'booksReserved.book',
    select: '-__v -passwordChangedAt',
  });

  next();
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
