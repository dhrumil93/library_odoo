const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  borrowedAt: { type: Date, default: Date.now },
  returnedAt: { type: Date },
  dueDate: { type: Date },
  returned: { type: Boolean, default: false },
  overdue: { type: Boolean, default: false },
  lateFee: { type: Number, default: 0 },
});

module.exports = mongoose.model('Borrow', BorrowSchema);
