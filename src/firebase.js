// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCESffTCmcVBr1cfeZqzGdUtjOh_nmDUA4",
  authDomain: "react-firebase-login-eebdd.firebaseapp.com",
  projectId: "react-firebase-login-eebdd",
  storageBucket: "react-firebase-login-eebdd.appspot.com",
  messagingSenderId: "202368902356",
  appId: "1:202368902356:web:9ca8be61f177389a044741"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) //Permite crear y autenticar usuarios