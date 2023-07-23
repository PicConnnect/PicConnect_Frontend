import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ url, size, title, postId, removeButton, likeButton }) => {
  const navigate = useNavigate();

  const initialLikeStatus = () => {
    //get the current like status from local storage
    const savedLikeStatus = JSON.parse(localStorage.getItem(`likeStatus-${postId}`));
    //returns if saved liked status is in localstorage (true) or false otherwise
    return savedLikeStatus || false;
  }
  const [isLiked, setIsLiked] = useState(initialLikeStatus); 
  let width = 25; //width
  let height = 250; //height

  if (size === "small") {
    width = width / 2;
    height = height / 2;
  }
  //triggered when the like button is clicked
  const toggleLike = () => {
    //opposite of the current value 
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    //save this current status to localstorage
    localStorage.setItem(`likeStatus-${postId}`, JSON.stringify(newLikeStatus));
  };

  // const toggleLikeFalse = () => {
  //   setIsLiked(false);
  // };

  // const toggleLikeTrue = () => {
  //   setIsLiked(true);
  // };

  //allows to navigate to single
  const handleViewClick = () => {
    navigate(`/photos/${postId}`); //add variable postID
  };
  const handleViewClick2 = () => {
    navigate(`/`); //add variable postID
  };

  //runs every time the "isLiked" state of the "postId" prop changes
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
            <button className="overlay-button" onClick={handleViewClick2}>
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
