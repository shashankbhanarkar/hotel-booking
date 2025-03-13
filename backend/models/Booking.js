const mongoose = require('mongoose');

// Define the booking schema
const bookingSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', // Reference to the Hotel model
        required: true // Hotel is required
    },
    room: {
        type: String,
        required: true // Room is required
    },
    checkin: {
        type: Date,
        required: true // Check-in date is required
    },
    checkout: {
        type: Date,
        required: true // Check-out date is required
    },
    guests: {
        adults: {
            type: Number,
            required: true // Number of adults is required
        },
        children: {
            type: Number,
            required: true // Number of children is required
        },
        infants: {
            type: Number,
            required: true // Number of infants is required
        }
    },
    totalPrice: {
        type: Number,
        required: true // Total price is required
    },
    paymentMethod: {
        type: String,
        required: true // Payment method is required
    }
});

// Create the Booking model from the schema
const Booking = mongoose.model('Booking', bookingSchema);

// Export the Booking model
module.exports = Booking;