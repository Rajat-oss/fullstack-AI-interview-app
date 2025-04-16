import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCYr6YM_Vn3g-J7GfKnjoVZZS0qGUTWcwI",
  authDomain: "prepwise-6003b.firebaseapp.com",
  projectId: "prepwise-6003b",
  storageBucket: "prepwise-6003b.firebasestorage.app",
  messagingSenderId: "828383779079",
  appId: "1:828383779079:web:f95242208aeb0a29cb4da2",
  measurementId: "G-WX3PR7N22K"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
