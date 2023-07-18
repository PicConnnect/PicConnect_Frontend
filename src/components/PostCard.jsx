import React from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({url, size, title, postId}) => {
  let width = 25; //width
  let height = 250; //height
  if(size === "small"){
    width = width/2;
    height = height/2;
  }
  const navigate = useNavigate();

  //allows to navigate to single
  const handleViewClick = () => {
    navigate(`/photos/${postId}`); //add variable postID
  };

  return (
    <center>
      <div>
        <div className="card" style={{ width: `${width}rem` }}>
          <div
            className="cardButton"
            onClick={() => {
              handleViewClick();
            }}
          >
            <img
              className="mainImage" style={{  height: `${height}px`}}
              src={url}
              // className="card-img-top"
              alt="image not found"
            />
            <div className="card-body">
              <p>{title}</p>
              {/* <p className="leftCentered">#Tags</p> */}
            </div>
          </div>
        </div>
      </div>
    </center>
  );
};

export default PostCard;
