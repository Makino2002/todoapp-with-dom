const { readData, writeData } = require("../datasources/file.datasource.js");

function getAll(userId) {
  {
    const data = readData();
    const user = data.users.find((u) => u.id === userId);
    return user?.todos || [];
  }
}
function create(userId, text) {
  const data = readData();
  const user = data.users.find((u) => u.id === userId);
  if (!user) throw new Error("User not found");
  const newTodo = { id: Date.now(), text, completed: false };
  user.todos.push(newTodo);

  writeData(data);
  return newTodo;
}
function update(userId, todoId, updates) {
  const data = readData();
  const user = data.users.find((u) => u.id === userId);
  const todo = user.todos.find((t) => t.id === todoId);
  Object.assign(todo, updates);
  writeData(data);
  return todo;
}

function remove(userId, todoId) {
  const data = readData();
  const user = data.users.find((u) => u.id === userId);
  user.todos = user.todos.filter((t) => t.id !== todoId);
  writeData(data);
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
