import React, { useState } from "react";

export default function ProfilePhoto() {
  const [imageUrl, setImageUrl] = useState(
    "https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg"
  );

  const [initialImage, setInitialImage] = useState(imageUrl);
  const [isEditingImage, setIsEditingImage] = useState(false);

  const makeImageEditable = () => {
    setInitialImage(imageUrl);
    setIsEditingImage(true);
  };

  const saveImage = () => {
    setIsEditingImage(false);
  };

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

  const cancelImageEdit = () => {
    setIsEditingImage(false);
    setImageUrl(initialImage);
  };
  return (
    <div class="userProfileContainer">
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
        <p>Name</p>
        <p style={{ paddingBottom: "15px" }}>Rating</p>
      </div>
    </div>
  );
}
