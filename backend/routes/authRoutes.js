const express = require("express");

const { Register, Login } = require("../controllers/authController");

const router = express.Router();

// Sign Up new user
router.post("/signup", Register);

// Login existing user
router.post("/login",Login );

module.exports = router;
