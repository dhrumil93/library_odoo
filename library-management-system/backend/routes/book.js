const express = require('express');
const router = express.Router();
const { getBooks, addBook, updateBook, deleteBook } = require('../controllers/book');

// @route   GET /api/books
// @desc    Get all books
// @access  Public
router.get('/', getBooks);

// @route   POST /api/books
// @desc    Add a new book
// @access  Admin
router.post('/', addBook);

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Admin
router.put('/:id', updateBook);

// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Admin
router.delete('/:id', deleteBook);

module.exports = router;
