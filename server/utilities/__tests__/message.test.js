// Module dependencies
const expect = require('expect');

const { generageMessage, generateLocation } = require('../message');

// Test suite
describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // Variables
    const from = 'Admin';
    const text = 'Some message';
    const message = generageMessage(from, text);

    // Assertions
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      from,
      text
    });
  });
});

// Test suite
describe('generateMessage', () => {
  it('should generate correct location object', () => {
    // Variables
    const from = 'Admin';
    const latitude = 13.4513253;
    const longitude = 144.508632;
    const url = 'https://www.google.com/maps?q=13.4513253,144.508632';
    const message = generateLocation(from, latitude, longitude);

    // Assertions
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      from,
      url
    });
  });
});
