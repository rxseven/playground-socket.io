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

// Listen for new message
socket.on('newMessage', function(message) {
  // Create a list element
  var li = $('<li></li>');

  // Set the content of the list element to the specified message.
  li.text(message.from + ': ' + message.text);

  // Insert content to the end of the list element.
  $('#message-list').append(li);
});

// Form
$('#message-form').on('submit', function(event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Create new message
  socket.emit('createMessage', {
    from: 'User',
    text: $('#message-input').val()
  }, function(data) {
    console.log('Acknowledgement -', data);
  });
});
