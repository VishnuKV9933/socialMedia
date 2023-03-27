// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7OFDJvJngwOgg-Ymz1n9J9V10bUKfrGA",
  authDomain: "socilalmedia.firebaseapp.com",
  projectId: "socilalmedia",
  storageBucket: "socilalmedia.appspot.com",
  messagingSenderId: "290661099521",
  appId: "1:290661099521:web:e2e18cb3eca70e21a2f800",
  measurementId: "G-N3BF4X1BC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app)
// const analytics = getAnalytics(app);