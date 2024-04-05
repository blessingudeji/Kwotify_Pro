// controllers/quoteController.js

const Quote = require('../models/Quote');

// Controller function to create a new quote
exports.createQuote = async (req, res) => {
  try {
    const { content, author } = req.body;
    const quote = new Quote({ content, author, userId: req.user._id });
    await quote.save();
    res.status(201).json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete a quote
exports.deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    await Quote.findByIdAndDelete(id);
    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update a quote
exports.updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author } = req.body;
    const quote = await Quote.findByIdAndUpdate(
      id,
      { content, author },
      { new: true }
    );
    res.json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get all quotes
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getQuoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findById(id);
    res.json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
