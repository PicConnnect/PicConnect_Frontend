import React, { useState } from "react";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated";
import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const UploadCard = ({ url }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [inputValues, setInputValues] = useState({
    author: "",
    tags: "",
    description: "",
    photoDetails: "",
    location: "",
  });

  //check to see if user logged in
  const RedirectMessage = useIfNotAuthenticated();
  //if not logged in
  if (RedirectMessage) {
    return RedirectMessage;
  }

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const file = event.target.image.files[0];
    if (file) {
        const storageRef = ref(storage, 'images/' + file.name)

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            //Maybe add a percentage bar here later 
        }, (error) => {
            console.log(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                // You can use the download URL to save to your database or use in your application
                // Consider updating the UI here to provide feedback that the upload is complete
              });
        }
        )
    }
  };

  return (
    <center>
      <div className="form-group">
        <form
          className="form-group"
          style={{
            backgroundColor: "#C8DDD3",
            display: "inline-block",
            padding: "1rem 2rem",
            borderRadius: "10px",
            margin: "5px",
          }}
          onSubmit={handleSubmit}
        >
          <center>
            <legend>
              <h3>
                <b>Upload Registration</b>
              </h3>
            </legend>
          </center>
            <div className="formInput">
              <label htmlFor="">Upload Image</label>
              <div className="imageInput">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>

          <div className="image-preview">
            {imageUrl && (
              <img
                src={imageUrl}
                style={{
                  paddingTop: "5px",
                  maxWidth: "700px",
                  maxHeight: "700px",
                }}
                alt="Preview"
              />
            )}
          </div>

          <div className="formInput">
            <label>Author</label>
            <div>
              <input
                type="text"
                name="author"
                value={inputValues.author}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="formInput">
            <label>Tags</label>
            <div>
              <input
                type="text"
                name="tags"
                value={inputValues.tags}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="formInput">
            <label>Description</label>
            <div>
              <input
                type="text"
                name="description"
                value={inputValues.description}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="formInput">
            <label>Camera Details:</label>
            <div>
              <input
                type="text"
                name="photoDetails"
                value={inputValues.photoDetails}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label>Location</label>
            <div>
              <input
                type="text"
                name="location"
                value={inputValues.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <input className="submitButton" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </center>
  );
};

export default UploadCard;
