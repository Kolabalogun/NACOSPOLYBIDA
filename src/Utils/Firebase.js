// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkchpoVFji7bvvtgNVn6MtyqgUqc8C_xg",
  authDomain: "nacospolybida.firebaseapp.com",
  projectId: "nacospolybida",
  storageBucket: "nacospolybida.appspot.com",
  messagingSenderId: "712129161689",
  appId: "1:712129161689:web:e2a994eb9dcb2cf3f9d1c8",
  measurementId: "G-6M66CXDC7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
