import React from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({url, size, title, postId}) => {
  let wid = 25; //width
  let hei = 250; //height
  if(size === "small"){
    wid = wid/2;
    hei = hei/2;
  }
  const navigate = useNavigate();

  //allows to navigate to single
  const handleViewClick = () => {
    navigate(`/viewPost/${postId}`); //add variable postID
  };

  return (
    <center>
      <div>
        <div className="card" style={{ width: `${wid}rem` }}>
          <div
            className="cardButton"
            onClick={() => {
              handleViewClick();
            }}
          >
            <img
              className="mainImage" style={{  height: `${hei}px`}}
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
