const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller.js");
router.post("/login", controller.handleLogin);
router.post("/users", controller.handleRegister);
router.post("/reset-password", controller.handleResetPassword);
module.exports = router;
