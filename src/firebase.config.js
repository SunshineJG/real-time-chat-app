// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFLZ3-w0SuMjIgNGJoUCbRnOGXsr55Dsk",
  authDomain: "full-stack-app-practice.firebaseapp.com",
  projectId: "full-stack-app-practice",
  storageBucket: "full-stack-app-practice.appspot.com",
  messagingSenderId: "1049235963648",
  appId: "1:1049235963648:web:59f1a90698f2187dd4fde5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
