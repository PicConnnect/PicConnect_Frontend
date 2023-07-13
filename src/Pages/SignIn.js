import { signInWithGoogle, signInWithFacebook } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (signInMethod) => {
    try {
      await signInMethod(); //try to sign in with google
      navigate("/profile"); // If sign in is successful, navigate to the profile page
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };
  return (
    <div className="bg-[#EAE6DE] h-screen">
      <h1 className="text-4xl p-5">Login</h1>
      <div className="flex justify-center">
        <form className="flex flex-col w-1/2">

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
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full h-10"
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 mt-10 bg-black text-white"
          >
            Sign In
          </button>

          <button onClick={() => handleSignIn(signInWithGoogle)}>
            Sign in with Google
          </button>
          <br></br>
          <button onClick={() => handleSignIn(signInWithFacebook)}>
            Sign in with Facebook
          </button>

          <span className="italic">
            By continuing you agree to the{" "}
            <a href="#" className="underline">
              Terms of Services
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              {" "}
              Privacy
            </a>
          </span>
        </form>
      </div>
    </div>
  );
}
