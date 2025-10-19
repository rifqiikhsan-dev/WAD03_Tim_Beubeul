const userRepository = require("../Repositories/userRepository");

class UserService {
  async getUsers() {
    return await userRepository.getAllUsers();
  }

  async getUser(username) {
    const user = await userRepository.getUserByUsername(username);
    if (!user) throw new Error("User not found");
    return user;
  }

  async createUser(data) {
    const { username, name, email, role } = data;

    const existingUser = await userRepository.getUserByUsername(username);
    if (existingUser) throw new Error("Username already exists");

    return userRepository.createUser({ username, name, email, role });
  }
}

module.exports = new UserService();
