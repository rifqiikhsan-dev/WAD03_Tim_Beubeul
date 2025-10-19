const User = require('../Models/userModel');

class UserRepository {
  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  async getUserByUsername(username) {
    const user = await User.findOne({ where: { username } });
    return user;
  }

  async createUser(user) {
    const newUser = await User.create(user);
    return newUser;
  }
}

module.exports = new UserRepository();
