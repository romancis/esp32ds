// =========================
// AUTH SYSTEM (LOGIN FIREBASE)
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

  // UI loading state
  loginBtn.classList.add("loading");
  loginText.style.display = "none";
  loginLoading.style.display = "inline";

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (!username || !password) {
    document.getElementById("loginInfo").innerText = "Username / Password kosong";
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
      document.getElementById("loginInfo").innerText = "Username tidak ditemukan";
      resetLoginBtn();
      return;
    }

    const data = akunSnap.data();

    // =========================
    // WRONG PASSWORD
    // =========================
    if (data.password !== password) {
      document.getElementById("loginInfo").innerText = "Password salah";
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

    // UI update
    document.getElementById("username").innerText = username;
    document.getElementById("role").innerText = data.role;

    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";

    document.getElementById("loginInfo").innerText = "Login berhasil";

    // pindah ke dashboard
    setTimeout(() => {
      window.showPage("dashboard");
    }, 300);

    // reset input
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";

    // trigger timer (dari timer.js nanti)
    if (window.startTimer) {
      window.startTimer();
    }

  } catch (err) {
    console.error(err);
    document.getElementById("loginInfo").innerText = "Error koneksi Firebase";
  }

  resetLoginBtn();
}

// =========================
// RESET BUTTON UI
// =========================
function resetLoginBtn() {
  const loginBtn = document.getElementById("loginBtnAction");
  const loginText = document.getElementById("loginText");
  const loginLoading = document.getElementById("loginLoading");

  loginBtn.classList.remove("loading");
  loginText.style.display = "inline";
  loginLoading.style.display = "none";
}

// expose ke global (biar bisa dipanggil dari HTML onclick)
window.loginFirebase = loginFirebase;
window.resetLoginBtn = resetLoginBtn;
