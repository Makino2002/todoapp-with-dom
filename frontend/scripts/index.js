const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-completed");
const filterSelect = document.getElementById("filter-select");
import { loadTodos, addTodo } from "./todos.js";
import { toggleComplete, deleteTodo } from "./status.js";

let todos = [];
let currentFilter = "all";

function validate(text) {
  if (!text) {
    alert("Không được để trống công việc.");
    return false;
  }
  if (todos.find((todo) => todo.text.toLowerCase() === text.toLowerCase())) {
    alert("Không được trùng công việc.");
    input.value = "";
    return false;
  }
  return true;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (validate(text)) {
    await addTodo(text);
    input.value = "";
    await renderTodos();
  }
});

async function renderTodos() {
  todos = await loadTodos();
  list.innerHTML = "";

  todos.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed - b.completed;
    }
    return a.text.localeCompare(b.text, "vi", { sensitivity: "base" });
  });

  todos.forEach((todo) => {
    if (currentFilter === "completed" && !todo.completed) return;
    if (currentFilter === "active" && todo.completed) return;

    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = async () => {
      await toggleComplete(todo.id, checkbox.checked);
      await renderTodos();
    };

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = "text";
    span.ondblclick = () => {
      if (todo.completed) return;
      const inputEdit = document.createElement("input");
      inputEdit.type = "text";
      inputEdit.value = todo.text;
      inputEdit.addEventListener("keydown", (e) => {
        if (e.key === "Enter") inputEdit.blur();
      });
      inputEdit.onblur = async () => {
        const newValue = inputEdit.value.trim();
        if (validate(newValue)) {
          await toggleComplete(todo.id, false); // hack: trigger update
          await toggleComplete(todo.id, todo.completed); // restore status
          todo.text = newValue;
          await renderTodos();
        }
      };

      li.replaceChild(inputEdit, span);
      inputEdit.focus();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.onclick = async () => {
      li.classList.add("fade-out");
      setTimeout(async () => {
        await deleteTodo(todo.id);
        await renderTodos();
      }, 200);
    };

    const actions = document.createElement("div");
    actions.className = "todo-actions";
    actions.append(checkbox, delBtn);

    li.append(span, actions);
    list.appendChild(li);
  });
}

clearBtn.addEventListener("click", async () => {
  const completedTodos = todos.filter((todo) => todo.completed);
  for (const todo of completedTodos) {
    await deleteTodo(todo.id);
  }
  await renderTodos();
});

filterSelect.addEventListener("change", () => {
  currentFilter = filterSelect.value;
  renderTodos();
});

renderTodos();
