const CartModel = require("../Models/cartModel");

class CartRepository {
  static async getByUsername(username) {
    return await CartModel.findAll({ where: { username } });
  }

  static async addItem(username, productId, qty) {
    return await CartModel.create({ username, productId, qty });
  }

  static async removeItem(username, productId) {
    return await CartModel.destroy({ where: { username, productId } });
  }
}

module.exports = CartRepository;
