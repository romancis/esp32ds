// =====================================
// MQTT CONFIG
// =====================================
const broker = "wss://broker.hivemq.com:8884/mqtt";
const client = mqtt.connect(broker);

// =====================================
// MQTT TOPIC
// =====================================
const topicUID = "mansaci/rfid/uid";
const topicStatus = "mansaci/rfid/status";
const topicRain = "mansaci/rain";
const topicStat = "mansaci/statistik";
const topicControl = "mansaci/control";
const topicPalang = "mansaci/palang/status";
const topicJemuran = "mansaci/jemuran/status";
const topicKendaraan = "mansaci/kendaraan/status";
const topicESP32 = "mansaci/device/status";

// =====================================
// GOOGLE APPS SCRIPT
// =====================================
const GAS_URL = "https://script.google.com/macros/s/AKfycbyTgVaNcKqR4JOe9iCvETjWG_-Us0ONR0VrdmJSpgq9v5Dr8CsaISk-AEJSXRHPO-Ka/exec";

// =====================================
// DAILY REPORT TIME
// =====================================
const REPORT_HOUR = 23;
const REPORT_MINUTE = 55;
let reportSentToday = false; 

// =====================================
// VISITOR TRACKING
// =====================================
const visitorId = localStorage.getItem("visitorId") || crypto.randomUUID();
localStorage.setItem("visitorId", visitorId);

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if(!lastVisit || now - Number(lastVisit) > 600000){
    localStorage.setItem("lastVisit", now);
    fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" }, 
        body: JSON.stringify({ type: "visitor", visitorId: visitorId })
    })
    .then(res => res.text())
    .then(data => { console.log("Visitor Saved:", data); })
    .catch(err => { console.log("Visitor Error:", err); });
}

// =====================================
// ELEMENT
// =====================================
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("menuBtn");
const showMonitor = document.getElementById("showMonitor");
const showAbout = document.getElementById("showAbout");
const livePage = document.getElementById("livePage");
const aboutPage = document.getElementById("aboutPage");
const themeToggle = document.getElementById("themeToggle");
const toast = document.getElementById("toast");

// =====================================
// TOAST
// =====================================
function showToast(text){
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

// =====================================
// DAILY REPORT
// =====================================
async function sendDailyReport(){
    try {
        await fetch(GAS_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
                tanggal: new Date().toLocaleDateString("id-ID"),
                online: document.getElementById("todayOnline").textContent, // [PERBAIKAN] Ambil data langsung dari UI yang sudah sinkron dengan Sheet
                scan: document.getElementById("scan").textContent,
                allow: document.getElementById("allow").textContent,
                reject: document.getElementById("reject").textContent
            })
        });
        console.log("Laporan terkirim");
    } catch(err) {
        console.log("Laporan gagal:", err);
    }
}

// =====================================
// SIDEBAR CONTROL
// =====================================
function openMenu(){
    sidebar.classList.add("active");
    overlay.classList.add("active");
}

function closeMenu(){
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

menuBtn.addEventListener("click", () => {
    if(sidebar.classList.contains("active")){
        closeMenu();
    } else {
        openMenu();
    }
});

overlay.addEventListener("click", closeMenu);

// =====================================
// PAGE SWITCH
// =====================================
showMonitor.addEventListener("click", () => {
    livePage.style.display = "block";
    aboutPage.style.display = "none";
    closeMenu();
});

showAbout.addEventListener("click", () => {
    livePage.style.display = "none";
    aboutPage.style.display = "block";
    closeMenu();
});

// =====================================
// ADMIN RESET SYSTEM
// =====================================
const resetWebsiteBtn = document.getElementById("resetWebsiteBtn");

if(resetWebsiteBtn) {
    resetWebsiteBtn.addEventListener("click", () => {
        closeMenu();

        // 1. Minta Password
        const pwd = prompt("🔒 Masukkan Password Admin:");

        if (pwd === "romancis123") {
            // 2. Konfirmasi pertama (Reset Lokal)
            const confirmReset = confirm("Password Benar! Yakin ingin mereset sistem website?");
            
            if (confirmReset) {
                // 3. Konfirmasi kedua (Reset Google Sheet)
                // 3. Konfirmasi kedua (Reset Google Sheet)
                const resetSheet = confirm("⚠️ Apakah Anda JUGA ingin mereset angka 'Online Hari Ini' di Google Sheet menjadi 0?\n\n(Aman: Hanya data HARI INI saja yang akan dihapus, riwayat kemarin tetap aman!)");
                
                showToast("Memulai reset sistem...");
                addLog("Sistem direset oleh Admin");

                // Hapus memori lokal browser
                localStorage.clear();
                sessionStorage.clear();

                // Jika Admin memilih "OK" untuk mereset Google Sheet
                if (resetSheet) {
                    showToast("Mereset data server...");
                    fetch(GAS_URL, {
                        method: "POST",
                        headers: { "Content-Type": "text/plain" },
                        body: JSON.stringify({ type: "reset_visitors" })
                    }).then(() => {
                        // Refresh halaman setelah selesai mereset server
                        setTimeout(() => { location.reload(true); }, 2000);
                    }).catch(() => {
                        alert("Gagal mereset server!");
                        setTimeout(() => { location.reload(true); }, 1000);
                    });
                } else {
                    // Jika hanya reset lokal, langsung refresh halaman
                    setTimeout(() => { location.reload(true); }, 1500);
                }
            }
        } else if (pwd !== null) {
            alert("❌ Password Salah! Akses Ditolak.");
        }
    });
}

// =====================================
// THEME INITIALIZATION
// =====================================
const savedTheme = localStorage.getItem("theme");
if(savedTheme === "light"){
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
} else {
    themeToggle.textContent = "🌙";
}

// =====================================
// TOGGLE THEME
// =====================================
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    if(typeof updateChartTheme === "function"){
        updateChartTheme();
    }

    if(document.body.classList.contains("light")){
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌙";
    }
});

