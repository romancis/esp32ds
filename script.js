// =====================================
// MQTT CONFIG
// =====================================

const broker =
"wss://broker.hivemq.com:8884/mqtt";

const client =
mqtt.connect(broker);


// =====================================
// MQTT TOPIC
// =====================================

const topicUID =
"mansaci/rfid/uid";

const topicStatus =
"mansaci/rfid/status";

const topicRain =
"mansaci/rain";

const topicStat =
"mansaci/statistik";

const topicControl =
"mansaci/control";

const topicPalang =
"mansaci/palang/status";

const topicJemuran =
"mansaci/jemuran/status";

const topicKendaraan =
"mansaci/kendaraan/status";

const topicESP32 =
"mansaci/device/status";


// =====================================
// ELEMENT
// =====================================

const sidebar =
document.getElementById("sidebar");

const overlay =
document.getElementById("overlay");

const menuBtn =
document.getElementById("menuBtn");

const showMonitor =
document.getElementById("showMonitor");

const showAbout =
document.getElementById("showAbout");

const livePage =
document.getElementById("livePage");

const aboutPage =
document.getElementById("aboutPage");

const themeToggle =
document.getElementById("themeToggle");

const toast =
document.getElementById("toast");


// =====================================
// TOAST
// =====================================

function showToast(text){

toast.textContent =
text;

toast.classList.add(
"show"
);

setTimeout(()=>{

toast.classList.remove(
"show"
);

},3000);

}


// =====================================
// SIDEBAR
// =====================================

function openMenu(){

sidebar.classList.add(
"active"
);

overlay.classList.add(
"active"
);

}

function closeMenu(){

sidebar.classList.remove(
"active"
);

overlay.classList.remove(
"active"
);

}

menuBtn.addEventListener(
"click",
()=>{

if(
sidebar.classList.contains(
"active"
)
){

closeMenu();

}else{

openMenu();

}

}
);

overlay.addEventListener(
"click",
closeMenu
);


// =====================================
// PAGE SWITCH
// =====================================

showMonitor.addEventListener(
"click",
()=>{

livePage.style.display =
"block";

aboutPage.style.display =
"none";

closeMenu();

}
);

showAbout.addEventListener(
"click",
()=>{

livePage.style.display =
"none";

aboutPage.style.display =
"block";

closeMenu();

}
);


// =====================================
// DARK MODE
// =====================================

// =========================
// LOAD THEME
// =========================

const savedTheme =
localStorage.getItem(
"theme"
);
if(
savedTheme === "light"
){
document.body.classList.add(
"light"
);
themeToggle.textContent =
"☀️";
}else{
themeToggle.textContent =
"🌙";
}

// =========================
// TOGGLE THEME
// =========================

themeToggle.addEventListener(
"click",
()=>{
document.body.classList.toggle(
"light"
);
if(
document.body.classList.contains(
"light"
)
){

localStorage.setItem(
"theme",
"light"
);

themeToggle.textContent =
"☀️";

}else{

localStorage.setItem(
"theme",
"dark"
);

themeToggle.textContent =
"🌙";

}

});

// =====================================
// CLOCK
// =====================================

function updateClock(){

const now =
new Date();

const time =
now.toLocaleTimeString(
"id-ID"
);

const date =
now.toLocaleDateString(
"id-ID",
{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
}
);

document.getElementById(
"clock"
).textContent =
time;

document.getElementById(
"date"
).textContent =
date;

}

updateClock();

setInterval(
updateClock,
1000
);

// =====================================
// MQTT STATUS
// =====================================

const mqttStatus =
document.getElementById(
"mqttStatus"
);

const deviceStatus =
document.getElementById(
"deviceStatus"
);

const esp32LastSeen =
document.getElementById(
"esp32LastSeen"
);

const activityLog =
document.getElementById(
"activityLog"
);

const todayOnline =
document.getElementById(
"todayOnline"
);


// =====================================
// ONLINE COUNTER
// =====================================

