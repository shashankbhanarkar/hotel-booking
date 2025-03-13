const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes');

const app = express();
const PORT = 5000;

// Connect to the database
connectDB();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Routes for authentication
app.use('/api/auth', authRoutes);

// Routes for hotels
app.use('/api/hotels', hotelRoutes);

// Routes for bookings
app.use('/api/bookings', bookingRoutes);

// Routes for rooms
app.use('/api/rooms', roomRoutes);

// Middleware to handle errors
app.use(errorHandler);

app.get('/', (req, res) => {  
  res.json('Hello World!');  
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
