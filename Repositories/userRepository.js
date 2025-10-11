const path = require("path");
const users = require(path.join(__dirname, "../Data/users.json"));

class UserRepository {
  getAllUsers() {
    return users;
  }

  getUserByUsername(username) {
    return users.find((u) => u.username === username);
  }

  createUser(user) {
    users.push(user);
    return user;
  }
}

module.exports = new UserRepository();
