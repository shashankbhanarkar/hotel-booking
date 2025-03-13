const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'HOTELBOOKINGUSERAUTHORISER';

// Controller function to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Send a success response
        res.status(200).json({ msg: `New user created successfully - ${newUser.name}` });
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ success: false, message: err.message });
    }
}

// Controller function to log in a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Email does not exist' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({
            id: user._id,
            role: user.role
        },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true });

        // Send a success response
        res.status(200).json({ msg: "Login Successful", token, user });
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ success: false, message: err.message });
    }
}

// Controller function to log out a user
const logoutUser = async (req, res) => {
    try {
        // Clear the token cookie
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        // Send a success response
        res.status(200).json({ success: true, msg: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server error', error: err.message });
    }
}

// Export the controller functions
module.exports = { registerUser, loginUser, logoutUser };
