const path = require("path");

// Load data JSON users
const users = require(path.join(__dirname, "../Data/users.json"));

// CREATE - Tambah user baru
exports.createUser = (req, res) => {
  const { username, name, email, role } = req.body;

  // Cek jika username sudah ada
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = { username, name, email, role };
  users.push(newUser);
  res.status(201).json(newUser);
};

// READ - Ambil semua user
exports.getUsers = (req, res) => {
  res.json(users);
};

// READ - Ambil user berdasarkan username
exports.getUserByUsername = (req, res) => {
  const user = users.find((u) => u.username === req.params.username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};
