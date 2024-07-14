const Borrow = require('../models/Borrow');
const Book = require('../models/Book');
const User = require('../models/user');

// @desc    Borrow a book
// @route   POST /api/borrow/:bookId
// @access  User
exports.borrowBook = async (req, res) => {
  const { userId } = req.user; // Assuming user ID is extracted from JWT token
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    if (book.quantity === 0 || !book.available) {
      return res.status(400).json({ msg: 'Book is currently not available for borrowing' });
    }

    const borrow = new Borrow({
      userId,
      bookId,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Example: Due date in 7 days
    });

    await borrow.save();
    book.quantity -= 1;
    if (book.quantity === 0) {
      book.available = false;
    }
    await book.save();

    res.json({ msg: 'Book borrowed successfully', borrow });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Return a book
// @route   PUT /api/borrow/return/:borrowId
// @access  User
exports.returnBook = async (req, res) => {
  const { borrowId } = req.params;

  try {
    let borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      return res.status(404).json({ msg: 'Borrow record not found' });
    }

    if (borrow.returned) {
      return res.status(400).json({ msg: 'Book has already been returned' });
    }

    borrow.returned = true;
    borrow.returnedAt = Date.now();

    // Calculate late fee if book is returned late (example: 1 day late fee)
    if (borrow.dueDate < borrow.returnedAt) {
      const daysLate = Math.ceil((borrow.returnedAt - borrow.dueDate) / (24 * 60 * 60 * 1000));
      borrow.overdue = true;
      borrow.lateFee = daysLate * 10; // Example: $10 late fee per day
    }

    await borrow.save();

    const book = await Book.findById(borrow.bookId);
    book.quantity += 1;
    if (book.quantity > 0) {
      book.available = true;
    }
    await book.save();

    res.json({ msg: 'Book returned successfully', borrow });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
