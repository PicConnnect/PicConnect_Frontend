import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../redux/postSlice";
import { useAuth } from "../hooks/useAuth";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import FormInput from "./FormInput";
import "../styles/UploadCard.css";
import "../styles/PostCard.css";
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
  fetchPhotos
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //useRef to hold the current user value
  const userRef = useRef();
  userRef.current = useSelector((state) => state.user.value);

  // Get the likedPhotoIds from the Redux store
  const likedPhotoIds = useSelector((state) => state.posts.likedPhotoIds);
  // console.log("likedPhotoIds", likedPhotoIds);

  // Use the useAuth hook to get the current user
  const user = useAuth();

  let width = 25; //width
  let height = 250; //height

  if (size === "small") {
    width = width / 2;
    height = height / 2;
  }

  //triggered when the like button is clicked
  const toggleLike = (event) => {
    event.stopPropagation();
    //console.log("Testing like and unlike");

    const userId = userRef.current?.uid? userRef.current?.uid : userRef.current?.id;

    // console.log(`Current isLiked: ${isLiked}`);

    if (likedPhotoIds.includes(postId)) {
      dispatch(unlikePost({ postId: postId, userId: userId }));
    } else {
      dispatch(likePost({ postId: postId, userId: userId }));
    }
  };

  // allows to navigate to single
  const handleViewClick = () => {
    navigate(`/photos/${postId}`); //add variable postID
  };

  const handleRemovePhoto = async (event) => {
    event.stopPropagation();

    try {
      const confirm = window.confirm(
        "Are you sure you want to delete selected post"
      );

      if (confirm) {
        const response = await axios.delete(
          `http://localhost:8000/api/photos/${postId}`
        );
        fetchPhotos();
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  return (
    <div className="card-container grid gap-4">
      <div onClick={handleViewClick} className="card-content">
        <LazyLoadImage
          className="card-img h-auto max-w-full rounded-md "
          src={url}
          effect="blur"
          alt="Thumbnail"
        />
        {removeButton && (
          <button
            className="overlay-button"
            onClick={userLikedPhotos ? toggleLike : handleRemovePhoto}
          >
            X
          </button>
        )}

        {likeButton && user && (
          <div className="like-button-container">
            {likedPhotoIds.includes(postId) ? (
              <button className="p-2" onClick={toggleLike}>
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
              <button className="p-2" onClick={toggleLike}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
