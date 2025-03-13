const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

// Route to log out a user
router.post('/logout', logoutUser);

// Export the router
module.exports = router;