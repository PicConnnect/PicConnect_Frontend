import React from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({url, size, title, postId, removeButton}) => {
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
  const handleViewClick2 = () => {
    navigate(`/`); //add variable postID
  };

  return (
    <center>
      <div>
        <div className="card" style={{ width: `${width}rem`,position: "relative" }}>
          <div
            className="cardButton"
            onClick={() => {
              handleViewClick();
            }}
            style={{z_index:"-1"}}

          >
            <img
              className="mainImage" style={{  height: `${height}px`}}
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
          <button class="overlay-button" onClick={handleViewClick2} style={{z_index:"1"}}>X</button>      
          )    
        }

          
        </div>
      </div>
    </center>
  );
};

export default PostCard;
