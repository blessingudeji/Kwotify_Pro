const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js'); // Import authentication middleware
const Quote = require('../models/Quote.js');
const {
  createQuote,
  deleteQuote,
  updateQuote,
  getAllQuotes,
  getQuoteById,
} = require('../controllers/quoteController.js');

// Middleware to authenticate requests
router.use(authMiddleware);

// Get all quotes
router.get('/', getAllQuotes);

// Create a new quote
router.post('/', createQuote);

// Update a quote
router.put('/:id', updateQuote);

// Delete a quote
router.delete('/:id', deleteQuote);

// Get a quote by ID
router.get('/:id', getQuoteById);

module.exports = router;
