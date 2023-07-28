import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSinglePost } from "../redux/postSlice";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated";
import TomTomMap from "./TomTomMap";

let socket = null;

const SingleView = ({ postcard, userId, postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.currentPost); // this depends on where the fetched post data is stored in your state
  console.log(post);
  const likesCount = post ? post.likesCount : 0;
  console.log(likesCount);
  console.log("in another page pc", postcard);
  console.log("author name", postcard.user?.about);
  console.log("total", postcard.tags?.length);

  const url = postcard.urls;
  const allTags = [];
  if (postcard.tags && postcard.tags.length > 0) {
    postcard.tags.map((eachTag) => {
      allTags.push(eachTag.tag_name);
    });
  }
  const lat = postcard.location?.latitude;
  const lng = postcard.location?.longitude;
  

  console.log("This is all tags", allTags);

  //const socket = io("${process.env.REACT_APP_BACKEND_URL}", { withCredentials: true });
  const [comments, setComments] = useState([]); //state to hold comments
  const [currentComment, setCurrentComment] = useState(""); // state to hold current comment input

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [postId, dispatch]);

  useEffect(() => {
    if (socket == null) {
      //uncommented this if statement
      socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
        withCredentials: true,
      });
    }
    return () => {
      console.log("Disconnecting socket...");
      socket.disconnect(); //removed the existing line here
      socket = null; //added this line
    };
  }, []);

  useEffect(() => {
    if (socket) {
      console.log(`Post ID: ${postId}`);
      console.log("Connecting socket...");
      //join the room when component mounts
      socket.emit("joinRoom", postId); // currentId should be the id of the current photo

      socket.off("newComment"); //remove existing event listener before creating a new one

      //event listener for incoming comments
      socket.on("newComment", (newComment) => {
        console.log(`New comment received: ${newComment}`);
        setComments((oldComments) => [...oldComments, newComment]);
      });

      //event listener for existing comments
      socket.on("existingComments", (existingComments) => {
        console.log(`Existing comments received: `, existingComments);
        setComments(existingComments);
      });
    }

    // return () => {
    //   console.log("Disconnecting socket...");
    //   socket.off('newComment'); // Remove the event listener
    //   socket.disconnect(); // Disconnect the socket
    // }
  }, [postId]);

  const RedirectMessage = useIfNotAuthenticated("SingleView");
  if (RedirectMessage) {
    return RedirectMessage;
  }

  //navigate to home page
  const handleBackClick = () => {
    navigate(`/`);
  };

  // function to handle new comment submission
  const handleNewComment = (event) => {
    event.preventDefault();
    const newCommentData = {
      roomId: postId,
      comment: currentComment,
      userId: userId,
    };
    socket.emit("newComment", newCommentData);
    console.log(`New comment submitted: ${JSON.stringify(newCommentData)}`);
    setCurrentComment(""); // clear the input field
  };

  const handleCommentChange = (event) => {
    setCurrentComment(event.target.value);
  };

  const handleTagClick = (tag) => {
    console.log("Clicked this ", tag);
  };

  return (
    <center>
      <div>
        <div className="singleCard" style={{ width: "50rem" }}>
          <img
            className="singleImage mb-4 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"
            src={url}
            // className="card-img-top"
            alt="..."
          />
          <div className="card-body font-metrophobic text-lg">
            <div className="singleViewBody">
              <p className="leftCentered">Author: {postcard.user?.name}</p>

              <p className="leftCentered">
                {allTags.map((tag, index) => (
                  <a href="#" onClick={() => handleTagClick(tag)}>
                    #{tag}{" "}
                  </a>
                ))}
              </p>
              <p className="leftCentered">{postcard.description}</p>
              <p className="leftCentered">
                Camera: {postcard.camera_detail?.make}{" "}
                {postcard.camera_detail?.model} <br />
                Focal length: {postcard.camera_detail?.focal_length}mm
                <br />
                Aperture: {postcard.camera_detail?.aperture}
                <br />
                Exposure: {postcard.camera_detail?.exposure_time}s<br />
                ISO: {postcard.camera_detail?.iso}
                <br />
              </p>

              <p className="leftCentered">Location - {postcard.location?.location_name} in {postcard.location?.city}</p>
              <div>
                {lat && lng ? <TomTomMap lat = {lat} lng = {lng}/> : <p className="leftCentered">Map data unavailable</p>}
                
              </div>
              <p className="leftCentered">Likes: {post.likesCount}</p>
              <form onSubmit={handleNewComment}>
                <input
                  type="text"
                  value={currentComment}
                  onChange={handleCommentChange}
                  placeholder="Add a comment..."
                />
                <button type="submit">Post</button>
              </form>
              <div className="commentBox">
                <h2 className="leftCentered">Comments</h2>
                {comments.map((comment, index) => (
                  <p key={index}>{comment.commentText}</p>
                ))}
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
