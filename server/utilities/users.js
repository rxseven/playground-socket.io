// Users class
class Users {
  // Constructor
  constructor() {
    this.users = [];
  }

  // Add user
  addUser(id, name, room) {
    // Create a new user
    const user = { id, name, room };

    // Add new user to the list
    this.users.push(user);

    // Return new user
    return user;
  }

  // Get user
  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }
}

// Module exports
module.exports = { Users };
