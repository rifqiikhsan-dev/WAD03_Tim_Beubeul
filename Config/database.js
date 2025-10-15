const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_simple_ecommerce", "postgres", "", { // Sesuaikan dengan config db masing-masing
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
