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
// SESSION TIMER
// =========================

let sessionInterval = null;

// =========================
// SAFE ELEMENT
// =========================

function el(id){

    return document.getElementById(id);

}

// =========================
// UPDATE UI
// =========================

function updateUI(){

    const username =
    localStorage.getItem(
        "romancis_username"
    );

    const role =
    localStorage.getItem(
        "romancis_role"
    );

    const usernameEl = el("username");
    const roleEl = el("role");

    const loginBtn = el("loginBtn");
    const logoutBtn = el("logoutBtn");

    const timerEl = el("sessionTimer");

    const dashboardUser =
    el("dashboardUser");

    const dashboardRole =
    el("dashboardRole");

    // =====================
    // GUEST
    // =====================

    if(!username){

        if(usernameEl)
            usernameEl.innerHTML =
            "Guest";

        if(roleEl)
            roleEl.innerHTML =
            "Belum Login";

        if(loginBtn)
            loginBtn.style.display =
            "block";

        if(logoutBtn)
            logoutBtn.style.display =
            "none";

        if(timerEl)
            timerEl.style.display =
            "none";

        if(dashboardUser)
            dashboardUser.innerHTML =
            "Guest";

        if(dashboardRole)
            dashboardRole.innerHTML =
            "Guest";

        return;
    }

    // =====================
    // USER LOGIN
    // =====================

    if(usernameEl)
        usernameEl.innerHTML =
        username;

    if(roleEl)
        roleEl.innerHTML =
        role;

    if(loginBtn)
        loginBtn.style.display =
        "none";

    if(logoutBtn)
        logoutBtn.style.display =
        "block";

    if(dashboardUser)
        dashboardUser.innerHTML =
        username;

    if(dashboardRole)
        dashboardRole.innerHTML =
        role;

    // =====================
    // VIEWER TIMER
    // =====================

    if(role === "viewer"){

        startViewerTimer();

    }
    else{

        if(timerEl)
            timerEl.style.display =
            "none";

    }

}

// =========================
// TIMER VIEWER
// =========================

function startViewerTimer(){

    const timerEl =
    el("sessionTimer");

    if(!timerEl) return;

    timerEl.style.display =
    "block";

    clearInterval(
        sessionInterval
    );

    let seconds = 360;

    sessionInterval =
    setInterval(() => {

        const minutes =
        Math.floor(
            seconds / 60
        );

        const remain =
        seconds % 60;

        timerEl.innerHTML =
        `⏳ ${String(minutes)
            .padStart(2,"0")}:${String(remain)
            .padStart(2,"0")}`;

        seconds--;

        if(seconds < 0){

            clearInterval(
                sessionInterval
            );

            alert(
                "Session Viewer Habis"
            );

            logout();

        }

    },1000);

}

// =========================
// LOGIN
// =========================

window.loginFirebase =
async function(){

    const username =
    el("loginUsername")?.value
    ?.trim();

    const password =
    el("loginPassword")?.value
    ?.trim();

    const info =
    el("loginInfo");

    const btn =
    el("loginBtnAction");

    const text =
    el("loginText");

    const loading =
    el("loginLoading");

    if(!username ||
       !password){

        if(info){

            info.innerHTML =
            "Lengkapi username dan password";

        }

        return;
    }

    try{

        if(btn)
            btn.classList.add(
                "loading"
            );

        if(text)
            text.style.display =
            "none";

        if(loading)
            loading.style.display =
            "inline";

        const akunRef =
        doc(
            db,
            "accounts",
            username
        );

        const akunSnap =
        await getDoc(
            akunRef
        );

        if(!akunSnap.exists()){

            if(info){

                info.innerHTML =
                "Username tidak ditemukan";

            }

            return;
        }

        const data =
        akunSnap.data();

        if(data.password !== password){

            if(info){

                info.innerHTML =
                "Password salah";

            }

            return;
        }

        localStorage.setItem(
            "romancis_username",
            username
        );

        localStorage.setItem(
            "romancis_role",
            data.role
        );

        if(info){

            info.innerHTML =
            "✅ Login berhasil";

        }

        setTimeout(() => {

            window.location.href =
            "../index.html";

        },1000);

    }
    catch(error){

        console.error(error);

        if(info){

            info.innerHTML =
            "Terjadi kesalahan";

        }

    }
    finally{

        if(btn)
            btn.classList.remove(
                "loading"
            );

        if(text)
            text.style.display =
            "inline";

        if(loading)
            loading.style.display =
            "none";

    }

};

// =========================
// SHOW PASSWORD
// =========================

window.togglePassword =
function(){

    const input =
    el("loginPassword");

    if(!input) return;

    if(
        input.type ===
        "password"
    ){

        input.type =
        "text";

    }
    else{

        input.type =
        "password";

    }

};

// =========================
// LOGOUT
// =========================

window.logout =
function(){

    localStorage.removeItem(
        "romancis_username"
    );

    localStorage.removeItem(
        "romancis_role"
    );

    clearInterval(
        sessionInterval
    );

    window.location.href =
    "../index.html";

};

// =========================
// INIT
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateUI();

    }
);
