// =========================
// MQTT CONFIG
// =========================

const MQTT_BROKER =
"wss://broker.hivemq.com:8884/mqtt";

const MQTT_TOPICS = {

    uid:
    "mansaci/rfid/uid",

    status:
    "mansaci/rfid/status",

    rain:
    "mansaci/rain",

    relay1:
    "mansaci/relay1",

    relay2:
    "mansaci/relay2",

    temperature:
    "mansaci/temperature",

    humidity:
    "mansaci/humidity"

};

// =========================
// MQTT CLIENT
// =========================

const client = mqtt.connect(
    MQTT_BROKER
);

// =========================
// CONNECT
// =========================

client.on("connect", () => {

    console.log(
        "MQTT Connected"
    );

    const mqttStatus =
        document.getElementById(
            "mqttStatus"
        );

    if(mqttStatus){

        mqttStatus.innerHTML =
        "🟢 Connected";

    }

    Object.values(MQTT_TOPICS)
    .forEach(topic => {

        client.subscribe(topic);

        console.log(
            "Subscribe:",
            topic
        );

    });

});

// =========================
// DISCONNECT
// =========================

client.on("offline", () => {

    const mqttStatus =
        document.getElementById(
            "mqttStatus"
        );

    if(mqttStatus){

        mqttStatus.innerHTML =
        "🔴 Offline";

    }

});

client.on("reconnect", () => {

    const mqttStatus =
    document.getElementById(
        "mqttStatus"
    );

    if(mqttStatus){

        mqttStatus.innerHTML =
        "🟡 Reconnecting...";

    }

});

client.on("error", (err) => {

    console.error(
        "MQTT Error:",
        err
    );

});

// =========================
// MESSAGE HANDLER
// =========================

client.on(
"message",
(topic,message)=>{

    const data =
    message.toString();

    console.log(
        topic,
        data
    );

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

    // AUTO FILL SETNAME

    const uidInput =
    document.getElementById(
        "uidInput"
    );

    if(uidInput){

        uidInput.value =
        data;

    }

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

    }

    // RAIN SENSOR

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

    }

    // TEMPERATURE

if(
    topic ===
    MQTT_TOPICS.temperature
){

    const temperature =
    document.getElementById(
        "temperature"
    );

    if(temperature){

        temperature.innerHTML =
        data;

    }

}

// HUMIDITY

if(
    topic ===
    MQTT_TOPICS.humidity
){

    const humidity =
    document.getElementById(
        "humidity"
    );

    if(humidity){

        humidity.innerHTML =
        data;

    }

}

});

// =========================
// PUBLISH FUNCTION
// =========================

window.publishMQTT =
function(topic,message){

    client.publish(
        topic,
        message
    );

};

// =========================
// EXPORT
// =========================

export {
    client,
    MQTT_TOPICS
};