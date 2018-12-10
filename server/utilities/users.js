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

  // Get user list
  getUserList(room) {
    // Variables
    const users = this.users.filter(user => user.room === room);
    const names = users.map(user => user.name);

    // Return user list
    return names;
  }

  // Remove user
  removeUser(id) {
    // Variables
    const user = this.getUser(id);

    // Remove a user
    if (user) {
      this.users = this.users.filter(member => member.id !== id);
    }

    // Return user that was removed
    return user;
  }
}

// Module exports
module.exports = { Users };
