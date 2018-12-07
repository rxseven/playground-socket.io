// Module dependencies
const expect = require('expect');

const { generageMessage } = require('../message');

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
