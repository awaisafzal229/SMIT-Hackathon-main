// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig =  {
    apiKey: "AIzaSyCdEMXzkE8oH6oks3gNMj_hJN_FUAyVetE",
    authDomain: "studentsapp-hackathone.firebaseapp.com",
    projectId: "studentsapp-hackathone",
    storageBucket: "studentsapp-hackathone.appspot.com",
    messagingSenderId: "678919720684",
    appId: "1:678919720684:web:3180397ce1e0ad13b11fc9",
    measurementId: "G-RGHNZGSXS5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
