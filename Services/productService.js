const ProductRepository = require("../Repositories/productRepository");
const UserRepository = require("../Repositories/userRepository");

class ProductService {
  // --- Buat produk baru
  static async createProduct({ productName, productCategory, price, owner }) {
    const user = await UserRepository.getUserByUsername(owner);
    if (!user) throw new Error("Owner tidak ditemukan");
    if (user.role !== "seller")
      throw new Error("Hanya seller bisa tambah produk");

    const newProduct = {
      productName,
      productCategory,
      price,
      owner: user.username
    };

    return await ProductRepository.create(newProduct);
  }

  // --- Ambil semua produk
  static async getAllProducts() {
    return await ProductRepository.getAll();
  }

  // --- Ambil produk berdasarkan ID
  static async getProductById(id) {
    const product = await ProductRepository.getById(id);
    if (!product) throw new Error("Produk tidak ditemukan");
    return product;
  }

  // --- Update produk
  static async updateProduct(
    id,
    { productName, productCategory, price, owner }
  ) {
    const user = await UserRepository.getUserByUsername(owner);
    if (!user || user.role !== "seller")
      throw new Error("Hanya seller bisa update produk");

    const product = await ProductRepository.getById(id);
    if (!product) throw new Error("Produk tidak ditemukan");
    if (product.owner !== user.username)
      throw new Error("Tidak bisa update produk milik orang lain");

    const updatedData = {
      productName: productName ?? product.productName,
      productCategory: productCategory ?? product.productCategory,
      price: price ?? product.price
    };

    return await ProductRepository.update(id, updatedData);
  }

  // --- Hapus produk
  static async deleteProduct(id, owner) {
    const user = await UserRepository.getUserByUsername(owner);
    if (!user || user.role !== "seller")
      throw new Error("Hanya seller bisa hapus produk");

    const product = await ProductRepository.getById(id);
    if (!product) throw new Error("Produk tidak ditemukan");
    if (product.owner !== user.username)
      throw new Error("Tidak bisa hapus produk milik orang lain");

    return await ProductRepository.delete(id);
  }
}

module.exports = ProductService;
