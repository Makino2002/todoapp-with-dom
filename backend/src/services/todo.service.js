const repo = require("../repositories/todo.repository.js");

function getAllTodos(userId) {
  return repo.getAll(userId);
}

function createTodo(userId, text) {
  return repo.create(userId, text);
}

function updateTodo(userId, todoId, data) {
  return repo.update(userId, todoId, data);
}

function deleteTodo(userId, todoId) {
  return repo.remove(userId, todoId);
}
module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
