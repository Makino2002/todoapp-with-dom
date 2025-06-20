const host = window.location.hostname;
const isLocalhost =
  host === "localhost" || host === "127.0.0.1" || host === "::1";

import { baseURL } from "../config.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch(`${baseURL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "/";
    console.log(window.location.href);
  } else {
    alert(data.error);
  }
});
