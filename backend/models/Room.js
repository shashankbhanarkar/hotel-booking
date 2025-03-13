const mongoose = require('mongoose');

// Define the room schema
const roomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', // Reference to the Hotel model
        required: true // Hotel is required
    },
    number: {
        type: Number,
        required: true // Room number is required
    },
    type: {
        type: String,
        required: true, // Room type is required
        enum: ['single', 'double', 'suite'] // Allowed values for room type
    },
    prices: {
        type: Number,
        required: true // Room price is required
    },
    isAvailable: {
        type: Boolean,
        default: true // Default value for availability is true
    },
    capacity: {
        type: Number,
        required: true // Room capacity is required
    },
    isBooked: {
        type: Boolean,
        default: false // Default value for booking status is false
    },
},
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create the Room model from the schema
const Room = mongoose.model('Room', roomSchema);

// Export the Room model
module.exports = Room;