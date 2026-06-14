// =========================
// FIREBASE CONFIG
// =========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Konfigurasi Firebase project kamu
const firebaseConfig = {
  apiKey: "AIzaSyAcYGCGQcwaFuXxd7R4Oq-hJRgaBRYuRPM",
  authDomain: "romancis--smarthome.firebaseapp.com",
  projectId: "romancis--smarthome",
  storageBucket: "romancis--smarthome.firebasestorage.app",
  messagingSenderId: "542536848118",
  appId: "1:542536848118:web:059f833254c14880ff92d7",
  measurementId: "G-QLK7DPFCXD"
};

// =========================
// INIT FIREBASE APP
// =========================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Debug
console.log("Firebase Connected");

// =========================
// EXPORT
// =========================
export { db };

export const MQTT_CONFIG = {
  broker: "wss://broker.hivemq.com:8884/mqtt",
  topics: {
    uid: "romancis/rfid/uid",
    status: "romancis/rfid/status",
    rain: "romancis/sensor/rain"
  }
};
