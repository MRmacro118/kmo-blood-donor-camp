import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import { getFirestore } from 
"https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdxcV8VKCVzL-Ck-8vdo3MSTWpfUlKlKM",
  authDomain: "blood-donation-57d38.firebaseapp.com",
  projectId: "blood-donation-57d38",
  storageBucket: "blood-donation-57d38.firebasestorage.app",
  messagingSenderId: "535911228408",
  appId: "1:535911228408:web:799c079e9384189808ac0d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
