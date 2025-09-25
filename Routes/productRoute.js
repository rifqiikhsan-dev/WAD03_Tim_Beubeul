const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");

// Endpoint Create
router.post("/", productController.createProduct);

// Endpoint Read All
router.get("/", productController.getAllProducts);

// Endpoint Read By Id
router.get("/:id", productController.getProductById);

// Endpoint Update
router.put("/:id", productController.updateProduct);

// Endpoint Delete
router.delete("/:id", productController.deleteProduct);

module.exports = router;
