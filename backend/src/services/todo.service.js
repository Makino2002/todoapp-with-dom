const repo = require("../repositories/todo.repository.js");

function getAllTodos() {
  return repo.getAll();
}

function createTodo(userId, text) {
  return repo.create(userId, text);
}

function updateTodo(id, data) {
  return repo.update(id, data);
}

function deleteTodo(id) {
  return repo.remove(id);
}
module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
