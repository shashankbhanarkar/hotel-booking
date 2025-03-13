// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
    // Log the error message to the console
    console.error('Error: ', err.message);

    // Send a 500 Internal Server Error response with a message
    res.status(500).send({ message: 'Internal Server Error' });
};

// Export the errorHandler middleware function
module.exports = { errorHandler };