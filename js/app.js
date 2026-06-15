// =========================
// APP STARTUP
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "🚀 RoManCiS Started"
        );

        loadUser();

        startSessionTimer();

    }
);

// =========================
// LOAD USER
// =========================

function loadUser(){

    const username =
localStorage.getItem(
    "romancis_username"
);

const role =
localStorage.getItem(
    "romancis_role"
);

    const usernameElement =
    document.getElementById(
        "username"
    );

    const roleElement =
    document.getElementById(
        "role"
    );

    if(username && role){

        if(usernameElement){

            usernameElement.innerHTML =
            username;

        }

        if(roleElement){

            roleElement.innerHTML =
            role;

        }

    }

}

// =========================
// SESSION TIMER
// =========================

function startSessionTimer(){

    const timerElement =
    document.getElementById(
        "sessionTimer"
    );

    if(!timerElement){

        return;

    }

    let seconds = 0;

    setInterval(() => {

        seconds++;

        const hours =
        String(
            Math.floor(
                seconds / 3600
            )
        ).padStart(2,"0");

        const minutes =
        String(
            Math.floor(
                (seconds % 3600) / 60
            )
        ).padStart(2,"0");

        const secs =
        String(
            seconds % 60
        ).padStart(2,"0");

        timerElement.innerHTML =

        `⏳ ${hours}:${minutes}:${secs}`;

    },1000);

}

// =========================
// LOGOUT POPUP
// =========================

window.showLogoutPopup =
function(){

    const popup =
    document.getElementById(
        "logoutPopup"
    );

    if(popup){

        popup.style.display =
        "flex";

    }

};

// =========================
// CLOSE POPUP
// =========================

window.closePopup =
function(){

    const popup =
    document.getElementById(
        "logoutPopup"
    );

    if(popup){

        popup.style.display =
        "none";

    }

};

// =========================
// LOGOUT
// =========================

window.logout =
function(){

    localStorage.removeItem(
        "username"
    );

    localStorage.removeItem(
        "role"
    );

    window.location.href =
    "./pages/login.html";

};

// =========================
// READY
// =========================

console.log(
    "✅ app.js Loaded"
);
