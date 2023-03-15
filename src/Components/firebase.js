// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from 'firebase/auth'
import {getStorage} from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZVg7h1INFZjTXKpeJ3FtnaS9svSPIxvw",
  authDomain: "chat-c8b0d.firebaseapp.com",
  projectId: "chat-c8b0d",
  storageBucket: "chat-c8b0d.appspot.com",
  messagingSenderId: "867456873883",
  appId: "1:867456873883:web:9f4cc0e09193ea7272dd3e",
  measurementId: "G-BELE1W29NG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth() 
export const storage = getStorage()
export const db = getFirestore()