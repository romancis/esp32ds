// =========================
// SESSION TIMER SYSTEM
// =========================

let timerInterval = null;

// =========================
// START TIMER
// =========================
export function startTimer() {
  clearInterval(timerInterval);
  timerInterval = null;

  const session = localStorage.getItem("sessionType");
  const loginTime = Number(localStorage.getItem("loginTime"));

  const timerEl = document.getElementById("sessionTimer");
  if (!timerEl) return;

  // =========================
  // ADMIN MODE (NO TIMER)
  // =========================
  if (session === "admin") {
    timerEl.innerText = "👑 Admin Mode";
    timerEl.style.background = "var(--card)";
    timerEl.style.opacity = "1";
    timerEl.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)";
    return;
  }

  // =========================
  // VALIDATION
  // =========================
  if (!loginTime || isNaN(loginTime)) {
    timerEl.innerText = "⏳ 06:00";
    return;
  }

  const TOTAL_TIME = 6 * 60; // 6 menit

  // =========================
  // RUN TIMER
  // =========================
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - loginTime) / 1000);
    const remaining = TOTAL_TIME - elapsed;

    // TIME OUT → AUTO LOGOUT
    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      if (window.logout) {
        window.logout();
      }

      return;
    }

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    timerEl.innerText =
      `⏳ ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, 1000);
}

// =========================
// STOP TIMER (optional)
// =========================
export function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// expose ke global
window.startTimer = startTimer;
window.stopTimer = stopTimer;
