import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import "../styles/UploadCard.css";
import UsersPhoto from "./UsersPhoto";
import SavedPhotos from "./SavedPhotos";
import ProfilePhoto from "./ProfileComponents/ProfilePhoto";
import BadgeComponent from "./ProfileComponents/BadgeComponent";
import AboutComponent from "./ProfileComponents/AboutComponent";
import SignOutButtonComponent from "./ProfileComponents/SignOutButtonComponent";

const UserProfile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }
    /*
    <div className="rightContainer">
                <UsersPhoto></UsersPhoto>
                <SavedPhotos></SavedPhotos>
            </div>
    */

    return (
        <div>
            <div className="w-1/2 ml-4">
                <ProfilePhoto></ProfilePhoto>
                <BadgeComponent></BadgeComponent>
                <AboutComponent></AboutComponent>
                <SignOutButtonComponent handleLogout={handleLogout}></SignOutButtonComponent>
            </div>
            
        </div >
    );
};
export default UserProfile;
