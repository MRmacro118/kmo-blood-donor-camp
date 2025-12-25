import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

let allDonors = [];
let currentView = [];

/* ---------- Load Data ---------- */
async function loadDonors() {
  const q = query(collection(db, "donors"), orderBy("time", "desc"));
  const snapshot = await getDocs(q);

  allDonors = snapshot.docs.map(doc => {
    const d = doc.data();
    return {
      name: d.name,
      phone: d.phone,
      gender: d.gender,
      bloodGroup: d.bloodGroup,
      time: d.time ? d.time.toDate().toLocaleString() : ""
    };
  });

  currentView = [...allDonors];
  renderTable(currentView);
}

/* ---------- Render Table ---------- */
function renderTable(data) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No data found</td></tr>`;
    return;
  }

  data.forEach(d => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${d.name}</td>
      <td>${d.phone}</td>
      <td>${d.gender}</td>
      <td>${d.bloodGroup}</td>
      <td>${d.time}</td>
    `;
    tbody.appendChild(row);
  });
}

/* ---------- Filter ---------- */
window.applyFilter = function () {
  const selected = document.getElementById("filter").value;

  if (selected === "ALL") {
    currentView = [...allDonors];
  } else {
    currentView = allDonors.filter(d => d.bloodGroup === selected);
  }

  renderTable(currentView);
};

/* ---------- Download Excel ---------- */
window.downloadExcel = function () {
  if (currentView.length === 0) {
    alert("No data to download");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(currentView);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Donors");

  XLSX.writeFile(wb, "blood_donors.xlsx");
};

/* ---------- Init ---------- */
loadDonors();
