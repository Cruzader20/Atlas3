// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from 'firebase/database';

//import firebase from 'firebase/app';
import 'firebase/database';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwdteTcX9A5TU0P5WiGjet9GXActX1HTg",
  authDomain: "atlas-dae0b.firebaseapp.com",
  databaseURL: "https://atlas-dae0b-default-rtdb.firebaseio.com",
  projectId: "atlas-dae0b",
  storageBucket: "atlas-dae0b.appspot.com",
  messagingSenderId: "330675182330",
  appId: "1:330675182330:web:465724fc1a806421cd8743",
  measurementId: "G-92M9GYR0TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

export { database };
//const analytics = getAnalytics(app);