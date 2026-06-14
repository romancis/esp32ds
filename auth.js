// =========================
// AUTH SYSTEM (FIREBASE LOGIN)
// =========================

import { db } from "./config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// =========================
// LOGIN FUNCTION
// =========================
export async function loginFirebase() {

  const loginBtn = document.getElementById("loginBtnAction");
  const loginText = document.getElementById("loginText");
  const loginLoading = document.getElementById("loginLoading");

  const usernameEl = document.getElementById("loginUsername");
  const passwordEl = document.getElementById("loginPassword");
  const infoEl = document.getElementById("loginInfo");

  if (!loginBtn || !usernameEl || !passwordEl) return;

  // =========================
  // LOADING STATE
  // =========================
  loginBtn.classList.add("loading");
  if (loginText) loginText.style.display = "none";
  if (loginLoading) loginLoading.style.display = "inline";

  const username = usernameEl.value.trim();
  const password = passwordEl.value;

  // =========================
  // VALIDATION
  // =========================
  if (!username || !password) {
    if (infoEl) infoEl.innerText = "Username / Password kosong";
    resetLoginBtn();
    return;
  }

  try {

    const akunRef = doc(db, "accounts", username);
    const akunSnap = await getDoc(akunRef);

    // =========================
    // USER NOT FOUND
    // =========================
    if (!akunSnap.exists()) {
      if (infoEl) infoEl.innerText = "Username tidak ditemukan";
      resetLoginBtn();
      return;
    }

    const data = akunSnap.data();

    // =========================
    // WRONG PASSWORD
    // =========================
    if (data.password !== password) {
      if (infoEl) infoEl.innerText = "Password salah";
      resetLoginBtn();
      return;
    }

    // =========================
    // SUCCESS LOGIN
    // =========================
    const role = (data.role || "").toLowerCase();

    localStorage.setItem("username", username);
    localStorage.setItem("role", data.role);

    if (role === "admin") {
      localStorage.setItem("sessionType", "admin");
      localStorage.removeItem("loginTime");
    } else {
      localStorage.setItem("sessionType", "limited");
      localStorage.setItem("loginTime", Date.now());
    }

    // =========================
    // UPDATE MAIN UI (SAFE)
    // =========================
    const mainUser = document.getElementById("username");
    const mainRole = document.getElementById("role");

    if (mainUser) mainUser.innerText = username;
    if (mainRole) mainRole.innerText = data.role;

    const loginBtnMain = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (loginBtnMain) loginBtnMain.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block";

    if (infoEl) infoEl.innerText = "Login berhasil";

    // =========================
    // RESET INPUT
    // =========================
    usernameEl.value = "";
    passwordEl.value = "";

    // =========================
    // SWITCH PAGE
    // =========================
    setTimeout(() => {
      if (window.showPage) {
        window.showPage("dashboard");
      }
    }, 300);

    // =========================
    // START TIMER
    // =========================
    if (window.startTimer) {
      window.startTimer();
    }

  } catch (err) {
    console.error("Login error:", err);
    if (infoEl) infoEl.innerText = "Error koneksi Firebase";
  }

  resetLoginBtn();
}

// =========================
// RESET LOGIN BUTTON
// =========================
function resetLoginBtn() {

  const loginBtn = document.getElementById("loginBtnAction");
  const loginText = document.getElementById("loginText");
  const loginLoading = document.getElementById("loginLoading");

  if (!loginBtn) return;

  loginBtn.classList.remove("loading");

  if (loginText) loginText.style.display = "inline";
  if (loginLoading) loginLoading.style.display = "none";
}

// =========================
// PASSWORD TOGGLE
// =========================
export function togglePassword() {
  const pw = document.getElementById("loginPassword");
  if (!pw) return;

  pw.type = pw.type === "password" ? "text" : "password";
}

// =========================
// GLOBAL EXPORT (HTML ACCESS)
// =========================
window.loginFirebase = loginFirebase;
window.resetLoginBtn = resetLoginBtn;
window.togglePassword = togglePassword;
