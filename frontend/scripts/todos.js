import { baseURL } from "./config.js";

export async function loadTodos() {
  const res = await fetch(`${baseURL}/api/todos`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (!res.ok) throw new Error("Lỗi khi tải công việc");
  return await res.json();
}

export async function addTodo(text) {
  const res = await fetch(`${baseURL}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Lỗi khi thêm công việc");
}

// 📁 frontend/scripts/status.js
export async function toggleComplete(id, completed) {
  const res = await fetch(`${baseURL}/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error("Lỗi khi cập nhật trạng thái");
}

export async function deleteTodo(id) {
  const res = await fetch(`${baseURL}/api/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Lỗi khi xoá công việc");
}
