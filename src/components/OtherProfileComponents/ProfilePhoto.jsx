import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { uploadToStorage } from "../../utils/firebaseUtils";
import UsersPhoto from "../UsersPhoto";
import LikedPhotos from "../LikedPhotos";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ProfilePhoto( userId ) {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [userData, setUserData] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("photos"); //initially show user's photos


  useEffect(() => {
    console.log("herein pp userData",userId);
    const fetchProfilePic = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId.userId}`
    );
  
    setImageUrl(response.data.profilePicUrl);
    setUserData(response.data);
    
  };
  
  fetchProfilePic();
  }, []);



  const handleFollowingClick = () => {
    navigate(`/Following/${auth.currentUser?.uid}`); // add variable userId
  };

  const handleFollowerClick = () => {
    navigate(`/Follower/${auth.currentUser?.uid}`); // add variable userId
  };

  const [textColorPhotos, setTextColorPhotos] = useState("text-gray-400"); // set initial color to greyish
  const [textColorLikes, setTextColorLikes] = useState("text-gray-400"); // set initial color to greyish

  const handleColorChangePhotos = () => {
    setTextColorPhotos("text-black"); // change color to black on click
    setTextColorLikes("text-gray-400");
    setActiveTab("photos");
  };

  const handleColorChangeLikes = () => {
    setTextColorLikes("text-black"); // change color to black on click
    setTextColorPhotos("text-gray-400");
    setActiveTab("likes");
  };

  return (
    <div className="userProfileContainer">
      {/* <div className="flex flex-row justify-center"> */}
      <div>
          <div className="relative w-48 h-48 overflow-hidden rounded-full mx-auto">
            <img
              src={imageUrl}
              alt="User"
              className="object-cover w-full h-full"
            />
        
          </div>
        
      </div>
      <br></br>
      <div>
        <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
        <p> {userData.email} </p>
        <p>Birthday: {userData.birthday? userData.birthday : "2023-01-01"}</p>
        <p>Contact: {userData.phoneNumber? userData.phoneNumber : "123-456-7890"}</p>
      </div>
      {/* </div> */}
      {/* <div className="flex justify-center space-x-8 pt-6 ml-2">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm"
          onClick={handleFollowingClick}
        >
          Following
        </button>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm"
          onClick={handleFollowerClick}
        >
          Followers
        </button>
      </div> */}
      <div className="flex justify-center space-x-8 pt-6 ml-2 border-b border-gray-300">
        <div
          className="flex items-center space-x-2 cursor-pointer border-b border-gray-300"
          onClick={handleColorChangePhotos}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span className={textColorPhotos}>Photos</span>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer border-b border-gray-300"
          onClick={handleColorChangeLikes}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span className={textColorLikes}>Likes</span>
        </div>
      </div>
      {activeTab === "photos" ? (
        <UsersPhoto userId={userData.id} />
      ) : (
        <LikedPhotos />
      )}
    </div>
  );
}
