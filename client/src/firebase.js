// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "quiz-app-58f71.firebaseapp.com",
  projectId: "quiz-app-58f71",
  storageBucket: "quiz-app-58f71.appspot.com",
  messagingSenderId: "129063520",
  appId: "1:129063520:web:a0e019c0a9344e554c8105"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);