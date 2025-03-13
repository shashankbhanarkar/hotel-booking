const jwt = require('jsonwebtoken');
const JWT_SECRET = "HOTELBOOKINGUSERAUTHORISER";

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    try {
        // Get the token from cookies or authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        console.log("Token:", token);

        // If no token is found, return an unauthorized error
        if (!token) {
            return res.status(401).json({ message: "You are not an authenticated user" });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);

        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        // Log the error and return an invalid token error
        console.error('Token Verification Error:', err.message);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

// Middleware to check if the user is an admin
const adminOnly = (req, res, next) => {
    // If the user's role is not admin, return a forbidden error
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access Denied: Admins only" });
    }
    next();
}

// Export the middleware functions
module.exports = { isAuthenticated, adminOnly };