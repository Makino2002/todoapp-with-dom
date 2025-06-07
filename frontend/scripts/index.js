const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-completed");
const filterSelect = document.getElementById("filter-select");
import { baseURL } from "./config.js";

let todos = JSON.parse(localStorage.getItem("todos")) || [];
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
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (validate(text)) {
    todos.push({ text, completed: false });
    input.value = "";
    saveAndRender();
  }
});

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function renderTodos() {
  list.innerHTML = "";
  todos.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed - b.completed;
    }
    return a.text.localeCompare(b.text, "vi", { sensitivity: "base" });
  });
  todos.forEach((todo, index) => {
    if (currentFilter === "completed" && !todo.completed) return;
    if (currentFilter === "active" && todo.completed) return;

    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = () => {
      todos[index].completed = checkbox.checked;
      saveAndRender();
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
      inputEdit.onblur = () => {
        const newValue = inputEdit.value.trim();
        if (validate(newValue)) {
          todo.text = newValue;
          saveAndRender();
        }
      };

      li.replaceChild(inputEdit, span);
      inputEdit.focus();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.onclick = () => {
      li.classList.add("fade-out");
      setTimeout(() => {
        todos.splice(index, 1);
        saveAndRender();
      }, 200);
    };
    const actions = document.createElement("div");
    actions.className = "todo-actions";
    actions.append(checkbox, delBtn);

    li.append(span, actions);
    list.appendChild(li);
  });
}

clearBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  saveAndRender();
});

filterSelect.addEventListener("change", () => {
  currentFilter = filterSelect.value;
  renderTodos();
});

renderTodos();