// =====================================
// CLOCK FUNCTION
// =====================================
function updateClock(){
    const now = new Date();
    const time = now.toLocaleTimeString("id-ID");
    const date = now.toLocaleDateString("id-ID", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    document.getElementById("clock").textContent = time;
    document.getElementById("date").textContent = date;
}
updateClock();
setInterval(updateClock, 1000);

// =====================================
// MQTT ELEMENTS
// =====================================
const mqttStatus = document.getElementById("mqttStatus");
const deviceStatus = document.getElementById("deviceStatus");
const esp32LastSeen = document.getElementById("esp32LastSeen");
const activityLog = document.getElementById("activityLog");
const todayOnline = document.getElementById("todayOnline");

// =====================================
// ONLINE COUNTER & HEARTBEAT
// =====================================
let lastHeartbeat = Date.now();

// =====================================
// LOG SYSTEM
// =====================================
function addLog(text){
    const now = new Date();
    const jam = now.toLocaleTimeString("id-ID");
    const item = document.createElement("div");
    item.innerHTML = `[${jam}] ${text}`;
    activityLog.prepend(item);

    while(activityLog.children.length > 50){
        activityLog.removeChild(activityLog.lastChild);
    }
}

// =====================================
// MQTT EVENT LISTENERS
// =====================================
client.on("connect", () => {
    mqttStatus.textContent = "🟢 MQTT Connected";
    addLog("MQTT Connected");
    client.subscribe(topicUID);
    client.subscribe(topicStatus);
    client.subscribe(topicRain);
    client.subscribe(topicStat);
    client.subscribe(topicPalang);
    client.subscribe(topicJemuran);
    client.subscribe(topicKendaraan);
    client.subscribe(topicESP32);
    addLog("Subscribe MQTT Selesai");
});

client.on("reconnect", () => {
    mqttStatus.textContent = "🟡 Reconnecting...";
    addLog("MQTT Reconnecting");
});

client.on("offline", () => {
    mqttStatus.textContent = "🔴 MQTT Offline";
    addLog("MQTT Offline");
});

client.on("error", (err) => {
    console.error("MQTT Error:", err);
    mqttStatus.textContent = "🔴 MQTT Error";
});

// =====================================
// HEARTBEAT ESP32
// =====================================
function updateESP32Status(){
    const now = Date.now();
    const diff = now - lastHeartbeat;
    if(diff < 30000){
        deviceStatus.textContent = "🟢 ESP32 Online";
    } else {
        deviceStatus.textContent = "🔴 ESP32 Offline";
    }
}
setInterval(updateESP32Status, 5000);

// =====================================
// LOAD DATA GOOGLE SHEET (REALTIME)
// =====================================
function fetchLiveVisitors() {
    fetch(GAS_URL)
    .then(res => res.json())
    .then(data => {
        console.log("Google Sheet Data:", data);
        const visitorCount = data.visitorToday || 0;
        document.getElementById("todayOnline").textContent = visitorCount;
    })
    .catch(err => { console.log("Gagal memuat data Sheet:", err); });
}

// Jalankan pertama kali saat web dibuka
fetchLiveVisitors();

// Jalankan otomatis setiap 30 detik secara background (Realtime)
setInterval(fetchLiveVisitors, 30000);

// =====================================
// LAST SEEN
// =====================================
function updateLastSeen(){
    const now = new Date();
    espLastSeenEl = document.getElementById("esp32LastSeen");
    if(espLastSeenEl) {
        espLastSeenEl.textContent = "🕒 Last Seen: " + now.toLocaleTimeString("id-ID");
    }
}

// =====================================
// AUTOMATIC REPORTING INTERVAL
// =====================================
setInterval(() => {
    const now = new Date();
    if(now.getHours() === REPORT_HOUR && now.getMinutes() === REPORT_MINUTE && !reportSentToday){
        sendDailyReport();
        reportSentToday = true;
    }
    if(now.getHours() === 0 && now.getMinutes() === 1){
        reportSentToday = false;
    }
}, 60000);

// =====================================
// DATA ELEMENTS
// =====================================
const uidEl = document.getElementById("uid");
const statusEl = document.getElementById("status");
const rainEl = document.getElementById("rain");
const rainStatusEl = document.getElementById("rainStatus");
const allowEl = document.getElementById("allow");
const rejectEl = document.getElementById("reject");
const scanEl = document.getElementById("scan");
const palangStatusEl = document.getElementById("palangStatus");
const jemuranStatusEl = document.getElementById("jemuranStatus");
const kendaraanStatusEl = document.getElementById("kendaraanStatus");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const restartBtn = document.getElementById("restartBtn");

let palangState = "UNKNOWN";
let jemuranState = "UNKNOWN";

// =====================================
// CHART INITIALIZATION
// =====================================
const rainChart = new Chart(document.getElementById("rainChart"), {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Sensor Hujan",
            data: [],
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { ticks: { color: "#ffffff" } },
            y: { ticks: { color: "#ffffff" } }
        }
    }
});

