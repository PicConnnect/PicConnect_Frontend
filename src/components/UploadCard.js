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
    //get the file from the form
    const file = event.target.image.files[0];
    if (file) {
      //reference to the file in firebase storage
      const storageRef = ref(storage, "images/" + file.name);
      //start uploading the file
      const uploadTask = uploadBytesResumable(storageRef, file);
      //monitor upload task
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //log upload progress as a percentage
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("Unknown state");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;

            default:
              console.log("Unknown error occured, inspect error.code");
              break;
          }
        },
        () => {
          // Use the download URL to save to database or use in application
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        }
      );
    }
  };

  return (
    <center>
      <div className="form-group">
        <form
          className="form-group"
          style={{
            backgroundColor: "#f8f8f8",
            display: "inline-block",
            padding: "1rem 2rem",
            borderRadius: "10px",
            margin: "5px",
            borderColor: "#ddd",
            borderWidth: "1px",
            borderStyle: "solid",
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
            <label htmlFor="uploadImage">Upload Image</label>
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
                style={{
                  borderColor: "#d8d8d8",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  padding: "5px",
                }}
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
                style={{
                  borderColor: "#d8d8d8",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  padding: "5px",
                }}
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
                style={{
                  borderColor: "#d8d8d8",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  padding: "5px",
                }}
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
                style={{
                  borderColor: "#d8d8d8",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  padding: "5px",
                }}
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
                style={{
                  borderColor: "#d8d8d8",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  padding: "5px",
                }}
                type="text"
                name="location"
                value={inputValues.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <input
              className="submitButton"
              style={{
                backgroundColor: "#f6f6f6",
                borderColor: "#d8d8d8",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "5px",
                padding: "5px",
                cursor: "pointer",
                width: "100px",
                height: "30px",
          
              }}
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </center>
  );
};

export default UploadCard;
