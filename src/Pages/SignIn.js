import { signInWithGoogle, signInWithFacebook, signInWithEmail } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import React, { useState } from "react";
import Footer from "../components/Footer";
import Input from "../components/Input";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //function to handle form submission (Email, Password)
  const handleSignIn = async (event) => {
    //prevent default behavior of automatically refreshing page
    event.preventDefault();
    try {
      await signInWithEmail(email, password, dispatch);
      navigate("/Profile");
    } catch (error) {
      // console.error("Error signing in", error);
      setErrorMessage(error);

      // Display this error in UI later
    }
  };
  //function to handle sign in with google or facebook
  const handleSignInWithProvider = async (signInMethod) => {
    try {
      await signInMethod(dispatch); //try to sign in with google
      navigate("/Profile"); // If sign in is successful, navigate to the profile page
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };
  return (
    <div className=" h-screen">
      <h1 className="text-4xl p-5">Login</h1>
      <div className="flex justify-center">
        <form onSubmit={handleSignIn} className="flex flex-col w-1/2">
          <div className="w-full pt-6">
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              label="Email Address"
            />

            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              label="Password"
            />
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button
            type="submit"
            className="w-full h-10 mt-10 bg-black text-white"
          >
            Sign In
          </button>

          <button
            onClick={() => handleSignInWithProvider(signInWithGoogle)}
            className="w-full h-10 mt-10 bg-black text-white"
          >
            Sign in with Google
          </button>

          <button
            onClick={() => handleSignInWithProvider(signInWithFacebook)}
            className="w-full h-10 mt-5 bg-black text-white"
          >
            Sign in with Facebook
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}