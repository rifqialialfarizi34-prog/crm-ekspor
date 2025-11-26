// src/firebase.js

// 1. Kita import 'getFirestore' untuk database
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 2. COPY bagian "firebaseConfig" dari layar browser Anda, dan PASTE di sini
// (Gantikan kode di bawah ini dengan yang ada di gambar Anda tadi)
const firebaseConfig = {
  apiKey: "AIzaSyCrG7oJCwv_...", // <-- Paste punya Anda di sini
  authDomain: "ekspor-dbrau.firebaseapp.com",
  projectId: "ekspor-dbrau",
  storageBucket: "ekspor-dbrau.firebasestorage.app",
  messagingSenderId: "925800648834",
  appId: "1:925800648834:web:5d03b3e16280c156e2249b",
  measurementId: "G-9J75PFZLHM"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. Initialize Database & Export (Agar bisa dipakai di App.jsx)
export const db = getFirestore(app);