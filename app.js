// =========================
// APP BOOTSTRAP (MAIN CONTROLLER)
// =========================

// NOTE:
// semua fungsi lain sudah ada di:
// config.js, ui.js, auth.js, timer.js

// =========================
// INIT APP
// =========================
function initApp() {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const session = localStorage.getItem("sessionType");
  const savedLoginTime = Number(localStorage.getItem("loginTime"));

  // =========================
  // INIT UI FIRST
  // =========================
  if (window.initUI) {
    window.initUI();
  }

  // default page
  if (window.showPage) {
    window.showPage("dashboard");
  }

  // =========================
  // IF NOT LOGGED IN
  // =========================
  if (!role || !username) {
    return;
  }

  // =========================
  // CHECK SESSION EXPIRED (LIMITED USER)
  // =========================
  if (session === "limited" && savedLoginTime) {
    const elapsed = Date.now() - savedLoginTime;

    // 6 menit expired
    if (elapsed > 6 * 60 * 1000) {
      if (window.logout) {
        window.logout();
      }
      return;
    }
  }

  // =========================
  // RESTORE UI USER INFO
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
// RUN ON LOAD
// =========================
window.addEventListener("DOMContentLoaded", initApp);

import { initMQTT } from "./mqtt.js";

// start system
initMQTT();
