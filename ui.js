// =========================
// UI CONTROLLER
// =========================

// =========================
// PAGE NAVIGATION
// =========================
export function showPage(page) {
  const pages = document.querySelectorAll(".page");

  pages.forEach((el) => {
    el.style.display = "none";
  });

  const target = document.getElementById(page);
  if (target) {
    target.style.display = "block";
  }
}

// expose global (dipakai dari HTML onclick)
window.showPage = showPage;

// =========================
// THEME TOGGLE
// =========================
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

// =========================
// POPUP LOGOUT
// =========================
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

// =========================
// LOGOUT SYSTEM
// =========================
export function logout() {
  alert("Logout berhasil");

  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("loginTime");
  localStorage.removeItem("sessionType");

  // reset UI
  document.getElementById("username").innerText = "Guest";
  document.getElementById("role").innerText = "Belum Login";

  document.getElementById("loginBtn").style.display = "block";
  document.getElementById("logoutBtn").style.display = "none";

  const timerEl = document.getElementById("sessionTimer");
  if (timerEl) timerEl.innerText = "⏳ 06:00";

  // stop timer kalau ada
  if (window.stopTimer) {
    window.stopTimer();
  }

  closePopup();
}

window.logout = logout;

// =========================
// PASSWORD TOGGLE
// =========================
export function togglePassword() {
  const pw = document.getElementById("loginPassword");

  if (!pw) return;

  pw.type = pw.type === "password" ? "text" : "password";
}

window.togglePassword = togglePassword;

// =========================
// RESET LOGIN BUTTON UI
// =========================
export function resetLoginBtn() {
  const btn = document.getElementById("loginBtnAction");
  const text = document.getElementById("loginText");
  const loading = document.getElementById("loginLoading");

  if (!btn) return;

  btn.classList.remove("loading");

  if (text) text.style.display = "inline";
  if (loading) loading.style.display = "none";
}

window.resetLoginBtn = resetLoginBtn;

// =========================
// INIT UI (RUN ON LOAD)
// =========================
export function initUI() {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark");

    const btn = document.getElementById("themeBtn");
    if (btn) btn.innerText = "☀️ Light Mode";
  }

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginBtn) loginBtn.style.display = "block";
  if (logoutBtn) logoutBtn.style.display = "none";
}

window.initUI = initUI;
