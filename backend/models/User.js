const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // User name is required
    },
    email: {
        type: String,
        required: true, // User email is required
        unique: true // Email must be unique
    },
    password: {
        type: String,
        required: true // User password is required
    },
    role: {
        type: String,
        enum: ['user', 'host', 'admin'], // Allowed values for user role
        default: 'user', // Default role is 'user'
    },
},
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;