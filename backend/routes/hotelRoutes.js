const express = require('express');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { createHotel, getHotels, getHotelById, UpdateHotel, deleteHotel } = require('../controllers/hotelController');

const router = express.Router();

// Public Routes

// Route to get all hotels
router.get('/', getHotels);

// Route to get a hotel by ID
router.get('/:id', getHotelById);

// Protected Routes

// Route to create a new hotel (requires authentication)
router.post('/', isAuthenticated, createHotel);

// Route to update a hotel by ID (requires authentication)
router.put('/:id', isAuthenticated, UpdateHotel);

// Route to delete a hotel by ID (requires authentication)
router.delete('/:id', isAuthenticated, deleteHotel);

// Export the router
module.exports = router;