const sequelize = require("./Config/database");
const User = require("./Models/UserModel");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");

    await sequelize.sync({ alter: true }); 
    console.log("Models synchronized...");

    process.exit();
  } catch (err) {
    console.error("Unable to connect:", err);
    process.exit(1);
  }
})();
