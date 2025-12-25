import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp }
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

document.getElementById("donorForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const gender = document.getElementById("gender").value;
  const bloodGroup = document.getElementById("bloodGroup").value;

  if (!/^\d{10}$/.test(phone)) {
    alert("Enter valid 10-digit phone number");
    return;
  }

  await addDoc(collection(db, "donors"), {
    name, phone, gender, bloodGroup,
    time: serverTimestamp()
  });

  document.getElementById("successMsg").innerText = "Registered Successfully!";
  e.target.reset();
});
