// A standalone build of the client is exposed by default by the server
// at /socket.io/socket.io.js.

// Initialize Socket.io connection
var socket = io('http://localhost:5000');

// Scroll to bottom
function scrollBottom() {
  // Selectors
  var $messages = $('#message-list');
  var $newMessage = $messages.children('li:last-child');

  // DOM properties
  var clientHeight = $messages.prop('clientHeight');
  var scrollTop = $messages.prop('scrollTop');
  var scrollHeight = $messages.prop('scrollHeight');

  // Heights
  var newMessageHeight = $newMessage.innerHeight();
  var lastMessageHeight = $newMessage.prev().innerHeight();

  // Scrolling condition
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    $messages.scrollTop(scrollHeight);
  }
}

// Connected to the server
socket.on('connect', function() {
  console.log('Socket.io - Connected to the server');

  var params = jQuery.deparam(window.location.search);

  // Join a chat room
  socket.emit('join', params, function(error) {
    if (error) {
      // Show error message
      alert(error);

      // Redirect user to home screen
      window.location.href = '/';
    } else {

    }
  });
});

// Disconnected from the server
socket.on('disconnect', function() {
  console.log('Socket.io - Disconnected from the server');
});

// Listen for new message
socket.on('newMessage', function(message) {
  // Variables
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#template-message').html();

  // Render elements
  var html = Mustache.render(template, {
    createdAt: formattedTime,
    from: message.from,
    text: message.text
  });

  // Insert content to the end of the list element
  $('#message-list').append(html);

  // Scroll message list to the bottom
  scrollBottom();
});

// Listen for new location message
socket.on('newLocation', function(message) {
  // Variables
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#template-location').html();

  // Render elements
  var html = Mustache.render(template, {
    createdAt: formattedTime,
    from: message.from,
    url: message.url
  });

  // Insert content to the end of the list element
  $('#message-list').append(html);

  // Scroll message list to the bottom
  scrollBottom();
});

// Form
$('#message-form').on('submit', function(event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Variables
  var $messageInput = $('#message-input');

  // Create new message
  socket.emit('createMessage', {
    from: 'User',
    text: $messageInput.val()
  }, function(data) {
    // Reset the input
    $messageInput.val('');
  });
});

// Send current location
var $locationButton = $('#message-location');
$locationButton.on('click', function() {
  // Check Geolocation support
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  // Disable the button while processing
  $locationButton.attr('disabled', 'disabled').text('Sending location...');

  // Get current location
  navigator.geolocation.getCurrentPosition(function(position) {
    // Emit current location
    socket.emit('createLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function() {
      // Enable the button once the location message has been sent successfully
      $locationButton.removeAttr('disabled').text('Send location');
    });
  }, function() {
    // Enable the button when unable to fetch location
    $locationButton.removeAttr('disabled').text('Send location');

    // Alert dialog
    alert('Unable to fetch location.');
  })
});
