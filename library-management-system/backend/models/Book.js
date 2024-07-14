const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String },
  year: { type: Number },
  genre: { type: String },
  quantity: { type: Number, default: 1 },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Book', BookSchema);
