const ProductService = require("../Services/productService");

class ProductController {
  static createProduct(req, res) {
    try {
      const newProduct = ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static getAllProducts(req, res) {
    const products = ProductService.getAllProducts();
    res.json(products);
  }

  static getProductById(req, res) {
    try {
      const product = ProductService.getProductById(parseInt(req.params.id));
      res.json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static updateProduct(req, res) {
    try {
      const updated = ProductService.updateProduct(
        parseInt(req.params.id),
        req.body
      );
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static deleteProduct(req, res) {
    try {
      const deleted = ProductService.deleteProduct(
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
