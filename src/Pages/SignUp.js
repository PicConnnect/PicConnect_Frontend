import "./../index.css";
import React, { useState } from "react";
export default function SignUp() {
  //states that stores the user data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");

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
  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform sign-up logic here (e.g., send data to server)

    // Reset the form
    setName("");
    setEmail("");
    setPassword("");
    setPasswordVerification("");
  };
  return (
    <div className="bg-[#EAE6DE] h-screen">
      <h1 className="text-4xl p-5">Register User</h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
          <div className="w-full">
            <label for="name" className="block text-left font-bold">
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
            <label for="email" className="block text-left font-bold">
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
            <label for="password" className="block text-left font-bold">
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
              for="passwordVerification"
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
