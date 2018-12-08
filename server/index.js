// Module dependencies
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const socketIO = require('socket.io');

const { generageMessage } = require('./utilities/message');

// Public path
const publicPath = path.join(__dirname, '../public');

// Initialize app to be a function handler
const app = express();

// Logger
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('dev'));
}

// CORS
app.use(cors());

// Body parsing
app.use(bodyParser.json());

// Serve static files
app.use(express.static(publicPath));

// Create an HTTP server object
const server = http.createServer(app);

// Initialize a new instance of Socket.io by passing the HTTP server object
const io = socketIO(server);

// Listen on the connection event for incoming sockets
io.on('connection', (socket) => {
  // Socket connected
  console.log('Socket.io - New socket connected');

  // Send greeting message to the individual user
  socket.emit('newMessage', generageMessage('Admin', 'Welcome to the Chat app'));

  // Notify the chat room that new user joined
  socket.broadcast.emit('newMessage', generageMessage('Admin', 'New user joined'));

  // Socket disconnected
  socket.on('disconnect', () => {
    console.log('Socket.io - Socket disconnected');
  });
});

// Bind and listen for connections on the specified host and port
server.listen(process.env.PORT || 5000, () => {
  console.log('Server is listening on port 5000');
});

// Module exports
module.exports = { app };
