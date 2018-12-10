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
}

// Module exports
module.exports = { Users };
