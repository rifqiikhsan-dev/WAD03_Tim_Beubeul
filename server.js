const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// import routes
const aboutUsRoute = require("./Routes/aboutUsRoute");
const greetingRoute = require("./Routes/greetingRoute");
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const cartRoute = require("./Routes/cartRoute");

// use routes
app.use("/aboutus", aboutUsRoute);
app.use("/greeting", greetingRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);

app.get("/", (req, res) => {
  res.send("Hello World from Express.js!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
