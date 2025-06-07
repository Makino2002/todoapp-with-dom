const { readData, writeData } = require("../datasources/file.datasource.js");

function getAll() {
  return readData().todos;
}
function create(userId, text) {
  const data = readData();
  const newTodo = { id: Date.now(), userId, text, completed: false };
  data.todos.push(newTodo);
  writeData(data);
  return newTodo;
}
function update(id, updates) {
  const data = readData();
  const todo = data.todos.find((todo) => todo.id === id);
  if (!todo) throw new Error("Todo không tồn tại");
  Object.assign(todo, updates);
  writeData(data);
  return todo;
}

function remove(id) {
  const data = readData();
  data.todos = data.todos.filter((t) => t.id !== id);
  writeData(data);
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
