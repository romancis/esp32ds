// =========================
// THEME STARTUP
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTheme();

    }
);

// =========================
// TOGGLE THEME
// =========================

window.toggleTheme =
function(){

    document.body.classList.toggle(
        "dark"
    );

    updateThemeButton();

    saveTheme();

};

// =========================
// SAVE THEME
// =========================

function saveTheme(){

    const isDark =
    document.body.classList.contains(
        "dark"
    );

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

}

// =========================
// LOAD THEME
// =========================

function loadTheme(){

    const savedTheme =
    localStorage.getItem(
        "theme"
    );

    if(savedTheme === "dark"){

        document.body.classList.add(
            "dark"
        );

    }

    updateThemeButton();

}

// =========================
// UPDATE BUTTON
// =========================

function updateThemeButton(){

    const btn =
    document.getElementById(
        "themeBtn"
    );

    if(!btn){

        return;

    }

    if(

        document.body.classList.contains(
            "dark"
        )

    ){

        btn.innerHTML =
        "☀️ Light Mode";

    }

    else{

        btn.innerHTML =
        "🌙 Dark Mode";

    }

}

// =========================
// READY
// =========================

console.log(
    "🌙 theme.js Loaded"
);