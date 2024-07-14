const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  borrowedDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: Date,
  returnedDate: Date,
  lateFee: Number,
});

const Borrow = mongoose.model('Borrow', BorrowSchema);
module.exports = Borrow;
