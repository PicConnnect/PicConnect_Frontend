import "./../index.css";
import React, { useState } from "react";
import { auth, signUpWithEmail } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  //states that stores the user data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");

  const navigate = useNavigate();

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
      console.log("The passwords do not match");
      //dispaly the error in UI later
      return; //terminate early if password doesn't match
    }

    try {
      await signUpWithEmail(email, password);
      navigate("/profile");

      // Reset the form only if sign up is successful
      setName("");
      setEmail("");
      setPassword("");
      setPasswordVerification("");
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
          <div className="w-full">
            <label htmlFor="name" className="block text-left font-bold">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
              className="w-full h-10"
            />
          </div>

          <div className="w-full pt-6">
            <label htmlFor="email" className="block text-left font-bold">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full h-10"
            />
          </div>

          <div className="w-full pt-6">
            <label htmlFor="password" className="block text-left font-bold">
              Create Your Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full h-10"
            />
          </div>
          <div className="w-full pt-6">
            <label
              htmlFor="passwordVerification"
              className="block text-left font-bold"
            >
              Confirm Your Password
            </label>
            <input
              type="password"
              value={passwordVerification}
              onChange={handlePasswordVerificationChange}
              required
              className="w-full h-10"
            />
          </div>
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
        </form>
      </div>
    </div>
  );
}
