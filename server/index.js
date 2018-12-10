// Module dependencies
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const socketIO = require('socket.io');

const { generageMessage, generateLocation } = require('./utilities/message');
const { Users } = require('./utilities/users');
const { isString } = require('./utilities/validation');

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

// Initialize users instance
const users = new Users();

// Listen on the connection event for incoming sockets
io.on('connection', (socket) => {
  // Socket connected
  console.log('Socket.io - New socket connected');

  // Listem for a new user
  socket.on('join', (params, callback) => {
    // Validate input params
    if (!isString(params.name) || !isString(params.room)) {
      // Return an error message
      callback('Name and Room name are requried');

      // Stop the function execution
      return;
    }

    // Subscribe the socket to a given chat room
    socket.join(params.room);

    // Remove the existing user from other chat room
    users.removeUser(socket.id);

    // Add new user
    users.addUser(socket.id, params.name, params.room);

    // Update users list
    io.to(params.room).emit('updateUsers', users.getUserList(params.room));

    // Send greeting message to the individual user
    socket.emit('newMessage', generageMessage('Admin', 'Welcome to the Chat app'));

    // Notify the chat room that new user joined
    socket.broadcast
      .to(params.room)
      .emit('newMessage', generageMessage('Admin', `${params.name} has joined.`));

    // Return an acknowledgement
    callback();
  });

  // Listen for new message
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage:', message);

    // Variables
    const user = users.getUser(socket.id);

    // Validate user and text message
    if (user && isString(message.text)) {
      // Send message to a specific chat room
      io.to(user.room).emit('newMessage', generageMessage(user.name, message.text));
    }

    // Execute a callback
    callback();
  });

  // Listen for new location message
  socket.on('createLocation', (coords, callback) => {
    // Execute a callback
    callback();

    // Send location message to every single connection
    io.emit('newLocation', generateLocation('Admin', coords.latitude, coords.longitude));
  });

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
