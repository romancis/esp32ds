// =========================
// IMPORT MQTT
// =========================

import {
    client,
    MQTT_TOPICS
}
from "./mqtt.js";

// =========================
// LOG BOX
// =========================

const logBox =
document.getElementById(
    "logBox"
);

// =========================
// ADD LOG
// =========================

function addLog(message){

    if(!logBox) return;

    const item =
    document.createElement("div");

    item.className =
    "log-item";

    const now =
    new Date();

    const time =
    now.toLocaleTimeString(
        "id-ID"
    );

    item.innerHTML =
    `[${time}] ${message}`;

    logBox.prepend(item);

}

// =========================
// MQTT MESSAGE
// =========================

client.on(
    "message",
    async (
        topic,
        message
    ) => {

        const data =
        message.toString();

        // =====================
        // UID
        // =====================

        if(
            topic ===
            MQTT_TOPICS.uid
        ){

            const uid =
            document.getElementById(
                "uid"
            );

            if(uid){

                uid.innerHTML =
                data;

            }

            addLog(
                `RFID UID : ${data}`
            );

        }

        // =====================
        // STATUS
        // =====================

        if(
            topic ===
            MQTT_TOPICS.status
        ){

            const status =
            document.getElementById(
                "status"
            );

            if(status){

                status.innerHTML =
                data;

            }

            addLog(
                `Status : ${data}`
            );

        }

        // =====================
        // RAIN
        // =====================

        if(
            topic ===
            MQTT_TOPICS.rain
        ){

            const rain =
            document.getElementById(
                "rain"
            );

            if(rain){

                rain.innerHTML =
                data;

            }

        }

        // =====================
        // TEMPERATURE
        // =====================

        if(
            topic ===
            MQTT_TOPICS.temperature
        ){

            const temp =
            document.getElementById(
                "temperature"
            );

            if(temp){

                temp.innerHTML =
                data;

            }

        }

        // =====================
        // HUMIDITY
        // =====================

        if(
            topic ===
            MQTT_TOPICS.humidity
        ){

            const hum =
            document.getElementById(
                "humidity"
            );

            if(hum){

                hum.innerHTML =
                data;

            }

        }

        // =====================
        // RELAY 1
        // =====================

        if(
            topic ===
            MQTT_TOPICS.relay1
        ){

            const relay1 =
            document.getElementById(
                "relay1"
            );

            if(relay1){

                relay1.innerHTML =
                data;

            }

        }

        // =====================
        // RELAY 2
        // =====================

        if(
            topic ===
            MQTT_TOPICS.relay2
        ){

            const relay2 =
            document.getElementById(
                "relay2"
            );

            if(relay2){

                relay2.innerHTML =
                data;

            }

        }

    }
);

// =========================
// ROLE CHECK
// =========================

function canControl(){

    const role =
    localStorage.getItem(
        "romancis_role"
    );

    return (
        role === "admin" ||
        role === "viewer"
    );

}

// =========================
// CONTROL RELAY 1
// =========================

window.relay1On =
function(){

    if(!canControl()){

        alert(
            "Silakan login terlebih dahulu"
        );

        return;
    }

    client.publish(
        MQTT_TOPICS.relay1,
        "ON"
    );

    addLog(
        "Relay 1 ON"
    );

};

window.relay1Off =
function(){

    if(!canControl()){

        alert(
            "Silakan login terlebih dahulu"
        );

        return;
    }

    client.publish(
        MQTT_TOPICS.relay1,
        "OFF"
    );

    addLog(
        "Relay 1 OFF"
    );

};

// =========================
// CONTROL RELAY 2
// =========================

window.relay2On =
function(){

    if(!canControl()){

        alert(
            "Silakan login terlebih dahulu"
        );

        return;
    }

    client.publish(
        MQTT_TOPICS.relay2,
        "ON"
    );

    addLog(
        "Relay 2 ON"
    );

};

window.relay2Off =
function(){

    if(!canControl()){

        alert(
            "Silakan login terlebih dahulu"
        );

        return;
    }

    client.publish(
        MQTT_TOPICS.relay2,
        "OFF"
    );

    addLog(
        "Relay 2 OFF"
    );

};

// =========================
// MQTT STATUS
// =========================

client.on(
    "connect",
    () => {

        addLog(
            "MQTT Connected"
        );

    }
);

client.on(
    "offline",
    () => {

        addLog(
            "MQTT Offline"
        );

    }
);

client.on(
    "reconnect",
    () => {

        addLog(
            "MQTT Reconnecting..."
        );

    }
);

// =========================
// READY
// =========================

console.log(
    "📡 Monitoring Ready"
);
