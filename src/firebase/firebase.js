import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
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

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signInWithFacebook = () => {
    const facebookProvider = new FacebookAuthProvider();

  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // IdP data available using getAdditionalUserInfo(result)
      // ...
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

      // ...
    });
};
export const signUpWithEmail = async (email, password, displayName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (user) {
    await updateProfile(user, { displayName });
    await sendEmailVerification(user);
  }
};

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
