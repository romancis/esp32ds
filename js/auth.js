// =========================
// FIREBASE
// =========================

import { db } from "./firebase.js";

import {
    doc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// =========================
// LOGIN
// =========================

window.loginFirebase = async function() {

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();

    const info =
        document.getElementById("loginInfo");

    const btn =
        document.getElementById("loginBtnAction");

    const text =
        document.getElementById("loginText");

    const loading =
        document.getElementById("loginLoading");

    // =====================
    // VALIDASI
    // =====================

    if (!username || !password) {

        info.innerHTML =
            "Lengkapi username dan password";

        return;
    }

    // =====================
    // LOADING
    // =====================

    btn.classList.add("loading");

    text.style.display = "none";
    loading.style.display = "inline";

    try {

        const akunRef =
            doc(db, "accounts", username);

        const akunSnap =
            await getDoc(akunRef);

        if (!akunSnap.exists()) {

            info.innerHTML =
                "Username tidak ditemukan";

            return;
        }

        const data =
            akunSnap.data();

        if (data.password !== password) {

            info.innerHTML =
                "Password salah";

            return;
        }

        // =====================
        // LOGIN BERHASIL
        // =====================

        info.innerHTML =
            "✅ Login berhasil";

        document.getElementById("username")
            .innerHTML = username;

        document.getElementById("role")
            .innerHTML = data.role || "User";

        document.getElementById("loginBtn")
            .style.display = "none";

        document.getElementById("logoutBtn")
            .style.display = "block";

        // simpan session

        localStorage.setItem(
            "romancis_username",
            username
        );

        localStorage.setItem(
            "romancis_role",
            data.role || "User"
        );

        // kembali ke dashboard

        setTimeout(() => {

            window.location.href =
              "./index.html";

        }, 700);

    }
    catch(error) {

        console.error(error);

        info.innerHTML =
            "Terjadi kesalahan";

    }
    finally {

        btn.classList.remove("loading");

        text.style.display = "inline";
        loading.style.display = "none";

    }

};

// =========================
// LOGOUT
// =========================

window.logout = function() {

    localStorage.removeItem(
        "romancis_username"
    );

    localStorage.removeItem(
        "romancis_role"
    );

    document.getElementById("username")
        .innerHTML = "Guest";

    document.getElementById("role")
        .innerHTML = "Belum Login";

    document.getElementById("loginBtn")
        .style.display = "block";

    document.getElementById("logoutBtn")
        .style.display = "none";

    closePopup();

    window.location.href =
     "./index.html";

};

// =========================
// AUTO LOGIN
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const username =
            localStorage.getItem(
                "romancis_username"
            );

        const role =
            localStorage.getItem(
                "romancis_role"
            );

        if (username) {

            document.getElementById("username")
                .innerHTML = username;

            document.getElementById("role")
                .innerHTML = role;

            document.getElementById("loginBtn")
                .style.display = "none";

            document.getElementById("logoutBtn")
                .style.display = "block";

        }
        else {

            document.getElementById("loginBtn")
                .style.display = "block";

            document.getElementById("logoutBtn")
                .style.display = "none";

        }

    }
);