const express = require('express');
const { isAuthenticated } = require('../middleware/authMiddleware');
const {
    createRoom,
    getRoomsByHotelId,
    getRoomById,
    updateRoom,
    deleteRoom
} = require('../controllers/roomController');

const router = express.Router();

// Route to get all rooms by hotel ID (requires authentication)
router.get('/hotel/:hotelId', isAuthenticated, getRoomsByHotelId);

// Route to create a new room (requires authentication)
router.post('/', isAuthenticated, createRoom);

// Route to get a room by ID (requires authentication)
router.get('/:id', isAuthenticated, getRoomById);

// Route to update a room by ID (requires authentication)
router.put('/:id', isAuthenticated, updateRoom);

// Route to delete a room by ID (requires authentication)
router.delete('/:id', isAuthenticated, deleteRoom);

// Export the router
module.exports = router;