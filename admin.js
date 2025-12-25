import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy }
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const tableBody = document.getElementById("tableBody");
const filterSelect = document.getElementById("filterGroup");

let allDonors = [];
let filteredDonors = [];

// Convert Firestore timestamp to readable
function formatTime(ts) {
  if (!ts) return "";
  const date = ts.toDate();
  return date.toLocaleString();
}

// Fetch data
const q = query(collection(db, "donors"), orderBy("time", "desc"));
const snapshot = await getDocs(q);

snapshot.forEach(doc => {
  const d = doc.data();
  allDonors.push({
    name: d.name,
    phone: d.phone,
    gender: d.gender,
    bloodGroup: d.bloodGroup,
    time: formatTime(d.time)
  });
});

filteredDonors = [...allDonors];
renderTable(filteredDonors);

// Render table
function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach(d => {
    tableBody.innerHTML += `
      <tr>
        <td>${d.name}</td>
        <td>${d.phone}</td>
        <td>${d.gender}</td>
        <td>${d.bloodGroup}</td>
        <td>${d.time}</td>
      </tr>
    `;
  });
}

// Apply filter
window.applyFilter = () => {
  const selected = filterSelect.value;

  if (selected === "ALL") {
    filteredDonors = [...allDonors];
  } else {
    filteredDonors = allDonors.filter(d => d.bloodGroup === selected);
  }

  renderTable(filteredDonors);
};

// Download filtered Excel
window.downloadExcel = () => {
  if (filteredDonors.length === 0) {
    alert("No data to download");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(filteredDonors);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Donors");
  XLSX.writeFile(wb, "Blood_Donation_List.xlsx");
};
