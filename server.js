const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// import routes
const aboutUsRoute = require("./Routes/aboutUsRoute");
const greetingRoute = require("./Routes/greetingRoute");
const userRoute = require("./Routes/userRoute");

// use routes
app.use("/aboutus", aboutUsRoute);
app.use("/greeting", greetingRoute);
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World from Express.js!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
