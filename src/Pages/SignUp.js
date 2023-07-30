import "./../index.css";
import React, { useState } from "react";
import {
  signUpWithEmail,
  signInWithGoogle,
  signInWithFacebook,
} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Input from "../components/Input";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //states that stores the user data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

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

    try {
      const { user } = await signUpWithEmail(email, password, name, dispatch);
      await user.sendEmailVerification();
      //DOOOO: Show message to user to check their email for verification
      //ALSO DECIDE ON WHERE TO NAVIGATE USER

      // Reset the form only if sign up is successful
      setName("");
      setEmail("");
      setPassword("");
      setPasswordVerification("");
      navigate("/Profile");
    } catch (error) {
      console.error("Error signing up", error);
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
          ): <p></p>}
          <button
            type="submit"
            className="w-full h-10 mt-10 bg-black text-white"
          >
            Sign Up
          </button>
          <span className="italic">
            By continuing you agree to the{" "}
            <a href="" className="underline">
              Terms of Services
            </a>{" "}
            and{" "}
            <a href="" className="underline">
              {" "}
              Privacy
            </a>
          </span>
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
