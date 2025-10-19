const CartModel = require("../Models/cartModel");

class CartRepository {
  static async addToCart(username, productId, qty = 1) {
    try {
      const [item, created] = await CartModel.findOrCreate({
        where: { username, productId },
        defaults: { qty },
      });

      if (!created) {
        item.qty += qty;
        await item.save();
      }

      return item;
    } catch (error) {
      console.error("Error saat menambahkan ke cart:", error);
      throw error;
    }
  }

  static async getCartByUsername(username) {
    try {
      return await CartModel.findAll({ where: { username } });
    } catch (error) {
      console.error("Error saat mengambil cart:", error);
      throw error;
    }
  }

  static async removeFromCart(username, productId) {
    try {
      return await CartModel.destroy({
        where: { username, productId },
      });
    } catch (error) {
      console.error("Error saat menghapus dari cart:", error);
      throw error;
    }
  }

  
}

module.exports = CartRepository;
