// =========================
// ELEMENT HELPER
// =========================

function el(id){

    return document.getElementById(
        id
    );

}

// =========================
// APPLY THEME
// =========================

function applyTheme(theme){

    if(theme === "dark"){

        document.body.classList.add(
            "dark"
        );

    }
    else{

        document.body.classList.remove(
            "dark"
        );

    }

    updateThemeButton();

}

// =========================
// SAVE THEME
// =========================

function saveTheme(theme){

    localStorage.setItem(
        "theme",
        theme
    );

}

// =========================
// LOAD THEME
// =========================

function loadTheme(){

    let theme =
    localStorage.getItem(
        "theme"
    );

    // pertama kali buka

    if(!theme){

        const prefersDark =

        window.matchMedia(

            "(prefers-color-scheme: dark)"

        ).matches;

        theme =
        prefersDark
        ? "dark"
        : "light";

    }

    applyTheme(theme);

}

// =========================
// TOGGLE THEME
// =========================

window.toggleTheme =
function(){

    const isDark =

    document.body.classList.contains(
        "dark"
    );

    const newTheme =

    isDark
    ? "light"
    : "dark";

    applyTheme(
        newTheme
    );

    saveTheme(
        newTheme
    );

};

// =========================
// UPDATE BUTTON
// =========================

function updateThemeButton(){

    const btn =
    el("themeBtn");

    if(!btn) return;

    const isDark =

    document.body.classList.contains(
        "dark"
    );

    btn.innerHTML =

    isDark

    ?

    "☀️ Light Mode"

    :

    "🌙 Dark Mode";

}

// =========================
// INIT
// =========================

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        loadTheme();

        const btn =
        el("themeBtn");

        if(btn){

            btn.addEventListener(
                "click",
                toggleTheme
            );

        }

    }
);

// =========================
// READY
// =========================

console.log(
    "🌙 theme.js Loaded"
);
