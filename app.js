// =========================
// APP CONTROLLER (MAIN BOOT)
// =========================

import { initMQTT } from "./mqtt.js";

// =========================
// INIT APP
// =========================
function initApp() {

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const session = localStorage.getItem("sessionType");
  const savedLoginTime = Number(localStorage.getItem("loginTime"));

  // =========================
  // INIT UI SAFE
  // =========================
  if (window.initUI) {
    window.initUI();
  }

  // default page
  if (window.showPage) {
    window.showPage("dashboard");
  }

  // =========================
  // IF NOT LOGIN
  // =========================
  if (!role || !username) {
    return;
  }

  // =========================
  // SESSION CHECK (LIMITED USER)
  // =========================
  if (session === "limited" && savedLoginTime) {

    const elapsed = Date.now() - savedLoginTime;

    if (elapsed > 6 * 60 * 1000) {
      if (window.logout) {
        window.logout();
      }
      return;
    }
  }

  // =========================
  // RESTORE UI USER
  // =========================
  const usernameEl = document.getElementById("username");
  const roleEl = document.getElementById("role");

  if (usernameEl) usernameEl.innerText = username;
  if (roleEl) roleEl.innerText = role;

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginBtn) loginBtn.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "block";

  // =========================
  // START TIMER
  // =========================
  if (window.startTimer) {
    window.startTimer();
  }
}

// =========================
// DOM READY
// =========================
window.addEventListener("DOMContentLoaded", () => {
  initApp();
  initMQTT(); // MQTT hanya start setelah DOM siap
});
