import React, { useState } from "react";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated";
import { uploadToStorage } from "../utils/firebaseUtils";
import ImagePreview from "./ImagePreview";
import FormInput from "./FormInput";
import "../styles/UploadCard.css";
import { auth } from "../firebase/firebase";
import axios from "axios";

const UploadCard = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [exifData, setExifData] = useState(null);
  const [photoDetails, setphotoDetails] = useState('');
  const [inputValues, setInputValues] = useState({
    author: "",
    tags: "",
    description: "",
    location: "",
  });

  //check to see if user logged in
  const RedirectMessage = useIfNotAuthenticated("Upload");
  //if not logged in
  if (RedirectMessage) {
    return RedirectMessage;
  }

  const handleFileChange = async (event) => {
    //first file in the list
    const file = event.target.files[0];
    //if file selected,
    if (file) {
      const reader = new FileReader();
      console.log("File was found")
      // When FileReader finishes reading the file data, this will be executed
      reader.onload = async function (e) {
        // Data URL representing the file's data
        setImageUrl(e.target.result);

        // Create FormData and append the file to it
        const formData = new FormData();
        formData.append("photo", file);
        try {
          // Make a POST request with the FormData object
          const response = await axios.post(
            "http://localhost:8000/api/photos/extract-metadata",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          // Assuming the server returns the EXIF data in the response
          setExifData(response.data);
          setphotoDetails(response.data.Make?`Make: ${response.data.Make}, Model: ${response.data.Model}, Exposure Time: ${response.data.ExposureTime}, ISO: ${response.data.ISO}, Focal Length: ${response.data.FocalLength}`: "No metadata found for this photo! Try with another.")
          console.log("this is response on file change",response.data);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
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
  const handlePhotoDetailChange = (event) => {
    setphotoDetails(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //get the file from the form
    const file = event.target.image.files[0];
    if (file) {
      const downloadURL = await uploadToStorage(file, "images");
      console.log("File available at", downloadURL);

      const newPhoto = {
        title: inputValues.author,
        description: inputValues.description,
        location_name: inputValues.location,
        urls: downloadURL,
        downloads: 0, //initial count
        userId: auth.currentUser?.uid, //make sure it's not null
        make: exifData.Make,
        model: exifData.Model,
        exposure_time: eval(exifData.ExposureTime),
        iso: exifData.ISO,
        focal_length: exifData.FocalLength,
        GPSLatitude: exifData.GPSLatitude,
        GPSLongitude: exifData.GPSLongitude,
        GPSAltitude: exifData.GPSAltitude,
        GPSPosition: exifData.GPSPosition,
        tz: exifData.tz,
        aperture: exifData.Aperture
      }

      console.log("Data that was sent",newPhoto);
      const response = await fetch('http://localhost:8000/api/photos/addPhoto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPhoto)
      })

      if (response.ok) {
        const data = await response.json();
        console.log("This is response on success",data);
      } else {
        console.error("Couldn't save photo to database")
      }
    }
  };



  return (
    <center>
      <div className="form-group">
        <form className="form-group" onSubmit={handleSubmit}>
          <center>
            <legend>
              <h3>
                <b>Upload Image</b>
              </h3>
            </legend>
          </center>
          <div className="formInput">
            <div className="imageInput">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <ImagePreview imageUrl={imageUrl} />

          <FormInput
            label="Title"
            name="author"
            value={inputValues.author}
            onChange={handleInputChange}
          />

          <FormInput
            label="Tags"
            name="tags"
            value={inputValues.tags}
            onChange={handleInputChange}
          />

          <FormInput
            label="Description"
            name="description"
            value={inputValues.description}
            onChange={handleInputChange}
          />
          <FormInput
            label="Camera Details"
            name="camera details"
            value={photoDetails}
            onChange={handlePhotoDetailChange}
            readOnly={true}
          />

          <FormInput
            label="Location"
            name="location"
            value={inputValues.location}
            onChange={handleInputChange}
          />

          <div>
            <input className="submitButton" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </center>
  );
};

export default UploadCard;
