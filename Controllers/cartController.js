const CartService = require('../Services/cartService');

exports.addToCart = (req, res) => {
  try {
    const username = req.params.username;
    const { productId, qty } = req.body;
    const cart = CartService.addToCart(username, productId, qty);
    res.json({ message: 'Produk ditambahkan', cart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeFromCart = (req, res) => {
  try {
    const username = req.params.username;
    const { productId } = req.body;
    const cart = CartService.removeFromCart(username, productId);
    res.json({ message: 'Produk dihapus', cart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCart = (req, res) => {
  try {
    const username = req.params.username;
    const cart = CartService.getCart(username);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
