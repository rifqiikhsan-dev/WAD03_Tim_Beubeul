const userService = require("../Services/userService");

exports.createUser = (req, res) => {
  try {
    const newUser = userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = (req, res) => {
  const users = userService.getUsers();
  res.json(users);
};

exports.getUserByUsername = (req, res) => {
  try {
    const user = userService.getUser(req.params.username);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
