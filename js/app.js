// =========================
// APP START
// =========================

console.log(
    "🚀 RoManCiS Started"
);

// =========================
// ROLE CHECK
// =========================

function getRole(){

    return localStorage.getItem(
        "romancis_role"
    );

}

function getUser(){

    return localStorage.getItem(
        "romancis_username"
    );

}

// =========================
// PERMISSION CHECK
// =========================

window.hasPermission =
function(permission){

    const role =
    getRole();

    // ADMIN

    if(role === "admin"){

        return true;

    }

    // VIEWER

    if(role === "viewer"){

        switch(permission){

            case "monitoring":

                return true;

            case "view_setname":

                return true;

            case "edit_setname":

                return false;

            default:

                return false;

        }

    }

    // GUEST

    return false;

};

// =========================
// REQUIRE LOGIN
// =========================

window.requireLogin =
function(){

    alert(
        "Silakan login terlebih dahulu"
    );

    window.location.href =
    "./pages/login.html";

};

// =========================
// REQUIRE PERMISSION
// =========================

window.requirePermission =
function(permission){

    const allowed =
    window.hasPermission(
        permission
    );

    if(!allowed){

        const user =
        getUser();

        if(!user){

            alert(
                "Login diperlukan"
            );

            window.location.href =
            "./pages/login.html";

            return false;
        }

        alert(
            "Akses tidak diizinkan"
        );

        return false;
    }

    return true;

};

// =========================
// DASHBOARD INFO
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const username =
        getUser();

        const role =
        getRole();

        const userBox =
        document.getElementById(
            "dashboardUser"
        );

        const roleBox =
        document.getElementById(
            "dashboardRole"
        );

        if(userBox){

            userBox.innerHTML =
            username || "Guest";

        }

        if(roleBox){

            roleBox.innerHTML =
            role || "Guest";

        }

        updateDashboardAccess();

    }
);

// =========================
// ACCESS BADGES
// =========================

function updateDashboardAccess(){

    const role =
    getRole();

    const accessBox =
    document.getElementById(
        "accessInfo"
    );

    if(!accessBox) return;

    if(role === "admin"){

        accessBox.innerHTML =
        `
        🟢 Full Access
        <br>
        Dashboard
        <br>
        Monitoring
        <br>
        SetName RFID
        <br>
        MQTT Control
        `;

        return;
    }

    if(role === "viewer"){

        accessBox.innerHTML =
        `
        🟡 Viewer Access
        <br>
        Monitoring Control
        <br>
        View SetName
        <br>
        Session 6 Menit
        `;

        return;
    }

    accessBox.innerHTML =
    `
    🔴 Guest
    <br>
    Login diperlukan
    untuk mengontrol sistem
    `;

}

// =========================
// PROTECTED BUTTON
// =========================

window.protectedAction =
function(permission, callback){

    if(
        !window.requirePermission(
            permission
        )
    ){

        return;
    }

    callback();

};

// =========================
// DEBUG
// =========================

console.log(
    "✅ app.js Loaded"
);
