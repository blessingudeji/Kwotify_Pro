const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authController.js");

// Route for user registration
router.post(
  "/signup",
  [
    // Validate input fields
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    check("username").exists().withMessage("Username is required"),
  ],
  registerUser,
);

// Route for user login
router.post(
  "/login",
  [
    // Validate input fields
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("password").exists().withMessage("Password is required"),
  ],
  loginUser,
);

module.exports = router;
