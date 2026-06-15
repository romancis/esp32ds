// =========================
// MQTT IMPORT
// =========================

import {

    client,
    MQTT_TOPICS

}

from "./mqtt.js";

// =========================
// ELEMENTS
// =========================

const uidElement =
document.getElementById(
    "uid"
);

const statusElement =
document.getElementById(
    "status"
);

const rainElement =
document.getElementById(
    "rain"
);

const relay1Element =
document.getElementById(
    "relay1"
);

const relay2Element =
document.getElementById(
    "relay2"
);

const logBox =
document.getElementById(
    "logBox"
);

// =========================
// ADD LOG
// =========================

function addLog(text){

    if(!logBox) return;

    const item =
    document.createElement(
        "div"
    );

    item.className =
    "log-item";

    item.innerHTML =

    `
    <span>
    ${new Date().toLocaleTimeString()}
    </span>

    <br>

    ${text}
    `;

    logBox.prepend(item);

    while(

        logBox.children.length > 50

    ){

        logBox.removeChild(
            logBox.lastChild
        );

    }

}

// =========================
// MQTT MESSAGE
// =========================

client.on(

    "message",

    (topic,message)=>{

        const data =
        message.toString();

        // UID

        if(

            topic ===
            MQTT_TOPICS.uid

        ){

            if(uidElement){

                uidElement.innerHTML =
                data;

            }

            addLog(
                "RFID UID : " +
                data
            );

        }

        // STATUS

        if(

            topic ===
            MQTT_TOPICS.status

        ){

            if(statusElement){

                statusElement.innerHTML =
                data;

            }

            addLog(
                "Status : " +
                data
            );

        }

        // RAIN

        if(

            topic ===
            MQTT_TOPICS.rain

        ){

            if(rainElement){

                rainElement.innerHTML =
                data;

            }

            addLog(
                "Rain : " +
                data
            );

        }

        // RELAY 1

        if(

            topic ===
            MQTT_TOPICS.relay1

        ){

            if(relay1Element){

                relay1Element.innerHTML =
                data;

            }

            addLog(
                "Relay 1 : " +
                data
            );

        }

        // RELAY 2

        if(

            topic ===
            MQTT_TOPICS.relay2

        ){

            if(relay2Element){

                relay2Element.innerHTML =
                data;

            }

            addLog(
                "Relay 2 : " +
                data
            );

        }

    }

);

// =========================
// READY
// =========================

console.log(
    "📡 Monitoring Ready"
);