import "./../index.css";
import React, { useState, useEffect } from "react";
import {
  signUpWithEmail,
  signInWithGoogle,
  signInWithFacebook,
} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Input from "../components/Input";
import { auth } from "../firebase/firebase";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //states that stores the user data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const[errorMessage, setErrorMessage] = useState(false);
  const user = useSelector((state) => state.user.value);

  if (user.id) {
    navigate.push("/Profile");
  }
  // console.log(auth && auth.currentUser && auth.currentUser.uid);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordVerificationChange = (event) => {
    setPasswordVerification(event.target.value);
  };
  //when sign button is click call this function
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordVerification) {
      setPasswordMismatch(true);
      console.log("The passwords do not match");
      //dispaly the error in UI later
      return; //terminate early if password doesn't match
    } else {
      setPasswordMismatch(false);
    }

    if (password.length < 6) {
      setErrorMessage(true);
      console.error("Password should be at least 6 characters long");
      // Here you can set some state variable to show this error on the UI
      return; //terminate early if password is too short
    } else {
      setErrorMessage(false);
    }

    try {
      await signUpWithEmail(email, password, name, dispatch);
      // Reset the form only if sign up is successful
      setName("");
      setEmail("");
      setPassword("");
      setPasswordVerification("");
      navigate("/Profile");
    } catch (error) {
      console.log(setErrorMessage)
      //Display this error in UI later
    }
  };
  return (
    <div className="bg-[#EAE6DE] h-screen">
      <h1 className="text-4xl p-5">Register User</h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
          <Input
            type="text"
            value={name}
            onChange={handleNameChange}
            label="Full Name"
          />

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
            label="Create Your Password"
          />

          <Input
            type="password"
            value={passwordVerification}
            onChange={handlePasswordVerificationChange}
            label="Confirm Your Password"
          />
          {passwordMismatch ? (
            <p style={{ color: "red" }}>PASSWORDS DO NOT MATCH</p>
          ) : (
            <p></p>
          )}
          {errorMessage ? (
            <p style={{ color: "red" }}>Password should be at least 6 characters long</p>
          ) : (
            <p></p>
          ) }
          <button
            type="submit"
            className="w-full h-10 mt-10 bg-black text-white"
          >
            Sign Up
          </button>
          <button
            onClick={() => signInWithGoogle()}
            className="w-full h-10 mt-10 bg-black text-white"
          >
            Continue with Google
          </button>

          <button
            onClick={() => signInWithFacebook()}
            className="w-full h-10 mt-10 bg-black text-white"
          >
            Continue with Facebook
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
