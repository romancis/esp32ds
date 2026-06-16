// =========================
// FIRESTORE IMPORT
// =========================

import { db } from "./firebase.js";

import {
doc,
setDoc,
getDocs,
deleteDoc,
collection
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

const uidInput =
document.getElementById(
"uidInput"
);

const namaInput =
document.getElementById(
"namaInput"
);

const saveBtn =
document.getElementById(
"saveBtn"
);

const deleteBtn =
document.getElementById(
"deleteBtn"
);

const info =
document.getElementById(
"setnameInfo"
);

const tableBody =
document.getElementById(
"rfidTableBody"
);

// =========================
// ROLE CHECK
// =========================

function isAdmin(){

```
return (
    localStorage.getItem(
        "romancis_role"
    ) === "admin"
);
```

}

// =========================
// MQTT UID LISTENER
// =========================

client.on(
"message",
(topic,message)=>{

```
    if(
        topic ===
        MQTT_TOPICS.uid
    ){

        const uid =
        message.toString();

        if(uidInput){

            uidInput.value =
            uid;

        }

        if(info){

            info.innerHTML =
            "📡 UID RFID diterima";

        }

    }

}
```

);

// =========================
// LOAD RFID DATA
// =========================

async function loadRFID(){

```
if(!tableBody) return;

tableBody.innerHTML = "";

try{

    const snapshot =
    await getDocs(
        collection(
            db,
            "rfid"
        )
    );

    if(snapshot.empty){

        tableBody.innerHTML =

        `
        <tr>
            <td colspan="3">
                Belum ada data RFID
            </td>
        </tr>
        `;

        return;

    }

    snapshot.forEach(docSnap=>{

        const data =
        docSnap.data();

        const tr =
        document.createElement(
            "tr"
        );

        tr.innerHTML =

        `
        <td>
            ${docSnap.id}
        </td>

        <td>
            ${data.nama || "-"}
        </td>

        <td>

            ${
                isAdmin()

                ?

                `<button
                    onclick="hapusRFID('${docSnap.id}')">
                    Hapus
                </button>`

                :

                `<span>View Only</span>`
            }

        </td>
        `;

        tableBody.appendChild(
            tr
        );

    });

}
catch(error){

    console.error(error);

    if(info){

        info.innerHTML =
        "❌ Gagal memuat data";

    }

}
```

}

// =========================
// SIMPAN RFID
// =========================

async function simpanRFID(){

```
if(!isAdmin()){

    alert(
        "Hanya Admin yang dapat menyimpan data RFID"
    );

    return;

}

const uid =
uidInput?.value.trim();

const nama =
namaInput?.value.trim();

if(!uid){

    info.innerHTML =
    "UID kosong";

    return;

}

if(!nama){

    info.innerHTML =
    "Nama kosong";

    return;

}

try{

    await setDoc(

        doc(
            db,
            "rfid",
            uid
        ),

        {

            uid: uid,

            nama: nama,

            timestamp:
            new Date()
            .toLocaleString()

        }

    );

    info.innerHTML =
    "✅ Data berhasil disimpan";

    uidInput.value = "";
    namaInput.value = "";

    loadRFID();

}
catch(error){

    console.error(error);

    info.innerHTML =
    "❌ Gagal menyimpan";

}
```

}

// =========================
// HAPUS RFID
// =========================

window.hapusRFID =
async function(uid){

```
if(!isAdmin()){

    alert(
        "Hanya Admin yang dapat menghapus data"
    );

    return;

}

const konfirmasi =
confirm(
    "Hapus data RFID?"
);

if(!konfirmasi){

    return;

}

try{

    await deleteDoc(

        doc(
            db,
            "rfid",
            uid
        )

    );

    info.innerHTML =
    "🗑️ Data berhasil dihapus";

    loadRFID();

}
catch(error){

    console.error(error);

    info.innerHTML =
    "❌ Gagal menghapus";

}
```

};

// =========================
// CLEAR FORM
// =========================

function clearForm(){

```
if(uidInput){

    uidInput.value = "";

}

if(namaInput){

    namaInput.value = "";

}

if(info){

    info.innerHTML =
    "Form dibersihkan";

}
```

}

// =========================
// BUTTON EVENT
// =========================

if(saveBtn){

```
saveBtn.addEventListener(
    "click",
    simpanRFID
);
```

}

if(deleteBtn){

```
deleteBtn.addEventListener(
    "click",
    clearForm
);
```

}

// =========================
// LOCK VIEWER / GUEST
// =========================

document.addEventListener(
"DOMContentLoaded",
()=>{

```
    if(!isAdmin()){

        if(namaInput){

            namaInput.disabled =
            true;

        }

        if(saveBtn){

            saveBtn.disabled =
            true;

            saveBtn.innerHTML =
            "🔒 Hanya Admin";

        }

    }

    loadRFID();

}
```

);

// =========================
// READY
// =========================

console.log(
"🏷️ SetName Ready"
);
