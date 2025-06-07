const service = require("../services/todo.service.js");
let getTodos = (req, res) => {
  res.json(service.getAllTodos(req.user.userId));
};

let createTodo = (req, res) => {
  const { text } = req.body;
  const todo = service.createTodo(req.user.userId, text);
  res.status(201).json(todo);
};

let updateTodo = (req, res) => {
  const { id } = req.params;
  const todo = service.updateTodo(req.user.userId, Number(id), req.body);
  res.json(todo);
};

let deleteTodo = (req, res) => {
  service.deleteTodo(req.user.userId, Number(req.params.id));
  res.status(204).end();
};
module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
