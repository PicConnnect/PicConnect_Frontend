import React from "react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/UploadCard.css";
import UsersPhoto from "./UsersPhoto";
import SavedPhotos from "./SavedPhotos";
import ProfilePhoto from "./ProfileComponents/ProfilePhoto";
import BadgeComponent from "./ProfileComponents/BadgeComponent";
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
    <div className="profileContainer">
      <div className="leftContainer">
        <AboutComponent></AboutComponent>
        <BadgeComponent></BadgeComponent>
        <SignOutButtonComponent
          handleLogout={handleLogout}
        ></SignOutButtonComponent>
      </div>
      
      <div className="rightContainer">
        <div>
          <UsersPhoto userId={userId}></UsersPhoto>
          <SavedPhotos></SavedPhotos>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
