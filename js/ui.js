
// =========================
// UI READY
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setActiveMenu();

        animateCards();

        buttonEffects();

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

    const currentPage =
    window.location.pathname;

    links.forEach(link => {

        const href =
        link.getAttribute("href");

        if(

            currentPage.includes(href)

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
                ".4s ease";

                card.style.opacity =
                "1";

                card.style.transform =
                "translateY(0)";

            },index*100);

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
// TOAST NOTIFICATION
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
// READY
// =========================

console.log(
    "🎨 ui.js Loaded"
);