const host = window.location.hostname;
const isLocalhost =
  host === "localhost" || host === "127.0.0.1" || host === "::1";

const baseURL = isLocalhost
  ? "http://localhost:3000"
  : "https://todoapp-with-dom.onrender.com";

document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    console.log(baseURL);
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Đăng ký thành công! Đang chuyển hướng...");
      window.location.href = "login.html";
    } else {
      alert("Lỗi: " + data.error);
    }
  });
