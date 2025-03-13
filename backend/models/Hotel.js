const mongoose = require('mongoose');

// Define the hotel schema
const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Hotel name is required
    },
    location: {
        type: String,
        required: true // Hotel location is required
    },
    rating: {
        type: Number,
        required: true, // Hotel rating is required
        min: 0, // Minimum rating value
        max: 5 // Maximum rating value
    },
    description: {
        type: String,
        required: true // Hotel description is required
    },
    images: [{
        type: String,
        required: true // Hotel images are required
    }],
    amenities: {
        type: Array,
        required: true // Hotel amenities are required
    },
    host: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true // Host is required
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room', // Reference to the Room model
        },
    ],
},
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create the Hotel model from the schema
const Hotel = mongoose.model("Hotel", hotelSchema);

// Export the Hotel model
module.exports = Hotel;