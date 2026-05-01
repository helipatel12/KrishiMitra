import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "krishimitra-98690.firebasestorage.app",
  messagingSenderId: "729256592342",
  appId: "1:729256592342:web:015be377a9d158f9b5da77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth (IMPORTANT)
export const auth = getAuth(app);