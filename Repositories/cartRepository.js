const fs = require("fs");
const path = require("path");
const carts = require(path.join(__dirname, "../Data/carts.json"));

function readJSON() {
  return JSON.parse(fs.readFileSync(cartsPath));
}

function writeJSON(data) {
  fs.writeFileSync(cartsPath, JSON.stringify(data, null, 2));
}

class CartRepository {
  static getAll() {
    return readJSON();
  }

  static getByUsername(username) {
    const carts = readJSON();
    return carts.find(c => c.username === username);
  }

  static save(cartUser) {
    let carts = readJSON();
    const index = carts.findIndex(c => c.username === cartUser.username);

    if (index !== -1) {
      carts[index] = cartUser;
    } else {
      carts.push(cartUser);
    }

    writeJSON(carts);
    return cartUser;
  }

  static deleteByUsername(username, productId) {
    let carts = readJSON();
    const cartUser = carts.find(c => c.username === username);
    if (!cartUser) return null;

    cartUser.items = cartUser.items.filter(i => i.productId !== productId);
    writeJSON(carts);
    return cartUser;
  }
}

module.exports = CartRepository;