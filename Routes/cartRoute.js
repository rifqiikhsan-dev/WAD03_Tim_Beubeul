const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");

// Endpoint Add
router.post('/:username/add', cartController.addToCart);

// Endpoint Delete
router.delete('/:username/remove', cartController.removeFromCart);

// Endpoint Get
router.get('/:username', cartController.getCart);

module.exports = router;