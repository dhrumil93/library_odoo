const express = require('express');
const router = express.Router();
const { borrowBook, returnBook } = require('../controllers/borrow');

// @route   POST /api/borrow/:bookId
// @desc    Borrow a book
// @access  User
router.post('/:bookId', borrowBook);

// @route   PUT /api/borrow/return/:borrowId
// @desc    Return a book
// @access  User
router.put('/return/:borrowId', returnBook);

module.exports = router;
