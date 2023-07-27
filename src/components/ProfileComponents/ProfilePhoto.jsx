import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { uploadToStorage } from "../../utils/firebaseUtils";

export default function ProfilePhoto() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [initialImage, setInitialImage] = useState(imageUrl);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch user's profile picture when the component is mounted
    const fetchProfilePic = async () => {
      console.log("Current User ID: ", auth.currentUser?.uid);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/${auth.currentUser?.uid}`
      );
      const user = await response.json();
      setImageUrl(user.profilePicUrl);
      setInitialImage(user.profilePicUrl);
    };
    fetchProfilePic();
  }, []);

  const makeImageEditable = () => {
    setInitialImage(imageUrl);
    setIsEditingImage(true);
  };

  const saveImage = async () => {
    setIsEditingImage(false);

    if (selectedFile) {
      // Upload the image to Firebase Storage and get the URL
      const downloadURL = await uploadToStorage(
        selectedFile,
        "profile-pictures"
      );
      console.log("File available at", downloadURL);

      // Call backend API to save image URL
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/profile-picture`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: auth.currentUser?.uid,
            profilePicUrl: downloadURL,
          }),
        }
      );

      if (!response.ok) {
        console.error("Couldn't save profile picture to database");
      } else {
        // Update the image URL in the state
        setImageUrl(downloadURL);
      }
    }
  };

  const handleFileChange = (event) => {
    // first file in the list
    const file = event.target.files[0];
    setSelectedFile(file); // Store the selected file

    // if file selected,
    if (file) {
      const reader = new FileReader();
      // when FileReader finishes reading the file data, this will be executed
      reader.onload = function (e) {
        // data url representing the file's data
        setImageUrl(e.target.result);
      };
      // can use this as a source in an img tag to preview the picture
      reader.readAsDataURL(file);
    }
  };

  const cancelImageEdit = () => {
    setIsEditingImage(false);
    setImageUrl(initialImage);
  };

  const handleFollowingClick = () => {
    navigate(`/Following/${auth.currentUser?.uid}`); // add variable userId
  };

  const handleFollowerClick = () => {
    navigate(`/Follower/${auth.currentUser?.uid}`); // add variable userId
  };

  return (
    <div className="userProfileContainer">
      <div>
        {isEditingImage ? (
          <div>
            <div className="userProfileImageContainer">
              <img src={imageUrl} alt="User" style={{ marginTop: "15px" }} />
            </div>
            <div className="imageInput" style={{ paddingTop: "15px" }}>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
        ) : (
          <div className="userProfileImageContainer">
            <img src={imageUrl} alt="User" style={{ paddingTop: "15px" }} />
          </div>
        )}
        {isEditingImage ? (
          <div>
            <button className="editButton" onClick={saveImage}>
              Save
            </button>
            <button className="editButton" onClick={cancelImageEdit}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="editButton" onClick={makeImageEditable}>
            Edit
          </button>
        )}
      </div>
      <br></br>
      <div>
        <p>First Last</p>
        <p>Rating</p>
        <button
          className="followFollowingButton"
          onClick={handleFollowingClick}
          style={{ flex: "1", marginRight: "100px" }}
        >
          Following
        </button>
        <button
          className="followFollowingButton"
          onClick={handleFollowerClick}
          style={{ flex: "2", marginLeft: "100px" }}
        >
          Followers
        </button>
      </div>
    </div>
  );
}
