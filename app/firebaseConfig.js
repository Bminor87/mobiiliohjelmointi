// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-qtn30uBlKX-Yk8i5g9_O6C8hlAFI0u0",
  authDomain: "shoppinglist-bminor.firebaseapp.com",
  databaseURL: "https://shoppinglist-bminor-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "shoppinglist-bminor",
  storageBucket: "shoppinglist-bminor.firebasestorage.app",
  messagingSenderId: "1016092413470",
  appId: "1:1016092413470:web:4d890dc77604a6f2b7a80f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);