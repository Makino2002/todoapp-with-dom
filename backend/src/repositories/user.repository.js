//gọi API đọc và viết data ra
const { readData, writeData } = require("../datasources/file.datasource.js");

function findByEmail(email) {
  const data = readData();

  return data.users.find((user) => user.email === email);
}

function findByEmailAndPassword(email, password) {
  const data = readData();

  return data.users.find(
    (user) => user.email === email && user.password === password
  );
}

function createUser(email, password) {
  const data = readData();

  const newUser = { id: Date.now(), email, password };
  data.users.push(newUser);
  writeData(data);
  return newUser;
}

function resetPassword(email, newPassword) {
  const data = readData();

  const user = data.users.find((user) => user.email === email);
  if (user) {
    user.password = newPassword;
    writeData(data);
  }
  return user;
}
module.exports = {
  findByEmail,
  findByEmailAndPassword,
  createUser,
  resetPassword,
};
