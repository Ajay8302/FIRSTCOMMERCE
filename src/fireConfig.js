
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw97sDWJeyO-ZeR59TGAWkFF8KOAQRYHg",
  authDomain: "firstcommerce-c4f01.firebaseapp.com",
  projectId: "firstcommerce-c4f01",
  storageBucket: "firstcommerce-c4f01.appspot.com",
  messagingSenderId: "1047230534904",
  appId: "1:1047230534904:web:ebbf2764d03f3ca4e6970d",
  measurementId: "G-1ZZDNLKBM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;


