import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadToStorage = (file) => {
  // reference to the file in firebase storage
  const storageRef = ref(storage, "images/" + file.name);
  // start uploading the file
  const uploadTask = uploadBytesResumable(storageRef, file);

  // monitor upload task
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      //log upload progress as a percentage
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
};
