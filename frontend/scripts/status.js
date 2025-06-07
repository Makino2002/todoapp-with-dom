const host = window.location.hostname;
const isLocalhost =
  host === "localhost" || host === "127.0.0.1" || host === "::1";

const baseURL = isLocalhost
  ? "http://localhost:3000"
  : "https://todoapp-with-dom.onrender.com";

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
