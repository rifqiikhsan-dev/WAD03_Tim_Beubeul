const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

// Endpoint
router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:username", userController.getUserByUsername);

module.exports = router;
