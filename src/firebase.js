import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkewGHjJBSycfv978FxdcE_jC1bhLOw0k",
  authDomain: "portofolio-904242.firebaseapp.com",
  projectId: "portofolio-904242",
  storageBucket: "portofolio-904242.firebasestorage.app",
  messagingSenderId: "1998686651",
  appId: "1:1998686651:web:f63a38dfd4622e0239dc9e",
  measurementId: "G-PMRFD3M87M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };