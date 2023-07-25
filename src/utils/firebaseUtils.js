import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setFileUploadProgress, setIsUploading, setUploadStatus } from "../redux/uploadSlice";
import store from "../store";

export const uploadToStorage = (file) => {
  return new Promise((resolve, reject) => {
    // reference to the file in firebase storage
    const storageRef = ref(storage, "images/" + file.name);

    // start uploading the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // monitor upload task
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        store.dispatch(setIsUploading(true));
        // log upload progress as a percentage
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        store.dispatch(setFileUploadProgress(Math.floor(progress)));
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
        store.dispatch(setUploadStatus("Failure: "+error.message));
        reject(error);
      },
      () => {
        //hide progress bar
        store.dispatch(setIsUploading(false));
        store.dispatch(setUploadStatus('success'));
        // Use the download URL to save to database or use in application
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};
  
