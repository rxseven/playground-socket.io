// Module dependencies
const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Public path
const publicPath = path.join(__dirname, '../public');

// Create Express server
const app = express();

// Logger
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(bodyParser.json());

// Serve static files
app.use(express.static(publicPath));

// Bind and listen for connections on the specified host and port
app.listen(process.env.PORT || 5000, () => {
  console.log('Server is listening on port 5000');
});

// Module exports
module.exports = { app };
