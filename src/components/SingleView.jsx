import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSinglePost } from "../redux/postSlice";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated";
import CommentList from "./Comments/CommentList";
import CommentForm from "./Comments/CommentForm";


let socket = null;

const SingleView = ({ postcard, userId, postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.value);
  const post = useSelector((state) => state.posts.currentPost); // this depends on where the fetched post data is stored in your state
  //console.log(post);
  const likesCount = post ? post.likesCount : 0;
  /*console.log(likesCount);
  console.log("in another page pc", postcard);
  console.log("author name", postcard.user?.about);
  console.log("total", postcard.tags?.length);*/

  const url = postcard.urls;
  const allTags = [];
  if (postcard.tags && postcard.tags.length > 0) {
    postcard.tags.map((eachTag) => {
      allTags.push(eachTag.tag_name);
    });
  }

  //console.log("This is all tags", allTags);

  //const socket = io("${process.env.REACT_APP_BACKEND_URL}", { withCredentials: true });
  const [comments, setComments] = useState([]); //state to hold comments
  const [currentComment, setCurrentComment] = useState(""); // state to hold current comment input
  const [loadingComment, setLoadinComment] = useState(true);
  const [currentReply, setCurrentReply] = useState("");
  const [deletionOccured, setDeletionOccured] = useState(false); 

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
      socket.off("newReply"); //remove existing event listener before creating a new one

      //event listener for incoming comments
      socket.on("newComment", (newComment) => {
        console.log(`New comment received: ${newComment}`);
        setComments((oldComments) => [...oldComments, newComment]);
      });

      //event listener for incoming comments
      socket.on("newReply", (newReply) => {
        console.log(`New reply received: ${newReply}`);
        setComments((oldReply) => [...oldReply, newReply]);
      });

      //event listener for existing comments
      socket.on("existingComments", (existingComments) => {
        setLoadinComment(false);
        console.log(`Existing comments received: `, ...existingComments);
        setComments(existingComments);
      });
      console.log("list ins comme", comments)
    }

    // return () => {
    //   console.log("Disconnecting socket...");
    //   socket.off('newComment'); // Remove the event listener
    //   socket.disconnect(); // Disconnect the socket
    // }
  }, [postId, currentReply, deletionOccured]);

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
    console.log("posted a comment ..", currentComment)
    event.preventDefault();
    const newCommentData = {
      roomId: postId,
      comment: currentComment,
      userId: currentUser?.uid,
    };
    socket.emit("newComment", newCommentData);
    console.log(`New comment submitted: ${JSON.stringify(newCommentData)}`);
    setCurrentComment(""); // clear the input field
  };

  const handleCommentChange = (event) => {
    setCurrentComment(event.target.value);
  };

  // function to handle  deletion of comments
  const handleDeleteComment = (event, commentId) => {
    event.preventDefault();
    socket.emit("deleteComment", commentId);
    setDeletionOccured(prev => !prev);
    console.log(`the comment with id: ${commentId} was deleted`);
  };
  // function to handle  deletion of comments
  const handleDeleteReply = (event, replyId) => {
    event.preventDefault();
    socket.emit("deleteReply", replyId);
    setDeletionOccured(prev => !prev);
    console.log(`the comment with id: ${replyId} was deleted`);
  };

  // function to handle new reply submission
  // function to handle new reply submission
  const handleNewReply = (event, commentId) => {
      event.preventDefault();
      console.log("posted a comment ..", currentReply);
      // Create the newReplyData object with relevant information
      const newReplyData = {
        roomId: commentId,                 // Set the roomId to the commentId
        reply: currentReply,               // Get the reply from the currentReply state variable
        userId: currentUser?.uid,          // Get the userId (if available, using optional chaining)
      };
  
      // Emit the "newReply" event to the socket server with newReplyData
      socket.emit("newReply", newReplyData);
      // Log the submitted reply data for debugging purposes
      console.log(`New reply submitted: ${JSON.stringify(newReplyData)}`);
      // Clear the input field by updating the currentReply state variable
      setCurrentReply("");
  };

  const handleReplyChange = (event) => {
    setCurrentReply(event.target.value);
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
                  <a href="#" onClick={() => handleTagClick(tag)} key={index}>
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

              <p className="leftCentered">Location - google map api?</p>
              <p className="leftCentered">Likes: {post.likesCount}</p>
              <CommentForm handleCommentChange={handleCommentChange} handleNewComment={handleNewComment} currentComment={currentComment} loading={loadingComment}></CommentForm>
              <div className="commentBox" style={{backgroundColor: "white", maxHeight: "500px", overflow: "auto"}}>
                <h2 className="leftCentered" style={{fontWeight: "bold"}}>{loadingComment? "Loading Comments...": "Comments"}</h2>
                <CommentList handleDeleteReply={handleDeleteReply} handleDeleteComment={handleDeleteComment} commentsArray={comments} handleReplyChange={handleReplyChange} handleNewReply={handleNewReply} currentReply={currentReply}></CommentList>
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