let onlineCounter = 0;

let lastHeartbeat =
Date.now();


// =====================================
// LOG
// =====================================

function addLog(text){

const now =
new Date();

const jam =
now.toLocaleTimeString(
"id-ID"
);

const item =
document.createElement(
"div"
);

item.innerHTML =
`[${jam}] ${text}`;

activityLog.prepend(
item
);

while(
activityLog.children.length > 50
){

activityLog.removeChild(
activityLog.lastChild
);

}

}


// =====================================
// MQTT CONNECT
// =====================================

client.on(
"connect",
()=>{

mqttStatus.textContent =
"🟢 MQTT Connected";

addLog(
"MQTT Connected"
);

client.subscribe(
topicUID
);

client.subscribe(
topicStatus
);

client.subscribe(
topicRain
);

client.subscribe(
topicStat
);

client.subscribe(
topicPalang
);

client.subscribe(
topicJemuran
);

client.subscribe(
topicKendaraan
);

client.subscribe(
topicESP32
);

}
);


// =====================================
// MQTT RECONNECT
// =====================================

client.on(
"reconnect",
()=>{

mqttStatus.textContent =
"🟡 Reconnecting...";

addLog(
"MQTT Reconnecting"
);

}
);


// =====================================
// MQTT OFFLINE
// =====================================

client.on(
"offline",
()=>{

mqttStatus.textContent =
"🔴 MQTT Offline";

addLog(
"MQTT Offline"
);

}
);


// =====================================
// MQTT ERROR
// =====================================

client.on(
"error",
(err)=>{

console.error(err);

mqttStatus.textContent =
"🔴 MQTT Error";

}
);


// =====================================
// HEARTBEAT ESP32
// =====================================

function updateESP32Status(){

const now =
Date.now();

const diff =
now - lastHeartbeat;

if(diff < 30000){

deviceStatus.textContent =
"🟢 ESP32 Online";

}else{

deviceStatus.textContent =
"🔴 ESP32 Offline";

}

}

setInterval(
updateESP32Status,
5000
);


// =====================================
// ONLINE HARI INI
// =====================================

const storedDate =
localStorage.getItem(
"onlineDate"
);

const today =
new Date()
.toDateString();

if(
storedDate !== today
){

localStorage.setItem(
"onlineDate",
today
);

localStorage.setItem(
"onlineCounter",
"0"
);

}

onlineCounter =
parseInt(
localStorage.getItem(
"onlineCounter"
) || "0"
);

onlineCounter++;

localStorage.setItem(
"onlineCounter",
onlineCounter
);

todayOnline.textContent =
onlineCounter;


// =====================================
// LAST SEEN
// =====================================

function updateLastSeen(){

const now =
new Date();

esp32LastSeen.textContent =
"🕒 Last Seen: " +
now.toLocaleTimeString(
"id-ID"
);

}

// =====================================
// ELEMENT DATA
// =====================================

const uidEl =
document.getElementById(
"uid"
);

const statusEl =
document.getElementById(
"status"
);

const rainEl =
document.getElementById(
"rain"
);

const rainStatusEl =
document.getElementById(
"rainStatus"
);

const allowEl =
document.getElementById(
"allow"
);

const rejectEl =
document.getElementById(
"reject"
);

const scanEl =
document.getElementById(
"scan"
);

const palangStatusEl =
document.getElementById(
"palangStatus"
);

const jemuranStatusEl =
document.getElementById(
"jemuranStatus"
);

const kendaraanStatusEl =
document.getElementById(
"kendaraanStatus"
);

const openBtn =
document.getElementById(
"openBtn"
);

const closeBtn =
document.getElementById(
"closeBtn"
);

const restartBtn =
document.getElementById(
"restartBtn"
);


// =====================================
// STATUS CACHE
// =====================================

let palangState =
"UNKNOWN";

let jemuranState =
"UNKNOWN";


// =====================================
// CHART HUJAN
// =====================================

