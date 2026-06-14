import { initMQTT } from "./mqtt.js";

function initApp() {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const session = localStorage.getItem("sessionType");
  const savedLoginTime = Number(localStorage.getItem("loginTime"));

  if (window.initUI) window.initUI();
  if (window.showPage) window.showPage("dashboard");

  if (!role || !username) return;

  if (session === "limited" && savedLoginTime) {
    const elapsed = Date.now() - savedLoginTime;

    if (elapsed > 6 * 60 * 1000) {
      if (window.logout) window.logout();
      return;
    }
  }

  const usernameEl = document.getElementById("username");
  const roleEl = document.getElementById("role");

  if (usernameEl) usernameEl.innerText = username;
  if (roleEl) roleEl.innerText = role;

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginBtn) loginBtn.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "block";

  if (window.startTimer) window.startTimer();
}

window.addEventListener("DOMContentLoaded", initApp);

// start MQTT
initMQTT();
