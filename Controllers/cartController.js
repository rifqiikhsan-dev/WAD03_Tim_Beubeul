const CartService = require("../Services/cartService");

class CartController {
  static async addToCart(req, res) {
    try {
      const { username, productId, qty } = req.body;
      const result = await CartService.addToCart({ username, productId, qty });
      res.status(201).json({
        message: "Produk berhasil ditambahkan ke cart",
        data: result,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getCart(req, res) {
    try {
      const { username } = req.params;
      const cart = await CartService.getCart(username);
      res.status(200).json(cart);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async removeFromCart(req, res) {
    try {
      const { username, productId } = req.body;
      await CartService.removeFromCart(username, productId);
      res.status(200).json({ message: "Produk dihapus dari cart" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  
}

module.exports = CartController;
