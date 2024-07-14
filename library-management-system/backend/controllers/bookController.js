const Book = require('../models/Book');

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
      available: quantity,
    });

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateBook = async (req, res) => {
  const { isbn, title, author, publisher, year, genre, quantity } = req.body;
  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    book.isbn = isbn || book.isbn;
    book.title = title || book.title;
    book.author = author || book.author;
    book.publisher = publisher || book.publisher;
    book.year = year || book.year;
    book.genre = genre || book.genre;
    book.quantity = quantity || book.quantity;
    book.available = book.quantity - book.borrowedCount;

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    await book.remove();
    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
