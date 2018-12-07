// A standalone build of the client is exposed by default by the server
// at /socket.io/socket.io.js.

// Initialize Socket.io connection
const socket = io('http://localhost:5000');

// Connected to the server
socket.on('connect', () => {
  console.log('Socket.io - Connected to the server');
});

// Disconnected from the server
socket.on('disconnect', () => {
  console.log('Socket.io - Disconnected from the server');
});
