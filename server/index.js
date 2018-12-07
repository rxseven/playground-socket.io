// Module dependencies
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');

// Public path
const publicPath = path.join(__dirname, '../public');

// Initialize app to be a function handler
const app = express();

// Create an HTTP server object
const server = http.createServer(app);

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

// Bind and listen for connections on the specified host and port
server.listen(process.env.PORT || 5000, () => {
  console.log('Server is listening on port 5000');
});

// Module exports
module.exports = { app };
