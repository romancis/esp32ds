// =========================
// FIRESTORE IMPORT
// =========================

import {

    db

} from "./firebase.js";

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
// LOAD DATA
// =========================

async function loadRFID(){

    if(!tableBody) return;

    tableBody.innerHTML = "";

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
                Belum ada data
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
            ${data.nama}
        </td>

        <td>

            <button
            onclick="hapusRFID('${docSnap.id}')">

            Hapus

            </button>

        </td>
        `;

        tableBody.appendChild(
            tr
        );

    });

}

// =========================
// SIMPAN
// =========================

async function simpanRFID(){

    const uid =
    uidInput.value.trim();

    const nama =
    namaInput.value.trim();

    if(uid === ""){

        info.innerHTML =
        "UID kosong";

        return;

    }

    if(nama === ""){

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

                nama:

                nama,

                timestamp:

                new Date()
                .toLocaleString()

            }

        );

        info.innerHTML =
        "Data berhasil disimpan";

        uidInput.value = "";
        namaInput.value = "";

        loadRFID();

    }

    catch(error){

        console.error(
            error
        );

        info.innerHTML =
        "Gagal menyimpan";

    }

}

// =========================
// HAPUS
// =========================

window.hapusRFID =
async function(uid){

    if(

        !confirm(
            "Hapus data RFID?"
        )

    ){

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
        "Data dihapus";

        loadRFID();

    }

    catch(error){

        console.error(
            error
        );

        info.innerHTML =
        "Gagal menghapus";

    }

};

// =========================
// BUTTON EVENT
// =========================

if(saveBtn){

    saveBtn.addEventListener(

        "click",

        simpanRFID

    );

}

if(deleteBtn){

    deleteBtn.addEventListener(

        "click",

        ()=>{

            uidInput.value = "";
            namaInput.value = "";

            info.innerHTML =
            "Form dibersihkan";

        }

    );

}

// =========================
// AUTO LOAD
// =========================

loadRFID();