const path = require("path");
const products = require(path.join(__dirname, "../Data/product.json"));
const users = require(path.join(__dirname, "../Data/users.json"));

// Fungsi untuk mendapatkan user berdasarkan username
const getUserByUsername = (username) => {
  return users.find((u) => u.username === username);
};
// CREATE
exports.createProduct = (req, res) => {
  const { productName, productCategory, price, owner } = req.body;

  const user = getUserByUsername(owner);
  if (!user) {
    return res.status(400).json({ message: "Owner tidak ditemukan" });
  }
  if (user.role !== "seller") {
    return res.status(403).json({ message: "Hanya seller bisa tambah produk" });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    productName,
    productCategory,
    price,
    owner: user.username
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

// READ All
exports.getAllProducts = (req, res) => {
  res.json(products);
};

// READ By Id
exports.getProductById = (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }
  res.json(product);
};

// UPDATE - Update produk (hanya seller & owner)
exports.updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { productName, productCategory, price, owner } = req.body;

  const user = getUserByUsername(owner);
  if (!user || user.role !== "seller") {
    return res.status(403).json({ message: "Hanya seller bisa update produk" });
  }

  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }
  if (product.owner !== user.username) {
    return res
      .status(403)
      .json({ message: "Tidak bisa update produk milik orang lain" });
  }

  if (productName) product.productName = productName;
  if (productCategory) product.productCategory = productCategory;
  if (price) product.price = price;

  res.json(product);
};

// DELETE - Hapus produk (hanya seller & owner)
exports.deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { owner } = req.body;

  const user = getUserByUsername(owner);
  if (!user || user.role !== "seller") {
    return res.status(403).json({ message: "Hanya seller bisa hapus produk" });
  }

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }
  if (products[index].owner !== user.username) {
    return res
      .status(403)
      .json({ message: "Tidak bisa hapus produk milik orang lain" });
  }

  const deletedProduct = products.splice(index, 1);
  res.json({ message: "Produk berhasil dihapus", deletedProduct });
};
