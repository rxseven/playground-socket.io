/* eslint-disable import/prefer-default-export */
// Validate string
const isString = string => typeof string === 'string' && string.trim().length > 0;

// Module exports
module.exports = { isString };
