// Module dependencies
const expect = require('expect');

const { isString } = require('../validation');

// Test suite
describe('isString', () => {
  it('should reject non-string values', () => {
    // Variables
    const response = isString(98);

    // Assertions
    expect(response).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    // Variables
    const response = isString('   ');

    // Assertions
    expect(response).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    // Variables
    const response = isString('  Hi there  ');

    // Assertions
    expect(response).toBeTruthy();
  });
});