const rainChart =
new Chart(

document.getElementById(
"rainChart"
),

{
type:"line",

data:{
labels:[],
datasets:[
{
label:"Sensor Hujan",
data:[]
}
]
},

options:{
responsive:true,
maintainAspectRatio:false
}

}

);


// =====================================
// MQTT MESSAGE
// =====================================

client.on(
"message",
(topic,message)=>{

message =
message.toString();


// =====================================
// ESP32 HEARTBEAT
// =====================================

if(
topic === topicESP32
){

lastHeartbeat =
Date.now();

updateLastSeen();

deviceStatus.textContent =
"🟢 ESP32 Online";

}


// =====================================
// RFID UID
// =====================================

if(
topic === topicUID
){

uidEl.textContent =
message;

addLog(
"UID Scan : " +
message
);

}


// =====================================
// RFID STATUS
// =====================================

if(
topic === topicStatus
){

statusEl.textContent =
message;

addLog(
"Akses : " +
message
);

}


// =====================================
// SENSOR HUJAN
// =====================================

if(
topic === topicRain
){

rainEl.textContent =
message;

const rainValue =
parseInt(message);

let kondisi =
"TIDAK HUJAN";

if(
rainValue < 2499
){

kondisi =
"HUJAN";

}

rainStatusEl.textContent =
kondisi;


// ====================
// CHART UPDATE
// ====================

const waktu =
new Date()
.toLocaleTimeString(
"id-ID"
);

rainChart.data.labels.push(
waktu
);

rainChart.data.datasets[0]
.data.push(
rainValue
);

if(
rainChart.data.labels.length
> 15
){

rainChart.data.labels.shift();

rainChart.data.datasets[0]
.data.shift();

}

rainChart.update();

}


// =====================================
// STATISTIK
// =====================================

if(
topic === topicStat
){

const data =
message.split(",");

if(
data.length >= 3
){

allowEl.textContent =
data[0];

rejectEl.textContent =
data[1];

scanEl.textContent =
data[2];

}

}


// =====================================
// PALANG
// =====================================

if(
topic === topicPalang
){

palangState =
message;

if(
message === "OPEN"
){

palangStatusEl.textContent =
"🟢 TERBUKA";

addLog(
"Palang dibuka"
);

}

if(
message === "CLOSED"
){

palangStatusEl.textContent =
"🔴 TERTUTUP";

addLog(
"Palang ditutup"
);

}

}


// =====================================
// JEMURAN
// =====================================

if(
topic === topicJemuran
){

jemuranState =
message;

if(
message === "OPEN"
){

jemuranStatusEl.textContent =
"🟢 TERBUKA";

}

if(
message === "CLOSED"
){

jemuranStatusEl.textContent =
"🔴 TERTUTUP";

}

}


// =====================================
// KENDARAAN
// =====================================

if(
topic === topicKendaraan
){

if(
message === "DETECTED"
){

kendaraanStatusEl.textContent =
"🚗 TERDETEKSI";

}

else{

kendaraanStatusEl.textContent =
"⭕ TIDAK ADA";

}

}

}
);


// =====================================
// OPEN BUTTON
// =====================================

openBtn.addEventListener(
"click",
()=>{

if(
palangState === "OPEN"
){

showToast(
"Palang sudah terbuka"
);

return;

}

client.publish(
topicControl,
"OPEN"
);

showToast(
"Membuka palang..."
);

}
);


// =====================================
// CLOSE BUTTON
// =====================================

closeBtn.addEventListener(
"click",
()=>{

if(
palangState === "CLOSED"
){

showToast(
"Palang sudah tertutup"
);

return;

}

client.publish(
topicControl,
"CLOSE"
);

showToast(
"Menutup palang..."
);

}
);


// =====================================
// RESTART BUTTON
// =====================================

restartBtn.addEventListener(
"click",
()=>{

if(
confirm(
"Restart ESP32?"
)
){

client.publish(
topicControl,
"RESTART"
);

showToast(
"Restart dikirim"
);

}

}
);
