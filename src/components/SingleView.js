import React from "react";
import { useNavigate } from "react-router-dom";

const SingleView = ({ url }) => {
  const navigate = useNavigate();

  //allows to navigate to singleView Page
  const handleViewClick = () => {
    navigate(`/viewpost/`);
  };
  const handleBackClick = () => {
    navigate(`/`);
  };

  return (
    <center>
      <div>
        <div className="singleCard" style={{ width: "50rem" }}>
          <div
            className=""
            onClick={() => {
              handleViewClick();
            }}
          >
            <img
              className="singleImage"
              src={url}
              // className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p>Photo Title</p>
              <div className="singleViewBody">
                <p className="leftCentered">Author: Unknown</p>

                <p className="leftCentered">#Tags</p>
                <p className="leftCentered">Description</p>
                <p className="leftCentered">
                  Camera Details, filters, settings, etc
                </p>
                <div className="commentBox">
                  <h2 className="leftCentered">Comments</h2>
                  <p>comment 1</p>
                  <p>comment 2</p>
                  <p>comment 3</p>
                </div>
                <p className="leftCentered">Location - google map api?</p>
              </div>
            </div>
          </div>
        </div>
        <button className="backButton" onClick={() => handleBackClick()}>
          Back
        </button>
      </div>
    </center>
  );
};

export default SingleView;
