import React, { useState, useRef } from "react";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated";
import { uploadToStorage } from "../utils/firebaseUtils";
import ImagePreview from "./ImagePreview";
import FormInput from "./FormInput";
import "../styles/UploadCard.css";
import { auth } from "../firebase/firebase";
import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import heic2any from "heic2any";
import { ProgressBar } from "ms-react-progress-bar";
import "ms-react-progress-bar/dist/ProgressBar.css";
import { useSelector } from "react-redux";
import CustomChooseFileButton from "./CustomChooseFileButton";

const UploadCard = () => {
  const [webpFile, setWebpFile] = useState(null);
  // Get the file upload progress from the Redux store
  const isUploading = useSelector(
    (state) => state.fileUploadProgress.isUploading
  );
  const fileUploadProgress = useSelector(
    (state) => state.fileUploadProgress.progress
  );
  const uploadStatus = useSelector(
    (state) => state.fileUploadProgress.uploadStatus
  );

  //file name for custom upload
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [convertedImage, setConvertedImage] = useState(null);
  const [exifData, setExifData] = useState(null);
  const [photoDetails, setphotoDetails] = useState("");
  const [openNoMetadata, setOpenNoMetadata] = useState(false);
  const [successFileUload, setSuccessFileUpload] = useState(false);
  const [failFileUload, setFailFileUpload] = useState(false);
  const [conversionInProgress, setConversionInProgress] = useState(false);
  const [inputValues, setInputValues] = useState({
    title: "",
    tags: "",
    description: "",
    location: "",
  });

  //toggle modal for no metadata existing in file
  const onOpenModalNoMetadata = () => setOpenNoMetadata(true);
  const onCloseModalNoMetadata = () => setOpenNoMetadata(false);

  //toggle modal for when the file upload is a succes
  const onOpenSuccessFileUpload = () => setSuccessFileUpload(true);
  const onCloseSuccessFileUpload = () => setSuccessFileUpload(false);

  //toggle modal for when the file upload is a failure
  const onOpenFailFileUpload = () => setFailFileUpload(true);
  const onCloseFailFileUpload = () => setFailFileUpload(false);

  //check to see if user logged in
  const RedirectMessage = useIfNotAuthenticated("Upload");
  //if not logged in
  if (RedirectMessage) {
    return RedirectMessage;
  }

  const changeExtensionToWebP = (filename) => {
    const parts = filename.split(".");
    parts.pop(); //remove the current extension
    return `${parts.join(".")}.webp`; //add the webp extension
  }

  const handleFileChange = async (event) => {
    //first file in the list
    const file = event.target.files[0];
    if (!file) return;
    // setFileName(file.name);

    const orignalFileName = file.name;
    const webpFileName = changeExtensionToWebP(orignalFileName);

    // Function to convert an image to WebP
    const convertToWebP = async (imageFile) => {
      const imageUrl = URL.createObjectURL(imageFile);
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageUrl;

        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0);

          canvas.toBlob((blob) => {
            const webpFile = new File([blob], webpFileName, {
              type: "image/webp",
            });
            resolve(webpFile);
          }, "image/webp");
        };

        image.onerror = () => reject(new Error("Conversion failed"));
      });
    };

    let finalFile = file;

    // Handle file conversion from HEIC to JPEG, then to WebP
    if (file.type === "image/heic") {
      try {
        setConversionInProgress(true);
        const jpegData = await heic2any({ blob: file, toType: "image/jpeg" });
        const jpegFile = new File([jpegData], "converted.jpg", {
          type: "image/jpeg",
        });
        finalFile = await convertToWebP(jpegFile);
        setImageUrl(URL.createObjectURL(finalFile));
        setConversionInProgress(false);
        setFileName(webpFileName);
      } catch (error) {
        setConversionInProgress(false);
        console.error("Error converting HEIC to JPEG to WebP:", error);
        return;
      }
    }

    // Handle file conversion from JPEG or PNG to WebP
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/heic"
    ) {
      try {
        setConversionInProgress(true);
        let imageFileToConvert = file; // By default, use the original file for conversion

        // If the file is a HEIC image, convert it to JPEG first
        if (file.type === "image/heic") {
          const jpegData = await heic2any({ blob: file, toType: "image/jpeg" });
          imageFileToConvert = new File([jpegData], webpFileName, {
            type: "image/jpeg",
          });
        }

        const convertedWebPFile = await convertToWebP(imageFileToConvert);
        setWebpFile(convertedWebPFile);
        setImageUrl(URL.createObjectURL(convertedWebPFile));
        setConversionInProgress(false);
        setFileName(webpFileName);
      } catch (error) {
        setConversionInProgress(false);
        console.error("Error converting to WebP:", error);
        return;
      }
    }

    if (file) {
      const reader = new FileReader();
      console.log("File was found");
      // When FileReader finishes reading the file data, this will be executed
      reader.onload = async function (e) {
        // Data URL representing the file's data
        setImageUrl(e.target.result);

        // Create FormData and append the original file to it for metadata extraction
        const formData = new FormData();
        formData.append("photo", file); // Use the original file here
        try {
          // Make a POST request with the FormData object
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/photos/extract-metadata`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          if (!response.data.Make) {
            onOpenModalNoMetadata();
          }
          // Assuming the server returns the EXIF data in the response
          setExifData(response.data);
          setphotoDetails(
            response.data.Make
              ? `Make: ${response.data.Make}, Model: ${response.data.Model}, Exposure Time: ${response.data.ExposureTime}, ISO: ${response.data.ISO}, 
        Focal Length: ${response.data.FocalLength}`
              : "No metadata found for this photo!"
          );
          console.log("this is response on file change", response.data);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };
      // Can use this as a source in an img tag to preview the picture
      reader.readAsDataURL(file); // Read the original file
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

    if (webpFile) {
      let downloadURL;
      try {
        downloadURL = await uploadToStorage(webpFile, "images");
        console.log("File available at", downloadURL);
      } catch (error) {
        console.error("Error uploading webP image:", error);
      }

      const newPhoto = {
        title: inputValues.title ? inputValues.title : "No title",
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
        aperture: exifData.Aperture,
      };

      console.log("Data that was sent", newPhoto);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/photos/addPhoto`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPhoto),
        }
      );

      if (response.ok) {
        const data = await response.json();
        onOpenSuccessFileUpload();
        setTimeout(() => {
          onCloseSuccessFileUpload();
        }, 5000);
        setInputValues({ title: "", tags: "", description: "", location: "" });
        setFileName("");
        setImageUrl("");
        setphotoDetails("");
        console.log("This is response on success", data);
      } else {
        //empty input on succesful upload
        onOpenFailFileUpload(true);
        setTimeout(() => {
          onCloseFailFileUpload(false);
        }, 5000);
        console.error("Couldn't save photo to database");
      }
    }
  };

  //style for progressBar
  const options = {
    height: "30px",
    borderRadius: "20px",
    labelSize: "14px",
    barColor: "#2c43ac",
    containerColor: "#dddddd",
    containerStyle: "border",
    stripeAnimation: true,
    stripeAnimationDuration: "20s",
    type: "striped",
  };

  return (
    <div>
      <Modal
        open={openNoMetadata}
        onClose={onCloseModalNoMetadata}
        classNames={{ modal: "customModal", overlay: "customOverlay" }}
      >
        <h2 className="font-bold">Missing Image Metadata</h2>
        <p>
          Oops! It seems that the photo you tried to upload does not contain any
          metadata. Please make sure the image has valid metadata and try again.
        </p>
      </Modal>
      <Modal
        open={successFileUload}
        onClose={onCloseSuccessFileUpload}
        classNames={{ modal: "customModal", overlay: "customOverlay" }}
      >
        <center>
          <div style={{ width: "10%" }}>
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 50 50"
              xmlSpace="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_iconCarrier">
                {" "}
                <circle
                  style={{ fill: "#25AE88" }}
                  cx="25"
                  cy="25"
                  r="25"
                />{" "}
                <polyline
                  style={{
                    fill: "none",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 10,
                  }}
                  points="38,15 22,33 12,25"
                />
              </g>
            </svg>
          </div>
          <h2 className="font-bold">Upload Status</h2>
          <p>File upload success</p>
        </center>
      </Modal>
      <Modal
        open={failFileUload}
        onClose={onCloseFailFileUpload}
        classNames={{ modal: "customModal", overlay: "customOverlay" }}
      >
        <center>
          <div style={{ width: "10%" }}>
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 50 50"
              xmlSpace="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_iconCarrier">
                <circle
                  style={{ fill: "#D75A4A" }}
                  cx="25"
                  cy="25"
                  r="25"
                ></circle>
                <polyline
                  style={{
                    fill: "none",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeMiterlimit: 10,
                  }}
                  points="16,34 25,25 34,16 "
                ></polyline>{" "}
                <polyline
                  style={{
                    fill: "none",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeMiterlimit: 10,
                  }}
                  points="16,16 25,25 34,34 "
                ></polyline>
              </g>
            </svg>
          </div>
          <h2 className="font-bold">Upload Status</h2>
          <p>Oooops... Upload failed. Try Again!</p>
          <p>{uploadStatus}</p>
        </center>
      </Modal>

      <div className="form-group font-metrophobic text-lg">
        <form
          className="form-group bg-[#eee] p-12 m-5 rounded-xl inline-block shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ]"
          onSubmit={handleSubmit}
        >
          <center>
            <legend>
              <h3 className="font-merriweather text-3xl pb-3">
                <b>Upload Image</b>
              </h3>
            </legend>
          </center>
          <div className="formInput">
            <div className="imageInput">
              <label htmlFor="upload">
                <CustomChooseFileButton
                  fileName={fileName}
                ></CustomChooseFileButton>
              </label>
              <input
                id="upload"
                type="file"
                name="image"
                accept="image/jpeg, image/png, image/heic, image/webp"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          {conversionInProgress && <p>Converting...</p>}
          <ImagePreview imageUrl={imageUrl} />

          <FormInput
            label="Title"
            name="title"
            value={inputValues.title}
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

          <div style={{ position: "relative" }}>
            <button className="submitButton" type="submit" value="Submit">
              Submit
            </button>
            {exifData?.Make === undefined || imageUrl === "" ? (
              <div
                style={{
                  position: "absolute",
                  top: "0%",
                  left: "0%",
                  zIndex: 2,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            ) : (
              <div></div>
            )}
          </div>
        </form>
        <div className="mt-6">
          {isUploading ? (
            <div>
              <p>File Uploading...</p>
              <ProgressBar
                value={fileUploadProgress}
                options={options}
              ></ProgressBar>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadCard;
