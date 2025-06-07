const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authentication.js");
const controller = require("../controllers/todo.controller.js");

router.use(authenticate);
router.get("/", controller.getTodos);
router.post("/", controller.createTodo);
router.put("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

module.exports = router;
