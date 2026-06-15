// =========================
// FIREBASE IMPORT
// =========================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// =========================
// FIREBASE CONFIG
// =========================

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
// INITIALIZE FIREBASE
// =========================

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

// =========================
// EXPORT
// =========================

export { db };

// =========================
// TEST
// =========================

console.log(
    "🔥 Firebase Connected"
);