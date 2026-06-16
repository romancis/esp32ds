// =========================
// DOM READY
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setActiveMenu();

        animateCards();

        buttonEffects();

        setupLogoutPopup();

    }
);

// =========================
// ACTIVE MENU
// =========================

function setActiveMenu(){

    const links =
    document.querySelectorAll(
        ".menu-link"
    );

    const current =
    window.location.pathname
    .split("/")
    .pop();

    links.forEach(link => {

        const href =
        link.getAttribute(
            "href"
        );

        if(!href) return;

        if(

            href.includes(current)

        ){

            link.classList.add(
                "active"
            );

        }

    });

}

// =========================
// CARD ANIMATION
// =========================

function animateCards(){

    const cards =
    document.querySelectorAll(
        ".card"
    );

    cards.forEach(

        (card,index)=>{

            card.style.opacity =
            "0";

            card.style.transform =
            "translateY(20px)";

            setTimeout(()=>{

                card.style.transition =
                "all .4s ease";

                card.style.opacity =
                "1";

                card.style.transform =
                "translateY(0)";

            },index * 100);

        }

    );

}

// =========================
// BUTTON EFFECT
// =========================

function buttonEffects(){

    const buttons =
    document.querySelectorAll(
        "button"
    );

    buttons.forEach(button=>{

        button.addEventListener(
            "mousedown",
            ()=>{

                button.style.transform =
                "scale(.97)";

            }
        );

        button.addEventListener(
            "mouseup",
            ()=>{

                button.style.transform =
                "scale(1)";

            }
        );

        button.addEventListener(
            "mouseleave",
            ()=>{

                button.style.transform =
                "scale(1)";

            }
        );

    });

}

// =========================
// TOAST
// =========================

window.showToast =
function(message){

    const toast =
    document.createElement(
        "div"
    );

    toast.className =
    "toast";

    toast.innerHTML =
    message;

    document.body.appendChild(
        toast
    );

    setTimeout(()=>{

        toast.classList.add(
            "show"
        );

    },100);

    setTimeout(()=>{

        toast.classList.remove(
            "show"
        );

        setTimeout(()=>{

            toast.remove();

        },300);

    },3000);

};

// =========================
// LOGOUT POPUP
// =========================

window.showLogoutPopup =
function(){

    const popup =
    document.getElementById(
        "logoutPopup"
    );

    if(!popup) return;

    popup.style.display =
    "flex";

};

window.closePopup =
function(){

    const popup =
    document.getElementById(
        "logoutPopup"
    );

    if(!popup) return;

    popup.style.display =
    "none";

};

// =========================
// SETUP POPUP
// =========================

function setupLogoutPopup(){

    const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

    const confirmBtn =
    document.getElementById(
        "confirmLogout"
    );

    const cancelBtn =
    document.getElementById(
        "cancelLogout"
    );

    // tombol logout

    if(logoutBtn){

        logoutBtn.addEventListener(
            "click",
            showLogoutPopup
        );

    }

    // tombol ya

    if(confirmBtn){

        confirmBtn.addEventListener(
            "click",
            ()=>{

                if(
                    typeof logout ===
                    "function"
                ){

                    logout();

                }

            }
        );

    }

    // tombol tidak

    if(cancelBtn){

        cancelBtn.addEventListener(
            "click",
            closePopup
        );

    }

}

// =========================
// ESC KEY CLOSE POPUP
// =========================

document.addEventListener(
    "keydown",
    (event)=>{

        if(
            event.key ===
            "Escape"
        ){

            closePopup();

        }

    }
);

// =========================
// CLICK OUTSIDE POPUP
// =========================

window.addEventListener(
    "click",
    (event)=>{

        const popup =
        document.getElementById(
            "logoutPopup"
        );

        if(
            popup &&
            event.target === popup
        ){

            closePopup();

        }

    }
);

// =========================
// READY
// =========================

console.log(
    "🎨 ui.js Loaded"
);
