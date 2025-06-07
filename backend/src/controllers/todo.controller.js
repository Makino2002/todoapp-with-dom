const service = require("../services/todo.service.js");
let getTodos = (req, res) => {
  res.json(service.getAllTodos());
};

let createTodo = (req, res) => {
  const { text } = req.body;
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const todo = service.createTodo(userId, text);
  res.status(201).json(todo);
};

let updateTodo = (req, res) => {
  const { id } = req.params;
  const todo = service.updateTodo(Number(id), req.body);
  res.json(todo);
};

let deleteTodo = (req, res) => {
  service.deleteTodo(Number(req.params.id));
  res.status(204).end();
};
module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
