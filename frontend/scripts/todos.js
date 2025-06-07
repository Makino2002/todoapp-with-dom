const host = window.location.hostname;
const isLocalhost =
  host === "localhost" || host === "127.0.0.1" || host === "::1";

const baseURL = isLocalhost
  ? "http://localhost:3000"
  : "https://todoapp-with-dom.onrender.com";

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
