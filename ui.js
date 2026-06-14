export function showPage(page) {

  document.querySelectorAll(".page").forEach((el) => {
    el.style.display = "none";
  });

  const target = document.getElementById(page);
  if (target) target.style.display = "block";
}

window.showPage = showPage;

// THEME
export function toggleTheme() {
  const btn = document.getElementById("themeBtn");

  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    btn.innerText = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    btn.innerText = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

window.toggleTheme = toggleTheme;

// LOGOUT POPUP
export function showLogoutPopup() {
  const popup = document.getElementById("logoutPopup");
  if (popup) popup.style.display = "block";
}

export function closePopup() {
  const popup = document.getElementById("logoutPopup");
  if (popup) popup.style.display = "none";
}

window.showLogoutPopup = showLogoutPopup;
window.closePopup = closePopup;

// LOGOUT
export function logout() {
  alert("Logout berhasil");

  localStorage.clear();

  document.getElementById("username").innerText = "Guest";
  document.getElementById("role").innerText = "Belum Login";

  document.getElementById("loginBtn").style.display = "block";
  document.getElementById("logoutBtn").style.display = "none";

  if (window.stopTimer) window.stopTimer();

  closePopup();
}

window.logout = logout;

// PASSWORD
export function togglePassword() {
  const pw = document.getElementById("loginPassword");
  if (!pw) return;

  pw.type = pw.type === "password" ? "text" : "password";
}

window.togglePassword = togglePassword;

// UI INIT
export function initUI() {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark");

    const btn = document.getElementById("themeBtn");
    if (btn) btn.innerText = "☀️ Light Mode";
  }
}

window.initUI = initUI;

// MQTT UI SAFE
export function setMQTTStatus(state) {
  const el = document.getElementById("mqttStatus");
  if (!el) return;

  el.innerText =
    state === "connected"
      ? "🟢 MQTT Connected"
      : "🔴 Disconnected";
}

// LOG SAFE
export function addLog(msg) {
  const box = document.getElementById("logBox");
  if (!box) return;

  const div = document.createElement("div");
  div.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;

  box.prepend(div);
}
