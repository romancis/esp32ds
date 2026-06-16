// =========================
// MQTT IMPORT
// =========================

import {
    client,
    MQTT_TOPICS
}
from "./mqtt.js";

// =========================
// ELEMENT
// =========================

const logBox =
document.getElementById(
    "logBox"
);

// =========================
// ROLE CHECK
// =========================

function getRole(){

    return localStorage.getItem(
        "romancis_role"
    );

}

function canControl(){

    const role = getRole();

    return (
        role === "admin" ||
        role === "viewer"
    );

}

// =========================
// LOG SYSTEM
// =========================

function addLog(message){

    if(!logBox) return;

    const item =
    document.createElement(
        "div"
    );

    item.className =
    "log-item";

    const now =
    new Date();

    item.innerHTML =

    `[${now.toLocaleTimeString("id-ID")}] ${message}`;

    logBox.prepend(item);

}

// =========================
// MQTT MESSAGE
// =========================

client.on(
    "message",
    (topic,message)=>{

        const data =
        message.toString();

        // UID RFID

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

        // STATUS RFID

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
                `RFID Status : ${data}`
            );

        }

        // RAIN

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

            addLog(
                `Rain : ${data}`
            );

        }

        // TEMPERATURE

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

        // HUMIDITY

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

        // RELAY 1

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

            addLog(
                `Relay 1 : ${data}`
            );

        }

        // RELAY 2

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

            addLog(
                `Relay 2 : ${data}`
            );

        }

    }
);

// =========================
// RELAY CONTROL
// =========================

window.relay1On =
function(){

    if(!canControl()){

        alert(
            "Login terlebih dahulu"
        );

        return;
    }

    client.publish(
        MQTT_TOPICS.relay1,
        "ON"
    );

};

window.relay1Off =
function(){

    if(!canControl()){

        alert(
            "Login terlebih dahulu"
        );

        return;
    }

    client.publish(
        MQTT_TOPICS.relay1,
        "OFF"
    );

};

window.relay2On =
function(){

    if(!canControl()){

        alert(
            "Login terlebih dahulu"
        );

        return;
    }

    client.publish(
        MQTT_TOPICS.relay2,
        "ON"
    );

};

window.relay2Off =
function(){

    if(!canControl()){

        alert(
            "Login terlebih dahulu"
        );

        return;
    }

    client.publish(
        MQTT_TOPICS.relay2,
        "OFF"
    );

};

// =========================
// RFID CONTROL
// =========================

window.rfidEnable =
function(){

    if(!canControl()){

        alert(
            "Login terlebih dahulu"
        );

        return;
    }

    client.publish(
        "mansaci/rfid/control",
        "ENABLE"
    );

    addLog(
        "RFID ENABLE"
    );

};

window.rfidDisable =
function(){

    if(!canControl()){

        alert(
            "Login terlebih dahulu"
        );

        return;
    }

    client.publish(
        "mansaci/rfid/control",
        "DISABLE"
    );

    addLog(
        "RFID DISABLE"
    );

};

// =========================
// MQTT STATUS
// =========================

client.on(
    "connect",
    ()=>{

        addLog(
            "MQTT Connected"
        );

    }
);

client.on(
    "offline",
    ()=>{

        addLog(
            "MQTT Offline"
        );

    }
);

client.on(
    "reconnect",
    ()=>{

        addLog(
            "MQTT Reconnecting..."
        );

    }
);

// =========================
// PAGE READY
// =========================

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        const role =
        getRole();

        addLog(
            `User Role : ${
                role || "guest"
            }`
        );

    }
);

// =========================
// READY
// =========================

console.log(
    "📡 Monitoring Ready"
);
