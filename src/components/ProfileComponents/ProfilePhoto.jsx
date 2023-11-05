import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { uploadToStorage } from "../../utils/firebaseUtils";
import UsersPhoto from "../UsersPhoto";
import LikedPhotos from "../LikedPhotos";
import { useSelector, useDispatch } from "react-redux";
import { updateUserNameInBackend, fetchUser } from "../../redux/userSlice";

export default function ProfilePhoto({ removeButton, userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [initialImage, setInitialImage] = useState(imageUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("photos"); //initially show user's photos
  const items = useSelector((state) => state.user.items);

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
    dispatch(fetchUser());
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
      // console.log("File available at", downloadURL);

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

  const [info, setInfo] = useState([items[0], items[1], items[2], items[3]]);

  const [itemsName, setItemsName] = useState([
    "Name",
    "Birthday",
    "Email",
    "Number",
  ]);
  const [inputPatterns, setInputPatterns] = useState([
    "[A-Za-zs]+",
    "\\d{4}-\\d{2}-\\d{2}",
    "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}",
    "[0-9]{3}-[0-9]{3}-[0-9]{4}",
  ]);

  const [patternString, setPatternStrings] = useState([
    "Xxx+",
    "YYYY-MM-DD",
    "xxxxxx@xmail.com",
    "XXX-XXX-XXXX",
  ]);

  const [initialItems, setInitialItems] = useState([...info]);

  const [inputType, setInputType] = useState([
    // "name",
    "name",
    "date",
    "email",
    "tel",
  ]);

  const handleInputChange = (index, event) => {
    const updatedItems = [...items];
    updatedItems[index] = event.target.value;
    // console.log("This is printing the changes : ", updatedItems[index], updatedItems)
    setInfo(updatedItems);
    // console.log("this is new info: ", info);
  };

  const makeListEditable = (e) => {
    e.preventDefault();
    setInitialItems([...info]);
    setIsEditing(true);
    setInfo([...items])
  };

  const cancelEdit = () => {
    setInfo([...initialItems]);
    setIsEditing(false);
  };
  const saveList = (e) => {
    e.preventDefault();
    // Perform validation on the input values
    const isValid = info.every((item, index) => {
      const pattern = new RegExp(inputPatterns[index]);
      // console.log("pattern",pattern.test(item));
      return pattern.test(item);
    });
    console.log("Info on submit: ", info, isValid);
    if (isValid) {
      setIsEditing(false);
      // If the name has changed, update it in the backend

      // If current user doesn't exist, then abort action
      if (!auth.currentUser) {
        return;
      }

      console.log("authUser: ", auth.currentUser);
      const updatedUserInfo = {
        name: info[0],
        phoneNumber: info[3],
        birthday: info[1],
        email: info[2],
      };

      const result = dispatch(
        updateUserNameInBackend({
          ...updatedUserInfo,
          id: auth.currentUser.uid,
        })
      );
      console.log("pattern", result);
    } else {
      // Show an error message or handle invalid inputs
      console.log("Invalid inputs");
    }
  };

  return (
    <div className="userProfileContainer p-4">
      {/* <div className="flex flex-row justify-center"> */}
      <div>
        {isEditingImage ? (
          <div>
            <div className="w-48 h-48 overflow-hidden rounded-full mx-auto">
              <img
                src={imageUrl}
                alt="User"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="pt-6 flex items-center justify-center">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
                style={{ paddingLeft: "42vw", paddingRight: "30vw" }}
              />
            </div>
          </div>
        ) : (
          <div className="relative w-48 h-48 overflow-hidden rounded-full mx-auto">
            <img
              src={imageUrl}
              alt="User"
              className="object-cover w-full h-full"
              loading="lazy"
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
      <div>
        <div
          className="relative mx-auto"
          style={{ width: "500px", borderRadius: "5%" }}
        >
          <h2 className="text-2xl font-bold ">{items[0]}</h2>
          {/* <p> {items[2]} </p>
          <p>Birthday: {items[1]}</p>
          <p>Contact: {items[3]}</p>
          <br></br> <br></br> */}
          <form>
            {isEditing
              ? info.map((item, index) => (
                  <div
                    key={index}
                    className="flex"
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                      marginTop: isEditing ? "10px" : "0",
                    }}
                  >
                    <label htmlFor={itemsName[index]}>
                      {itemsName[index]}:
                    </label>
                    <input
                      className="line"
                      type={inputType[index]}
                      name={itemsName[index]}
                      value={item}
                      onChange={(event) => handleInputChange(index, event)}
                      pattern={inputPatterns[index]}
                      required
                      onInvalid={(event) => {
                        event.target.setCustomValidity(
                          `Please follow the format ${patternString[index]}`
                        );
                      }}
                      onInput={(event) => {
                        event.target.setCustomValidity("");
                      }}
                    />
                  </div>
                ))
              : items.slice(1, items.length).map((item, index) => (
                  <div
                    key={index}
                    className="flex"
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                      marginBottom: isEditing ? "2px" : "0",
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}
            {isEditing ? (
              <div className="pt-6">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                  onClick={saveList}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md ml-4"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div
                style={{ borderRadius: "1%" }}
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out"
              >
                <button
                  onClick={makeListEditable}
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
            )}
          </form>
        </div>
      </div>
      {/* </div> */}
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
        <UsersPhoto
          userId={auth.currentUser?.uid}
          removeButton={removeButton}
        />
      ) : (
        <LikedPhotos userId={auth.currentUser?.uid}/>
      )}
    </div>
  );
}
