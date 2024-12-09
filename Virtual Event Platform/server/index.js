// server/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/eventRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/virtual-event-db', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('Hello, Virtual Event Platform!');
  });
  
// Socket.io
io.use(async (socket, next) => {
  try {
    // Extract the token from the query parameter
    const token = socket.handshake.query.token;

    // Verify the JWT token using the middleware
    const decoded = await authMiddleware.verifyToken(token);

    // Verify that the user exists
    const user = await User.findById(decoded.userId);

    if (!user) {
      return next(new Error('User not found'));
    }

    // Attach the user ID to the socket for future use
    socket.userId = decoded.userId;

    // Continue with the connection
    next();
  } catch (error) {
    // Handle authentication failure
    next(new Error('Authentication failed'));
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id, 'User ID:', socket.userId);

  // Handle events, chat, video conferencing, etc.

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});