import React from "react";
import { useState } from 'react';

import PostCard from "../components/PostCard";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import ImagePreview from "./ImagePreview";
import "../styles/UploadCard.css";
import UsersPhoto from "./UsersPhoto";
import SavedPhotos from "./SavedPhotos";




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

    const [isEditingImage, setIsEditingImage] = useState(false);

    const makeImageEditable = () => {
        setIsEditingImage(true);
    }

    const saveImage = () => {
        setIsEditingImage(false);
    }

    const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1483909796554-bb0051ab60ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80");

    const handleFileChange = (event) => {
        //first file in the list
        const file = event.target.files[0];
        //if file selected,
        if (file) {
            const reader = new FileReader();
            //when FileReader finishes reading the file data, this will be executed
            reader.onload = function (e) {
                //data url representing the file's data
                setImageUrl(e.target.result);
            };
            //can use this as a source in an img tag to preveiw the picture
            reader.readAsDataURL(file);
        }
    };

    const [isEditing, setIsEditing] = useState(false);
    const [items, setItems] = useState(['First', 'Last', '01/01/2023', 'mail@gmail.com', '(123)-456-7890', 'Ave Street Zip']);

    const makeListEditable = () => {
        setIsEditing(true);
    };

    const saveList = () => {
        setIsEditing(false);
    };

    const handleInputChange = (index, event) => {
        const updatedItems = [...items];
        updatedItems[index] = event.target.value;
        setItems(updatedItems);
    };

    return (
        <div className="flex justify-evenly">
            <div className="leftContainer">
                <div class="userProfileContainer">
                    <div>
                        {isEditingImage ? (
                            <div>
                                <div className="imageInput" style={{paddingTop:"15px"}}>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <img src={imageUrl} alt="User" style={{marginTop: "15px"}}/>
                            </div>

                        ) : (
                            <img src={imageUrl} alt="User" style={{paddingTop: "15px"}}/>
                        )}
                        <button className="editButton" onClick={isEditingImage ? saveImage : makeImageEditable}>
                            {isEditingImage ? 'Save' : 'Edit'}
                        </button>

                    </div>
                    <br></br>
                    {/* here */}

                    <div>
                        <p>Name</p>
                        <p style={{paddingBottom: "15px"}}>Rating</p>
                    </div>
                </div>
                <div class="badgeContainer">
                    <p>Badge System yet to come</p>
                </div>

                <div className="aboutContainer">
                    <h2>About Me</h2>
                    <div className="aboutMeCategories">
                        <p>First Name:</p>
                        <p>Last Name:</p>
                        <p>Birthday:</p>
                        <p>Email:</p>
                        <p>Number:</p>
                        <p>Address:</p>
                    </div>

                    <div>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(event) => handleInputChange(index, event)}
                                        />
                                    ) : (
                                        item
                                    )}
                                </li>
                            ))}
                        </ul>
                        <button className="editButton" onClick={isEditing ? saveList : makeListEditable}>
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>


                </div>

                <div className="signOutContainer">
                    <button className="signOutButton" onClick={handleLogout}>Sign Out</button>
                </div>
            </div>
            <div className="rightContainer">
                <UsersPhoto></UsersPhoto>
                <SavedPhotos></SavedPhotos>
            </div>
        </div >
    );
};
export default UserProfile;
