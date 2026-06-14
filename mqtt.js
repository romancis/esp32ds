import { MQTT_CONFIG } from "./config.js";
import { setMQTTStatus, addLog } from "./ui.js";

export let client;

export function initMQTT() {

  if (typeof mqtt === "undefined") {
    console.error("MQTT library not loaded");
    return;
  }

  client = mqtt.connect(MQTT_CONFIG.broker);

  client.on("connect", () => {
    setMQTTStatus("connected");
    addLog("MQTT Connected");

    client.subscribe(Object.values(MQTT_CONFIG.topics));
  });

  client.on("message", (topic, message) => {

    const data = message.toString();

    if (topic === MQTT_CONFIG.topics.uid) {
      const el = document.getElementById("uid");
      if (el) el.innerText = data;
      addLog("UID: " + data);
    }

    if (topic === MQTT_CONFIG.topics.status) {
      const el = document.getElementById("status");
      if (el) el.innerText = data;
      addLog("Status: " + data);
    }

    if (topic === MQTT_CONFIG.topics.rain) {
      const el = document.getElementById("rain");
      if (el) el.innerText = data;
      addLog("Rain: " + data);
    }
  });

  client.on("close", () => {
    setMQTTStatus("disconnected");
    addLog("MQTT Disconnected");
  });
}
