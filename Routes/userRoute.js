const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

// Endpoint
router.get("/", userController.getUsers);
router.get("/:username", userController.getUserByUsername);
router.post("/", userController.createUser);

module.exports = router;
