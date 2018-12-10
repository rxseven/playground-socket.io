// Module dependencies
const expect = require('expect');

const { Users } = require('../users');

// Constants
let seed;

// Test configuration
beforeEach(() => {
  seed = new Users();
  seed.users = [
    {
      id: '1',
      name: 'Mike',
      room: 'Node course'
    },
    {
      id: '2',
      name: 'HJM',
      room: 'React course'
    },
    {
      id: '3',
      name: 'Julia',
      room: 'Node course'
    }
  ];
});

// Test suite
describe('Users', () => {
  it('should add new user', () => {
    // Variables
    const users = new Users();
    const user = {
      id: '001',
      name: 'Mike',
      room: 'Web development'
    };
    users.addUser(user.id, user.name, user.room);

    // Assertions
    expect(users.users).toEqual([user]);
  });

  it('should find user', () => {
    // Variables
    const id = '2';
    const user = seed.getUser(id);

    // Assertions
    expect(user.id).toBe(id);
  });

  it('should not find user', () => {
    // Variables
    const id = '10';
    const user = seed.getUser(id);

    // Assertions
    expect(user).toBeFalsy();
  });

  it('should return names from Node course', () => {
    // Variables
    const userList = seed.getUserList('Node course');

    // Assertions
    expect(userList).toEqual(['Mike', 'Julia']);
  });

  it('should return names from React course', () => {
    // Variables
    const userList = seed.getUserList('React course');

    // Assertions
    expect(userList).toEqual(['HJM']);
  });

  it('should remove a user', () => {
    // Variables
    const id = '1';
    const user = seed.removeUser(id);

    // Assertions
    expect(user.id).toBe(id);
    expect(seed.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    // Variables
    const id = '10';
    const user = seed.removeUser(id);

    // Assertions
    expect(user).toBeFalsy();
    expect(seed.users.length).toBe(3);
  });
});
