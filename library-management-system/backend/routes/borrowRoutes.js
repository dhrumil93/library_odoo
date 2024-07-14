const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/borrow', authMiddleware, borrowController.borrowBook);
router.post('/return', authMiddleware, borrowController.returnBook);
router.get('/', authMiddleware, borrowController.getBorrowedBooks);

module.exports = router;
