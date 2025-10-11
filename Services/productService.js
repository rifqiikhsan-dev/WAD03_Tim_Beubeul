const ProductRepository = require("../Repositories/productRepository");
const UserRepository = require("../Repositories/userRepository");

class ProductService {
  static createProduct({ productName, productCategory, price, owner }) {
    const user = UserRepository.getUserByUsername(owner);
    if (!user) throw new Error("Owner tidak ditemukan");
    if (user.role !== "seller")
      throw new Error("Hanya seller bisa tambah produk");

    const products = ProductRepository.getAll();
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      productName,
      productCategory,
      price,
      owner: user.username
    };

    return ProductRepository.create(newProduct);
  }

  static getAllProducts() {
    return ProductRepository.getAll();
  }

  static getProductById(id) {
    const product = ProductRepository.getById(id);
    if (!product) throw new Error("Produk tidak ditemukan");
    return product;
  }

  static updateProduct(id, { productName, productCategory, price, owner }) {
    const user = UserRepository.getUserByUsername(owner);
    if (!user || user.role !== "seller")
      throw new Error("Hanya seller bisa update produk");

    const product = ProductRepository.getById(id);
    if (!product) throw new Error("Produk tidak ditemukan");
    if (product.owner !== user.username)
      throw new Error("Tidak bisa update produk milik orang lain");

    return ProductRepository.update(id, {
      productName: productName ?? product.productName,
      productCategory: productCategory ?? product.productCategory,
      price: price ?? product.price
    });
  }

  static deleteProduct(id, owner) {
    const user = UserRepository.getUserByUsername(owner);
    if (!user || user.role !== "seller")
      throw new Error("Hanya seller bisa hapus produk");

    const product = ProductRepository.getById(id);
    if (!product) throw new Error("Produk tidak ditemukan");
    if (product.owner !== user.username)
      throw new Error("Tidak bisa hapus produk milik orang lain");

    return ProductRepository.delete(id);
  }
}

module.exports = ProductService;
