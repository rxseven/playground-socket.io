// A standalone build of the client is exposed by default by the server
// at /socket.io/socket.io.js.

// Initialize Socket.io connection
var socket = io('http://localhost:5000');

// Connected to the server
socket.on('connect', function() {
  console.log('Socket.io - Connected to the server');
});

// Disconnected from the server
socket.on('disconnect', function() {
  console.log('Socket.io - Disconnected from the server');
});

// Form
$('#message-form').on('submit', function(event) {
  // Prevent the form from being submitted
  event.preventDefault();
});
