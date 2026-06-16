// =========================
// APP START
// =========================

console.log(
"🚀 RoManCiS Started"
);

// =========================
// USER DATA
// =========================

function getRole(){

```
return localStorage.getItem(
    "romancis_role"
) || "guest";
```

}

function getUser(){

```
return localStorage.getItem(
    "romancis_username"
);
```

}

// =========================
// ROLE CHECK
// =========================

window.isGuest = function(){

```
return !getUser();
```

};

window.isViewer = function(){

```
return getRole() === "viewer";
```

};

window.isAdmin = function(){

```
return getRole() === "admin";
```

};

// =========================
// RFID ACCESS
// =========================

window.canEditRFID = function(){

```
return (
    getRole() === "admin"
);
```

};

window.canViewRFID = function(){

```
return true;
```

};

// =========================
// ESP32 ACCESS
// =========================

window.canControlESP = function(){

```
return (
    getRole() === "admin" ||
    getRole() === "viewer"
);
```

};

// =========================
// ACCESS MESSAGE
// =========================

window.showAccessDenied =
function(){

```
const user =
getUser();

if(!user){

    alert(
        "Silakan login terlebih dahulu"
    );

    return;
}

alert(
    "Akses tidak diizinkan"
);
```

};

// =========================
// PROTECTED ACTION
// =========================

window.protectedAction =
function(callback){

```
if(
    !window.canControlESP()
){

    window.showAccessDenied();

    return;
}

callback();
```

};

// =========================
// DASHBOARD INFO
// =========================

function updateDashboard(){

```
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
    getUser() || "Guest";

}

if(roleBox){

    roleBox.innerHTML =
    getRole();

}
```

}

// =========================
// ACCESS INFO
// =========================

function updateAccessInfo(){

```
const accessBox =
document.getElementById(
    "accessInfo"
);

if(!accessBox) return;

const role =
getRole();

if(role === "admin"){

    accessBox.innerHTML =

    `
    🟢 Admin
    <br>
    Full Access
    <br>
    Monitoring
    <br>
    RFID
    <br>
    ESP32 Control
    `;

    return;

}

if(role === "viewer"){

    accessBox.innerHTML =

    `
    🟡 Viewer
    <br>
    Monitoring
    <br>
    RFID Control
    <br>
    Timer 6 Menit
    `;

    return;

}

accessBox.innerHTML =

`
🔴 Guest
<br>
Hanya melihat data
<br>
Tidak dapat
mengontrol sistem
`;
```

}

// =========================
// INIT
// =========================

document.addEventListener(
"DOMContentLoaded",
()=>{

```
    updateDashboard();

    updateAccessInfo();

}
```

);

// =========================
// DEBUG
// =========================

console.log(
"✅ app.js Loaded"
);
