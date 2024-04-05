// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./db");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes.js");
const quoteRoutes = require("./routes/quoteRoutes.js");

// Load environment variables from .env file
dotenv.config();

const app = express();
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet()); // Adds security headers
app.use(morgan("combined")); // Logs HTTP requests

app.use("/api/auth", authRoutes);
app.use("/quotes", quoteRoutes);

module.exports = app;

