const ProductModel = require("../Models/productModel");

class ProductRepository {
  // Ambil semua produk
  static async getAll() {
    try {
      const products = await ProductModel.findAll();
      return products;
    } catch (error) {
      console.error("❌ Error saat mengambil semua produk:", error);
      throw error;
    }
  }

  // Ambil produk berdasarkan ID
  static async getById(id) {
    try {
      const product = await ProductModel.findByPk(id);
      return product;
    } catch (error) {
      console.error("❌ Error saat mengambil produk berdasarkan ID:", error);
      throw error;
    }
  }

  // Buat produk baru
  static async create(productData) {
    try {
      const product = await ProductModel.create(productData);
      return product;
    } catch (error) {
      console.error("❌ Error saat membuat produk:", error);
      throw error;
    }
  }

  // Update produk
  static async update(id, updatedData) {
    try {
      const product = await ProductModel.findByPk(id);
      if (!product) return null;

      await product.update(updatedData);
      return product;
    } catch (error) {
      console.error("❌ Error saat update produk:", error);
      throw error;
    }
  }

  // Hapus produk
  static async delete(id) {
    try {
      const product = await ProductModel.findByPk(id);
      if (!product) return null;

      await product.destroy();
      return product;
    } catch (error) {
      console.error("❌ Error saat menghapus produk:", error);
      throw error;
    }
  }
}

module.exports = ProductRepository;
