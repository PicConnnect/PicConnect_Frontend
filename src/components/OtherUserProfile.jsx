import React from "react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/UploadCard.css";
// import UsersPhoto from "./UsersPhoto";
// import SavedPhotos from "./SavedPhotos";
// import ProfilePhoto from "./ProfileComponents/ProfilePhoto";
// import BadgeComponent from "./ProfileComponents/BadgeComponent";
import AboutComponent from "./OtherProfileComponents/AboutComponent";

const OtherUserProfile = ( userId ) => {
  const navigate = useNavigate();

  console.log("in jsx")

  return (
    <div className="profileContainer">
      <div>
        <AboutComponent userId = {userId}></AboutComponent>
        {/* <BadgeComponent></BadgeComponent> */}
      </div>

      <div className="rightContainer">
        <div>
          {/* <UsersPhoto userId={userId}></UsersPhoto> 
            <SavedPhotos></SavedPhotos>  */}
        </div>
      </div>
    </div>
  );
};
export default OtherUserProfile;
