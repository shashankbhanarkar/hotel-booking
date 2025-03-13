const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using mongoose
        const conn = await mongoose.connect('mongodb://localhost:27017/hotelBooking', {
            useNewUrlParser: true, // Use the new URL parser
            useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
        });

        // Log a success message if the connection is successful
        console.log(`MongoDB is connected`);
        
    } catch (err) {
        // Log an error message if the connection fails
        console.log(`Error : ${err.message}`);
        process.exit(1); // Exit the process with failure
    }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;