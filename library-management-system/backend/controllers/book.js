const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a new book
// @route   POST /api/books
// @access  Admin
exports.addBook = async (req, res) => {
  const { isbn, title, author, publisher, year, genre, quantity } = req.body;

  try {
    let book = await Book.findOne({ isbn });
    if (book) {
      return res.status(400).json({ msg: 'Book already exists' });
    }

    book = new Book({
      isbn,
      title,
      author,
      publisher,
      year,
      genre,
      quantity,
    });

    await book.save();
    res.json({ msg: 'Book added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Admin
exports.updateBook = async (req, res) => {
  const { isbn, title, author, publisher, year, genre, quantity } = req.body;
  const bookFields = { isbn, title, author, publisher, year, genre, quantity };

  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    book = await Book.findByIdAndUpdate(req.params.id, { $set: bookFields }, { new: true });
    res.json({ msg: 'Book updated successfully', book });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Admin
exports.deleteBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    await Book.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Book deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
