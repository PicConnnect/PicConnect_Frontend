import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchSinglePost } from "../redux/postSlice";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated"

let socket = null;

const SingleView = ({ url, title, author, Tags, description, cameraDetails, userId, postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector(state => state.posts.currentPost); // this depends on where the fetched post data is stored in your state
  console.log(post);
  const likesCount = post ? post.likesCount : 0;
  console.log(likesCount)


  
  //const socket = io("http://localhost:8000", { withCredentials: true });
  const [comments, setComments] = useState([]); //state to hold comments
  const [currentComment, setCurrentComment] = useState(""); // state to hold current comment input

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [postId, dispatch]);



  useEffect(() => {
    if (socket == null) {
      //uncommented this if statement
      socket = io("http://localhost:8000", { withCredentials: true });
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

              <p className="leftCentered">Author: {author}</p>

              <p className="leftCentered">#Tags</p>
              <p className="leftCentered">{description}</p>
              <p className="leftCentered">
                Camera Details: filters, settings, etc
              </p>

              <p className="leftCentered">Location - google map api?</p>
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
