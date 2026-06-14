import { db } from "./config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function loginFirebase() {

  const loginBtn = document.getElementById("loginBtnAction");
  const loginText = document.getElementById("loginText");
  const loginLoading = document.getElementById("loginLoading");

  if (!loginBtn) return;

  loginBtn.classList.add("loading");

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

    if (!akunSnap.exists()) {
      document.getElementById("loginInfo").innerText = "Username tidak ditemukan";
      resetLoginBtn();
      return;
    }

    const data = akunSnap.data();

    if (data.password !== password) {
      document.getElementById("loginInfo").innerText = "Password salah";
      resetLoginBtn();
      return;
    }

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

    document.getElementById("username").innerText = username;
    document.getElementById("role").innerText = data.role;

    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";

    document.getElementById("loginInfo").innerText = "Login berhasil";

    setTimeout(() => window.showPage("dashboard"), 300);

    if (window.startTimer) window.startTimer();

  } catch (err) {
    console.error(err);
    document.getElementById("loginInfo").innerText = "Error koneksi Firebase";
  }

  resetLoginBtn();
}

function resetLoginBtn() {
  const btn = document.getElementById("loginBtnAction");
  const text = document.getElementById("loginText");
  const loading = document.getElementById("loginLoading");

  if (!btn) return;

  btn.classList.remove("loading");

  if (text) text.style.display = "inline";
  if (loading) loading.style.display = "none";
}

window.loginFirebase = loginFirebase;
window.resetLoginBtn = resetLoginBtn;
