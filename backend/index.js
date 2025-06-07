const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./src/routers/auth.routes.js");
const todoRoutes = require("./src/routers/todo.routes.js");

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
