import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/UploadCard.css";
import AboutComponent from "./ProfileComponents/AboutComponent";
import SignOutButtonComponent from "./ProfileComponents/SignOutButtonComponent";

const UserProfile = () => {
  const navigate = useNavigate();
  const userId = auth.currentUser.uid;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <AboutComponent removeButton={true}></AboutComponent>
    </div>
  );
};
export default UserProfile;
