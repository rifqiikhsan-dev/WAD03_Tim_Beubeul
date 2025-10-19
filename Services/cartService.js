const CartRepository = require("../Repositories/cartRepository");
const ProductRepository = require("../Repositories/productRepository");
const UserRepository = require("../Repositories/userRepository");

class CartService {
  static async addToCart({ username, productId, qty }) {
    const user = await UserRepository.getUserByUsername(username);
    if (!user) throw new Error("User tidak ditemukan");

    const product = await ProductRepository.getById(productId);
    if (!product) throw new Error("Produk tidak ditemukan");

    return await CartRepository.addToCart(username, productId, qty);
  }

  static async getCart(username) {
    const user = await UserRepository.getUserByUsername(username);
    if (!user) throw new Error("User tidak ditemukan");

    return await CartRepository.getCartByUsername(username);
  }

  static async removeFromCart(username, productId) {
    const user = await UserRepository.getUserByUsername(username);
    if (!user) throw new Error("User tidak ditemukan");

    const deleted = await CartRepository.removeFromCart(username, productId);
    if (!deleted) throw new Error("Item tidak ditemukan di cart");

    return deleted;
  }
}

module.exports = CartService;
