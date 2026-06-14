// =========================
// MQTT MODULE (SAFE VERSION)
// =========================

import { MQTT_CONFIG } from "./config.js";
import { setMQTTStatus, addLog } from "./ui.js";

export let client = null;

// =========================
// INIT MQTT
// =========================
export function initMQTT() {

  // =========================
  // CHECK MQTT LIBRARY
  // =========================
  if (typeof window.mqtt === "undefined") {
    console.error("MQTT library belum diload (mqtt.min.js)");
    return;
  }

  try {
    client = window.mqtt.connect(MQTT_CONFIG.broker);
  } catch (err) {
    console.error("Gagal connect MQTT:", err);
    return;
  }

  // =========================
  // CONNECTED
  // =========================
  client.on("connect", () => {
    setMQTTStatus("connected");
    addLog("MQTT Connected");

    const topics = Object.values(MQTT_CONFIG.topics);

    if (topics.length > 0) {
      client.subscribe(topics, (err) => {
        if (err) {
          console.error("Subscribe error:", err);
        }
      });
    }
  });

  // =========================
  // MESSAGE HANDLER
  // =========================
  client.on("message", (topic, message) => {
    const data = message.toString();

    // UID
    if (topic === MQTT_CONFIG.topics.uid) {
      const el = document.getElementById("uid");
      if (el) el.innerText = data;
      addLog("UID: " + data);
    }

    // STATUS
    else if (topic === MQTT_CONFIG.topics.status) {
      const el = document.getElementById("status");
      if (el) el.innerText = data;
      addLog("Status: " + data);
    }

    // RAIN
    else if (topic === MQTT_CONFIG.topics.rain) {
      const el = document.getElementById("rain");
      if (el) el.innerText = data;
      addLog("Rain: " + data);
    }
  });

  // =========================
  // DISCONNECT
  // =========================
  client.on("close", () => {
    setMQTTStatus("disconnected");
    addLog("MQTT Disconnected");
  });

  // =========================
  // ERROR HANDLER
  // =========================
  client.on("error", (err) => {
    console.error("MQTT Error:", err);
    setMQTTStatus("disconnected");
  });
}
