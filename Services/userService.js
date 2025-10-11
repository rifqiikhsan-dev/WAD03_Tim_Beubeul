const userRepository = require("../Repositories/userRepository");

class UserService {
  getUsers() {
    return userRepository.getAllUsers();
  }

  getUser(username) {
    const user = userRepository.getUserByUsername(username);
    if (!user) throw new Error("User not found");
    return user;
  }

  createUser(data) {
    const { username, name, email, role } = data;

    const existingUser = userRepository.getUserByUsername(username);
    if (existingUser) throw new Error("Username already exists");

    return userRepository.createUser({ username, name, email, role });
  }
}

module.exports = new UserService();
