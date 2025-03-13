const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');

// Controller function to create a new booking
const createBooking = async (req, res) => {
    try {
        const { hotel, room, checkin, checkout, guests, totalPrice, paymentMethod } = req.body;

        // Check if the hotel exists
        const existingHotel = await Hotel.findById(hotel);
        if (!existingHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        // Create a new booking
        const newBooking = await Booking.create({
            hotel,
            room,
            checkin,
            checkout,
            guests,
            totalPrice,
            paymentMethod
        });

        // Send a success response
        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: "Error creating booking", error: err.message });
    }
};

// Controller function to get all bookings
const getBookings = async (req, res) => {
    try {
        // Fetch all bookings and populate hotel details
        const bookings = await Booking.find()
            .populate('hotel', 'name location');

        // Send a success response
        res.status(200).json({ bookings });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: "Error fetching bookings", error: err.message });
    }
};

// Controller function to get a booking by ID
const getBookingById = async (req, res) => {
    try {
        // Fetch the booking by ID and populate hotel details
        const booking = await Booking.findById(req.params.id)
            .populate('hotel', 'name location');

        // Check if the booking exists
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Send a success response
        res.status(200).json({ booking });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: "Error fetching booking", error: err.message });
    }
};

// Controller function to delete a booking by ID
const deleteBooking = async (req, res) => {
    try {
        // Find and delete the booking by ID
        const booking = await Booking.findByIdAndDelete(req.params.id);

        // Check if the booking exists
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Send a success response
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (err) {
        // Send an error response
        res.status(500).json({ message: "Error deleting booking", error: err.message });
    }
};

// Export the controller functions
module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    deleteBooking
};