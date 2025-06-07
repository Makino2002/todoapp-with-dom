const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repository.js");
const SECRET = "todo-secret";
function login(email, password) {
  const user = userRepo.findByEmailAndPassword(email, password);
  if (!user) {
    throw new Error("Sai thông tin đăng nhập");
  }
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    SECRET,
    {
      expiresIn: "1h",
    }
  );
  return { token, user };
}
function register(email, password) {
  const existing = userRepo.findByEmail(email);
  if (existing) {
    throw new Error("Email đã tồn tại");
  }
  const newUser = userRepo.createUser(email, password);
  return { message: "tạo tk thành công", user: newUser };
}
function resetPassword(email, password) {
  const user = userRepo.resetPassword(email, password);
  if (!user) throw new Error("Email không tồn tại");
  return { message: "cập nhật mk thành công" };
}
module.exports = {
  login,
  register,
  resetPassword,
};
