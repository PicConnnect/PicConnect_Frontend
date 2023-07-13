import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6vRLOnoMHmVJlz7xqh3XV01J2PP4wuBM",
  authDomain: "ttp-capstone-social-media.firebaseapp.com",
  projectId: "ttp-capstone-social-media",
  storageBucket: "ttp-capstone-social-media.appspot.com",
  messagingSenderId: "95747587283",
  appId: "1:95747587283:web:1f9f2ec97412749d2b6826",
  measurementId: "G-FJSP2Y5T1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);