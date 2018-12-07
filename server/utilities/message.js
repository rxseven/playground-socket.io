// Generage message
const generageMessage = (from, text) => ({
  createdAt: new Date().getTime(),
  from,
  text
});

// Module exports
module.exports = { generageMessage };
