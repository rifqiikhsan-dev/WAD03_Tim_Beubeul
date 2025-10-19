const { DataTypes } = require("sequelize");
const sequelize = require("../Config/database"); 

const CartModel = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
},{
  tableName: "carts",
  timestamps: false
});

module.exports = CartModel;
