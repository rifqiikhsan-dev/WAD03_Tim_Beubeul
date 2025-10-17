const ProductService = require("../Services/productService");

class ProductController {
  // --- CREATE ---
  static async createProduct(req, res) {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // --- READ ALL ---
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // --- READ BY ID ---
  static async getProductById(req, res) {
    try {
      const product = await ProductService.getProductById(
        parseInt(req.params.id)
      );
      res.json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // --- UPDATE ---
  static async updateProduct(req, res) {
    try {
      const updated = await ProductService.updateProduct(
        parseInt(req.params.id),
        req.body
      );
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // --- DELETE ---
  static async deleteProduct(req, res) {
    try {
      const deleted = await ProductService.deleteProduct(
        parseInt(req.params.id),
        req.body.owner
      );
      res.json({ message: "Produk berhasil dihapus", deleted });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = ProductController;
