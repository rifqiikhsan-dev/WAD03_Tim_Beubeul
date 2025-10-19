const userService = require("../Services/userService");

exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
};

exports.getUserByUsername = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.username);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
