const express = require('express');
const { isAuthenticated } = require('../middleware/authMiddleware');
const {
    createBooking,
    getBookings,
    getBookingById,
    deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

// Route to create a new booking
router.post('/', isAuthenticated, createBooking);

// Route to get all bookings
router.get('/', isAuthenticated, getBookings);

// Route to get a booking by ID
router.get('/:id', isAuthenticated, getBookingById);

// Route to delete a booking by ID
router.delete('/:id', isAuthenticated, deleteBooking);

// Export the router
module.exports = router;