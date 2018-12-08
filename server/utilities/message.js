// Generage message
const generageMessage = (from, text) => ({
  createdAt: new Date().getTime(),
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
