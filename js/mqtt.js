// =========================
// MQTT CONFIG
// =========================

const MQTT_BROKER =
"wss://broker.hivemq.com:8884/mqtt";

const MQTT_OPTIONS = {

```
reconnectPeriod: 3000,
connectTimeout: 10000,
clean: true
```

};

const MQTT_TOPICS = {

```
// RFID

uid:
"mansaci/rfid/uid",

status:
"mansaci/rfid/status",

// SENSOR

rain:
"mansaci/rain",

temperature:
"mansaci/temperature",

humidity:
"mansaci/humidity",

// RELAY

relay1:
"mansaci/relay1",

relay2:
"mansaci/relay2",

// CONTROL

control:
"mansaci/control",

buzzer:
"mansaci/buzzer",

door:
"mansaci/door"
```

};

// =========================
// MQTT CLIENT
// =========================

const client =
mqtt.connect(
MQTT_BROKER,
MQTT_OPTIONS
);

// =========================
// CONNECT
// =========================

client.on(
"connect",
() => {

```
    console.log(
        "✅ MQTT Connected"
    );

    const mqttStatus =
    document.getElementById(
        "mqttStatus"
    );

    if(mqttStatus){

        mqttStatus.innerHTML =
        "🟢 Connected";

    }

    Object.values(
        MQTT_TOPICS
    ).forEach(topic=>{

        client.subscribe(
            topic
        );

        console.log(
            "📡 Subscribe:",
            topic
        );

    });

}
```

);

// =========================
// OFFLINE
// =========================

client.on(
"offline",
()=>{

```
    const mqttStatus =
    document.getElementById(
        "mqttStatus"
    );

    if(mqttStatus){

        mqttStatus.innerHTML =
        "🔴 Offline";

    }

}
```

);

// =========================
// RECONNECT
// =========================

client.on(
"reconnect",
()=>{

```
    const mqttStatus =
    document.getElementById(
        "mqttStatus"
    );

    if(mqttStatus){

        mqttStatus.innerHTML =
        "🟡 Reconnecting...";

    }

}
```

);

// =========================
// ERROR
// =========================

client.on(
"error",
(error)=>{

```
    console.error(
        "❌ MQTT Error:",
        error
    );

}
```

);

// =========================
// MESSAGE HANDLER
// =========================

client.on(
"message",
(topic,message)=>{

```
    const data =
    message.toString();

    console.log(
        topic,
        data
    );

    // =====================
    // UID RFID
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

        const uidInput =
        document.getElementById(
            "uidInput"
        );

        if(uidInput){

            uidInput.value =
            data;

        }

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

        const temperature =
        document.getElementById(
            "temperature"
        );

        if(temperature){

            temperature.innerHTML =
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

        const humidity =
        document.getElementById(
            "humidity"
        );

        if(humidity){

            humidity.innerHTML =
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
```

);

// =========================
// GENERIC PUBLISH
// =========================

function publishMQTT(
topic,
message
){

```
if(
    !client.connected
){

    console.warn(
        "MQTT belum connect"
    );

    return;
}

client.publish(
    topic,
    String(message)
);
```

}

// =========================
// RELAY CONTROL
// =========================

function publishRelay1(
state
){

```
publishMQTT(
    MQTT_TOPICS.relay1,
    state
);
```

}

function publishRelay2(
state
){

```
publishMQTT(
    MQTT_TOPICS.relay2,
    state
);
```

}

// =========================
// DOOR CONTROL
// =========================

function publishDoor(
state
){

```
publishMQTT(
    MQTT_TOPICS.door,
    state
);
```

}

// =========================
// BUZZER CONTROL
// =========================

function publishBuzzer(
state
){

```
publishMQTT(
    MQTT_TOPICS.buzzer,
    state
);
```

}

// =========================
// GLOBAL
// =========================

window.publishMQTT =
publishMQTT;

window.publishRelay1 =
publishRelay1;

window.publishRelay2 =
publishRelay2;

window.publishDoor =
publishDoor;

window.publishBuzzer =
publishBuzzer;

// =========================
// EXPORT
// =========================

export {

```
client,

MQTT_TOPICS,

publishMQTT,

publishRelay1,

publishRelay2,

publishDoor,

publishBuzzer
```

};
