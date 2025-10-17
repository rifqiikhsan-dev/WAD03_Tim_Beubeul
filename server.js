const express = require("express");
const sequelize = require("./Config/database");

// Import model
require("./Models/userModel");
require("./Models/productModel");

// Import routes
const aboutUsRoute = require("./Routes/aboutUsRoute");
const greetingRoute = require("./Routes/greetingRoute");
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const cartRoute = require("./Routes/cartRoute");

const app = express();
const PORT = 3000;

app.use(express.json());

// Gunakan routes
app.use("/aboutus", aboutUsRoute);
app.use("/greeting", greetingRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);

app.get("/", (req, res) => {
  res.send("Hello World from Express.js + Sequelize!");
});

// ====== CONNECT & SYNC DATABASE, THEN START SERVER ======
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    await sequelize.sync({ alter: true });
    console.log("✅ Models synchronized...");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
  }
})();
