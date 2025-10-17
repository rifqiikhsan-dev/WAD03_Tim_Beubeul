const { DataTypes } = require("sequelize");
const sequelize = require("../Config/database");
const UserModel = require("./userModel");

const ProductModel = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: UserModel, // relasi ke tabel users
        key: "username"
      },
      onDelete: "CASCADE", // jika user dihapus, produk juga ikut terhapus
      onUpdate: "CASCADE"
    }
  },
  {
    tableName: "products",
    timestamps: false
  }
);

// Relasi antar model
UserModel.hasMany(ProductModel, {
  foreignKey: "owner",
  sourceKey: "username",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

ProductModel.belongsTo(UserModel, {
  foreignKey: "owner",
  targetKey: "username",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

module.exports = ProductModel;
