const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  publisher: String,
  year: Number,
  genre: String,
  quantity: Number,
  available: Number,
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
