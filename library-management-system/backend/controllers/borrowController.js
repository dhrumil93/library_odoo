const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

exports.borrowBook = async (req, res) => {
  const { user, book, dueDate } = req.body;
  try {
    let borrowedBook = await Borrow.findOne({ user, book, returnedDate: null });
    if (borrowedBook) {
      return res.status(400).json({ msg: 'Book already borrowed by the user' });
    }

    let bookDetails = await Book.findById(book);
    if (!bookDetails) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    if (bookDetails.available <= 0) {
      return res.status(400).json({ msg: 'Book not available' });
    }

    bookDetails.available -= 1;
    await bookDetails.save();

    borrowedBook = new Borrow({
      user,
      book,
      dueDate,
    });

    await borrowedBook.save();
    res.json(borrowedBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.returnBook = async (req, res) => {
  const { user, book, returnedDate, lateFee } = req.body;
  try {
    let borrowedBook = await Borrow.findOne({ user, book, returnedDate: null });
    if (!borrowedBook) {
      return res.status(400).json({ msg: 'No borrowed record found' });
    }

    borrowedBook.returnedDate = returnedDate;
    borrowedBook.lateFee = lateFee;
    await borrowedBook.save();

    let bookDetails = await Book.findById(book);
    if (!bookDetails) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    bookDetails.available += 1;
    await bookDetails.save();

    res.json(borrowedBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await Borrow.find({ user: req.user.id }).populate('book');
    res.json(borrowedBooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