// =====================================
// UPDATE CHART THEME
// =====================================
function updateChartTheme(){
    const light = document.body.classList.contains("light");
    rainChart.data.datasets[0].borderColor = light ? "#2563eb" : "#38bdf8";
    rainChart.data.datasets[0].backgroundColor = light ? "rgba(37,99,235,.10)" : "rgba(56,189,248,.15)";
    rainChart.options.scales.x.ticks.color = light ? "#0f172a" : "#ffffff";
    rainChart.options.scales.y.ticks.color = light ? "#0f172a" : "#ffffff";
    rainChart.update();
}

// =====================================
// MQTT MESSAGE PROCESSING
// =====================================
client.on("message", (topic, message) => {
    message = message.toString();

    if(topic === topicESP32){
        lastHeartbeat = Date.now();
        updateLastSeen();
        deviceStatus.textContent = "🟢 ESP32 Online";
    }

    if(topic === topicUID){
        uidEl.textContent = message;
        addLog("UID Scan : " + message);
    }

    if(topic === topicStatus){
        statusEl.textContent = message;
        addLog("Akses : " + message);
    }

    if(topic === topicRain){
        rainEl.textContent = message;
        const rainValue = parseInt(message);
        let kondisi = "TIDAK HUJAN";
        if(rainValue < 2499){ kondisi = "HUJAN"; }
        rainStatusEl.textContent = kondisi;

        const waktu = new Date().toLocaleTimeString("id-ID");
        rainChart.data.labels.push(waktu);
        rainChart.data.datasets[0].data.push(rainValue);

        if(rainChart.data.labels.length > 15){
            rainChart.data.labels.shift();
            rainChart.data.datasets[0].data.shift();
        }
        rainChart.update();
    }

    if(topic === topicStat){
        const data = message.split(",");
        if(data.length >= 3){
            allowEl.textContent = data[0];
            rejectEl.textContent = data[1];
            scanEl.textContent = data[2];
        }
    }

    if(topic === topicPalang){
        palangState = message;
        if(message === "OPEN"){
            palangStatusEl.textContent = "🟢 TERBUKA";
            addLog("Palang dibuka");
        }
        if(message === "CLOSED"){
            palangStatusEl.textContent = "🔴 TERTUTUP";
            addLog("Palang ditutup");
        }
    }

    if(topic === topicJemuran){
        jemuranState = message;
        if(message === "OPEN"){ jemuranStatusEl.textContent = "🟢 TERBUKA"; }
        if(message === "CLOSED"){ jemuranStatusEl.textContent = "🔴 TERTUTUP"; }
    }

    if(topic === topicKendaraan){
        if(message === "DETECTED"){
            kendaraanStatusEl.textContent = "🚗 TERDETEKSI";
        } else {
            kendaraanStatusEl.textContent = "⭕ TIDAK ADA";
        }
    }
});

// =====================================
// BUTTON ACTION LISTENERS
// =====================================
openBtn.addEventListener("click", () => {
    if(palangState === "OPEN"){
        showToast("Palang sudah terbuka");
        return;
    }
    client.publish(topicControl, "OPEN");
    showToast("Membuka palang...");
    addLog("Perintah buka palang dikirim");
});

closeBtn.addEventListener("click", () => {
    if(palangState === "CLOSED"){
        showToast("Palang sudah tertutup");
        return;
    }
    client.publish(topicControl, "CLOSE");
    showToast("Menutup palang...");
    addLog("Perintah tutup palang dikirim");
});

restartBtn.addEventListener("click", () => {
    if(confirm("Restart ESP32?")){
        client.publish(topicControl, "RESTART");
        showToast("Restart dikirim");
        addLog("Perintah restart ESP32 dikirim");
    }
});

// =====================================
// EXECUTE INITIAL FUNCTION
// =====================================
window.addEventListener("load", () => {
    updateESP32Status();
    updateChartTheme();
    addLog("Dashboard siap digunakan");
});
