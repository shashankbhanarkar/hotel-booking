const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');

// Controller function to create a new hotel
const createHotel = async (req, res) => {
    try {
        const { name, location, price, description, images } = req.body;
        const hostId = req.user.id;

        // Create a new hotel
        const newHotel = await Hotel.create({
            name,
            location,
            description,
            images,
            host: hostId
        });

        // Send a success response
        res.status(201).json({ message: 'Hotel created successfully', hotels: newHotel });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: 'Error creating hotel', error: err.message });
    }
};

// Controller function to get all hotels
const getHotels = async (req, res) => {
    try {
        // Fetch all hotels and populate host details
        const hotels = await Hotel.find().populate('host', 'name email');

        // Send a success response
        res.status(200).json({ message: 'Hotels fetched successfully', hotels: hotels });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: 'Error fetching hotels', error: err.message });
    }
};

// Controller function to get a hotel by ID
const getHotelById = async (req, res) => {
    try {
        // Fetch the hotel by ID and populate host details
        const hotel = await Hotel.findById(req.params.id).populate('host', 'name email');

        // Check if the hotel exists
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // Send a success response
        res.status(200).json({ message: 'Hotel fetched successfully', hotel: hotel });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: 'Error fetching hotel', error: err.message });
    }
};

// Controller function to update a hotel by ID
const UpdateHotel = async (req, res) => {
    try {
        console.log('Hotel ID:', req.params.id); 

        // Find and update the hotel by ID
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // Check if the hotel exists
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // Send a success response
        res.status(200).json({ message: 'Hotel updated successfully', hotel: hotel });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: 'Error updating hotel', error: err.message });
    }
};

// Controller function to delete a hotel by ID
const deleteHotel = async (req, res) => {
    try {
        // Find and delete the hotel by ID
        const hotel = await Hotel.findByIdAndDelete(req.params.id);

        // Check if the hotel exists
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // Send a success response
        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: 'Error deleting hotel', error: err.message });
    }
};

// Export the controller functions
module.exports = { createHotel, getHotels, getHotelById, UpdateHotel, deleteHotel };