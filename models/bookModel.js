const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema(
  {
    slug: String,
    name: {
      type: String,
      required: [true, 'Prosím, zadajte názov knihy'],
    },
    author: {
      type: String,
      required: [true, 'Prosím, zadajte meno autora'],
    },
    releaseDate: {
      type: Date,
      default: undefined,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    tags: Array,
    ISBN: String,
    category: Array,
    coverImage: { type: String, default: 'book-default.jpg' },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    borrowedAt: Date,
    borrowEndAt: Date,
  },
  {
    toJSON: { virtuals: true }, // true if i want to see virtual properties
    toObject: { virtuals: true },
  }
);

bookSchema.index({ name: 1, author: 1 }, { unique: true });
bookSchema.index({ name: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ slug: 1 });

bookSchema.pre('save', function (next) {
  this.slug = slugify(`${this.author} ${this.name}`, { lower: true });
  next();
});

bookSchema.pre('save', function (next) {
  
  const authorTags = this.author.split(" ")
  const nameTags = this.name.split(" ")
  this.tags = authorTags.concat(nameTags)
  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
