const service = require("../services/auth.service.js");
function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const result = service.login(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}
function handleRegister(req, res) {
  try {
    const { email, password } = req.body;
    const result = service.register(email, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function handleResetPassword(req, res) {
  try {
    const { email, password } = req.body;
    const result = service.resetPassword(email, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
module.exports = {
  handleLogin,
  handleRegister,
  handleResetPassword,
};
