const fs = require('fs');
const path = require('path');
const CartRepository = require("../Repositories/cartRepository");

const usersPath = path.join(__dirname, '../Data/users.json');
const productsPath = path.join(__dirname, '../Data/product.json');
const cartsPath = path.join(__dirname, '../Data/carts.json');

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

class CartService {
  static addToCart(username, productId, qty = 1) {
    const users = readJSON(usersPath);
    const products = readJSON(productsPath);
    const carts = readJSON(cartsPath);

    const user = users.find(u => u.username === username);
    if (!user) throw new Error('User tidak ditemukan');

    const product = products.find(p => p.id === productId);
    if (!product) throw new Error('Produk tidak ditemukan');

    let cartUser = carts.find(c => c.username === username);
    if (!cartUser) {
      cartUser = { username, items: [] };
      carts.push(cartUser);
    }

    const item = cartUser.items.find(i => i.productId === productId);
    if (item) {
      item.qty += qty;
    } else {
      cartUser.items.push({ productId, qty });
    }

    writeJSON(cartsPath, carts);
    return cartUser;
  }

  // Hapus produk dari cart
  static removeFromCart(username, productId) {
    const carts = readJSON(cartsPath);
    const cartUser = carts.find(c => c.username === username);
    if (!cartUser) throw new Error('Cart tidak ada');

    cartUser.items = cartUser.items.filter(i => i.productId !== productId);
    writeJSON(cartsPath, carts);

    return cartUser;
  }

  // Ambil cart berdasarkan username
  static getCart(username) {
    const users = readJSON(usersPath);
    const products = readJSON(productsPath);
    const carts = readJSON(cartsPath);

    const user = users.find(u => u.username === username);
    if (!user) throw new Error('User tidak ditemukan');

    const cartUser = carts.find(c => c.username === username);
    if (!cartUser) return { user, items: [] };

    // Gabungkan info produk
    const detailedItems = cartUser.items.map(i => {
      const p = products.find(prod => prod.id === i.productId);
      return {
        productId: i.productId,
        productName: p?.productName,
        price: p?.price,
        qty: i.qty
      };
    });

    return { user, items: detailedItems };
  }
}

module.exports = CartService;
