const { DataTypes } = require("sequelize");
const sequelize = require("../Config/database");
const UserModel = require("./userModel");
const ProductModel = require("./productModel");

const CartModel = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: UserModel, // relasi ke tabel users
        key: "username",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductModel, // relasi ke tabel products
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "carts",
    timestamps: false,
  }
);

// Relasi antar model
UserModel.hasMany(CartModel, {
  foreignKey: "username",
  sourceKey: "username",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

CartModel.belongsTo(UserModel, {
  foreignKey: "username",
  targetKey: "username",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ProductModel.hasMany(CartModel, {
  foreignKey: "productId",
  sourceKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

CartModel.belongsTo(ProductModel, {
  foreignKey: "productId",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = CartModel;
