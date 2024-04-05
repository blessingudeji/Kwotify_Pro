// src/index.js
import Alpine from "alpinejs";


//NOTE: For now just bind process to specific port
const PORT = 3000;
window.Alpine = Alpine;
Alpine.data("signup", () => ({
  name: "",
  email: "",
  username: "",
  password: "",
  errors: {},
  loading: false,

  async submitForm() {
    console.log("submitform entered");
    // Validate form fields
    this.errors = {};
    if (!this.name) {
      this.errors["name"] = "Please enter your full name";
    }
    if (!this.email) {
      this.errors["email"] = "Please enter your email";
    } else if (!this.validateEmail(this.email)) {
      this.errors["email"] = "Please enter a valid email address";
    }
    if (!this.username) {
      this.errors["username"] = "Please enter a username";
    }
    if (!this.password) {
      this.errors["password"] = "Please enter a password";
    }

    // If there are errors, stop form submission
    if (Object.keys(this.errors).length > 0) {
      return;
    }

    this.loading = true;
    // If no errors, proceed to submit form data to the backend
    try {
      console.log("trying to submit!");
      const response = await fetch(`http://localhost:${PORT}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: this.name,
          email: this.email,
          username: this.username,
          password: this.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      console.log("Signup successful");
      // Optionally, redirect to another page or perform other actions after successful signup
      window.location.href = "/login.html"; // Redirect to dashboard page
    } catch (error) {
      this.loading = false;
      console.error("Signup failed:", error.message);
    }
  },

  validateEmail(email) {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  },
}));

Alpine.data("login", () => ({
  email: "",
  password: "",
  err: {},
  loading: false,

  async submitForm() {
    console.log('Submitting....')
    // Clear previous errors
    this.err = {};

    // Validate form fields
    if (!this.email) {
      this.err["email"] = "Please enter your  email";
    }
    if (!this.password) {
      this.err["password"] = "Please enter your password";
    }

    // If there are errors, stop form submission
    if (Object.keys(this.err).length > 0) {
      return;
    }

    this.loading = true;
    // If no errors, proceed to submit form data to the backend
    try {
      const response = await fetch(`http://localhost:${PORT}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });

      // Check if login was successful
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        console.log('Did not work')
        throw new Error(errorData.message || "Login failed");
      }

      // Optionally, redirect to another page or perform other actions after successful login
      console.log("Login successful");
      window.location.href = "/dashboard.html"; // Redirect to dashboard page
    } catch (error) {
      this.loading = false;

      console.error("Login failed:", error.message);
      this.err["login"] = error.message || "Login failed";
    }
  },
}));

Alpine.start();

