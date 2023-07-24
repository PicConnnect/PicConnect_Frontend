import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../redux/postSlice";
import FormInput from "./FormInput";
import "../styles/UploadCard.css";
import { auth } from "../firebase/firebase";
import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const PostCard = ({
  url,
  size,
  title,
  postId,
  removeButton,
  likeButton,
  userLikedPhotos,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //const userId = useSelector((state) => state.user.value.uid);

  const initialLikeStatus = () => {
    //get the current like status from local storage
    const savedLikeStatus = JSON.parse(
      localStorage.getItem(`likeStatus-${postId}`)
    );
    //returns if saved liked status is in localstorage (true) or false otherwise
    return savedLikeStatus || false;
  };
  const [isLiked, setIsLiked] = useState(initialLikeStatus);

  let width = 25; //width
  let height = 250; //height

  if (size === "small") {
    width = width / 2;
    height = height / 2;
  }

  const userRef = useRef();
  userRef.current = useSelector((state) => state.user.value);

  //triggered when the like button is clicked
  const toggleLike = () => {
    console.log("Testing like");

    const userId = userRef.current.uid;

    //opposite of the current value
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);

    //save this current status to localstorage
    localStorage.setItem(`likeStatus-${postId}`, JSON.stringify(newLikeStatus));

    if (newLikeStatus) {
      dispatch(likePost({ postId: postId, userId: userId }));
    } else {
      dispatch(unlikePost({ postId: postId, userId: userId }));
    }
    if(removeButton){
      window.location.reload();
    }
  };

  // allows to navigate to single
  const handleViewClick = () => {
    navigate(`/photos/${postId}`); //add variable postID
  };

  const handleRemovePhoto = async () => {
    try {
      // Show a confirmation alert to the user
      const isConfirmed = window.confirm("Press Ok to continue with deletion of selected photo?");

      if (isConfirmed) {
        const response = await axios.delete(
          `http://localhost:8000/api/photos/${postId}`
        );

        window.location.reload();


        console.log("Photo deleted:", response.data);

      } else {
        // If the user cancels, do nothing or show a message
        console.log("Delete action canceled by user.");
      }

    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  // runs every time the "isLiked" state of the "postId" prop changes
  useEffect(() => {
    // When isLiked state changes, save it to localStorage
    localStorage.setItem(`likeStatus-${postId}`, JSON.stringify(isLiked));
  }, [isLiked, postId]);

  return (
    <center>
      <div>
        <div
          className="card"
          style={{ width: `${width}rem`, position: "relative" }}
        >
          <div
            className="cardButton"
            onClick={() => {
              handleViewClick();
            }}
          >
            <img
              className="mainImage"
              style={{ height: `${height}px` }}
              src={url}
              // className="card-img-top"
              alt="Thumbnail"
            />

            <div className="card-body">
              <p>{title}</p>
              {/* <button onClick={handleViewClick2} >X</button> */}
              {/* <p className="leftCentered">#Tags</p> */}
            </div>
          </div>
          {removeButton && (
            <button className="overlay-button" onClick={userLikedPhotos ? toggleLike : handleRemovePhoto}>
              X
            </button>
          )}
          {likeButton &&
            (isLiked ? (
              <button className="likeButton" onClick={toggleLike}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="black"
                >
                  <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
                </svg>{" "}
              </button>
            ) : (
              <button className="likeButton" onClick={toggleLike}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" />
                </svg>
              </button>
            ))}
        </div>
      </div>
    </center>
  );
};

export default PostCard;
