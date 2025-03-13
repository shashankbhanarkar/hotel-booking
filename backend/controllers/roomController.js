const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

// Controller function to create a new room
const createRoom = async (req, res) => {
    try {
        const { hotel, number, type, prices, capacity } = req.body;

        // Check if the hotel exists
        const existingHotel = await Hotel.findById(hotel);
        if (!existingHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        // Create a new room
        const newRoom = await Room.create({
            hotel,
            number,
            type,
            prices,
            capacity
        });

        // Send a success response
        res.status(201).json({ message: "Room created successfully", newRoom });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: "Error creating room", error: err.message });
    }
};

// Controller function to get all rooms by hotel ID
const getRoomsByHotelId = async (req, res) => {
    try {
        // Fetch all rooms for a specific hotel
        const rooms = await Room.find({ hotel: req.params.hotelId });

        // Send a success response
        res.status(200).json({ rooms });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: "Error getting rooms", error: err.message });
    }
};

// Controller function to get a room by ID
const getRoomById = async (req, res) => {
    try {
        // Fetch the room by ID and populate hotel details
        const room = await Room.findById(req.params.id).populate('hotel', 'name location');

        // Check if the room exists
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Send a success response
        res.status(200).json({ room });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: "Error getting room", error: err.message });
    }
};

// Controller function to update a room by ID
const updateRoom = async (req, res) => {
    try {
        // Find and update the room by ID
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // Check if the room exists
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Send a success response
        res.status(200).json({ message: 'Room updated successfully', room });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: "Error updating room", error: err.message });
    }
};

// Controller function to delete a room by ID
const deleteRoom = async (req, res) => {
    try {
        // Find and delete the room by ID
        const room = await Room.findByIdAndDelete(req.params.id);

        // Check if the room exists
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Send a success response
        res.status(200).json({ message: "Room deleted successfully" });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: "Error deleting room", error: err.message });
    }
};

// Export the controller functions
module.exports = {
    createRoom,
    getRoomsByHotelId,
    getRoomById,
    updateRoom,
    deleteRoom
};