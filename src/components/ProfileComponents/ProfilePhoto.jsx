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

  const [textColorPhotos, setTextColorPhotos] = useState('text-gray-400'); // set initial color to greyish
  const [textColorLikes, setTextColorLikes] = useState('text-gray-400'); // set initial color to greyish
  const handleColorChangePhotos = () => {
    setTextColorPhotos('text-black'); // change color to black on click
  };

  const handleColorChangeLikes = () => {
    setTextColorLikes('text-black'); // change color to black on click
  };

  return (
    <div className="userProfileContainer">
      <div>
        {isEditingImage ? (
          <div>
            <div className="w-48 h-48 overflow-hidden rounded-full mx-auto">
              <img
                src={imageUrl}
                alt="User"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="pt-6 flex items-center justify-center">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          </div>
        ) : (
          <div className="relative w-48 h-48 overflow-hidden rounded-full mx-auto">
            <img
              src={imageUrl}
              alt="User"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <button
                onClick={makeImageEditable}
                className="p-2 bg-white bg-opacity-70 rounded-full"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        {isEditingImage ? (
          <div className="pt-6">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={saveImage}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md ml-4"
              onClick={cancelImageEdit}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
      <br></br>
      <div className="flex justify-center space-x-8 pt-6 ml-2">
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
      </div>
      <div className="flex justify-center space-x-8 pt-6 ml-2 border-b border-gray-300">
        <div className="flex items-center space-x-2 cursor-pointer border-b border-gray-300" onClick={handleColorChangePhotos}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span className={textColorPhotos}>Photos</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer border-b border-gray-300" onClick={handleColorChangeLikes}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="black"
          >
            <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
          </svg>
          <span className={textColorLikes}>Likes</span>
        </div>
      </div>
    </div>
  );
}
