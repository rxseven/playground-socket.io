// Module dependencies
const moment = require('moment');

// Generage message
const generageMessage = (from, text) => ({
  createdAt: moment().valueOf(),
  from,
  text
});

// Generate location link
const generateLocation = (from, latitude, longitude) => ({
  createdAt: new Date().getTime(),
  from,
  url: `https://www.google.com/maps?q=${latitude},${longitude}`
});

// Module exports
module.exports = { generageMessage, generateLocation };
