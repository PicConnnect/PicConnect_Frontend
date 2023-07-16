import React from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ url }) => {
  const navigate = useNavigate();

  //allows to navigate to single
  const handleViewClick = () => {
    navigate(`/viewPost/`); //add variable postID
  };

  return (
    <center>
      <div>
        <div className="card" style={{ width: "25rem" }}>
          <div
            className="cardButton"
            onClick={() => {
              handleViewClick();
            }}
          >
            <img
              className="mainImage"
              src={url}
              // className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p>Photo Title</p>
              {/* <p className="leftCentered">#Tags</p> */}
            </div>
          </div>
        </div>
      </div>
    </center>
  );
};

export default PostCard;
