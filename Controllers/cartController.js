const CartService = require("../Services/cartService");

exports.getCart = async (req, res) => {
  try {
    const username = req.params.username;
    const cart = await CartService.getCartByUsername(username);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error getting cart", error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const username = req.params.username;
    const { productId, qty } = req.body;
    const newItem = await CartService.addToCart(username, productId, qty);
    res.json({ message: "Product added to cart", data: newItem });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const username = req.params.username;
    const { productId } = req.body;
    await CartService.removeFromCart(username, productId);
    res.json({ message: "Product removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Error removing from cart", error: err.message });
  }
};
