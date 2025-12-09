import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkewGHjJBSycfv978FxdcE_jC1bhLOw0k",
  authDomain: "portofolio-904242.firebaseapp.com",
  projectId: "portofolio-904242",
  storageBucket: "portofolio-904242.firebasestorage.app",
  messagingSenderId: "1998686651",
  appId: "1:1998686651:web:f63a38dfd4622e0239dc9e",
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };