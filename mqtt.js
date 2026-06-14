import { MQTT_CONFIG } from "./config.js";
import { setMQTTStatus, addLog } from "./ui.js";

export let client;

export function initMQTT(){

  client = mqtt.connect(MQTT_CONFIG.broker);

  client.on("connect", () => {
    setMQTTStatus("connected");
    addLog("MQTT Connected");

    client.subscribe(Object.values(MQTT_CONFIG.topics));
  });

  client.on("message", (topic, message) => {

    const data = message.toString();

    switch(topic){

      case MQTT_CONFIG.topics.uid:
        document.getElementById("uid").innerText = data;
        addLog("UID: " + data);
        break;

      case MQTT_CONFIG.topics.status:
        document.getElementById("status").innerText = data;
        addLog("Status: " + data);
        break;

      case MQTT_CONFIG.topics.rain:
        document.getElementById("rain").innerText = data;
        addLog("Rain: " + data);
        break;
    }

  });

  client.on("close", () => {
    setMQTTStatus("disconnected");
    addLog("MQTT Disconnected");
  });

}
