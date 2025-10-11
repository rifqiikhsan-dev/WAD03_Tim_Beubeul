const path = require("path");
const products = require(path.join(__dirname, "../Data/product.json"));

class ProductRepository {
  static getAll() {
    return products;
  }

  static getById(id) {
    return products.find((p) => p.id === id);
  }

  static create(product) {
    products.push(product);
    return product;
  }

  static update(id, updatedData) {
    const product = this.getById(id);
    if (!product) return null;

    Object.assign(product, updatedData);
    return product;
  }

  static delete(id) {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const deleted = products.splice(index, 1);
    return deleted[0];
  }
}

module.exports = ProductRepository;
