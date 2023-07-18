import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6vRLOnoMHmVJlz7xqh3XV01J2PP4wuBM",
  authDomain: "ttp-capstone-social-media.firebaseapp.com",
  projectId: "ttp-capstone-social-media",
  storageBucket: "ttp-capstone-social-media.appspot.com",
  messagingSenderId: "95747587283",
  appId: "1:95747587283:web:1f9f2ec97412749d2b6826",
  measurementId: "G-FJSP2Y5T1F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
//const facebookProvider = new FacebookAuthProvider();

export const sendTokenToBackend = async (idToken) => {
  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + idToken,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      //get the user token right after auth
      const token = await auth.currentUser.getIdToken(true);
      sendTokenToBackend(token);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signInWithFacebook = () => {
  const facebookProvider = new FacebookAuthProvider();

  signInWithPopup(auth, facebookProvider)
    .then(async (result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);

      const token = await user.getIdToken(true);
      sendTokenToBackend(token);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
};
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(user, { displayName });
    await sendEmailVerification(user);
    const token = await user.getIdToken(true);
    sendTokenToBackend(token);
  } catch (error) {
    console.error("Error signing up:", error);
  }
};
export const signInWithEmail = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    
    const token = await user.getIdToken(true);
    sendTokenToBackend(token);
  } catch (error) {
    console.error("Error:", error);
  }
};
