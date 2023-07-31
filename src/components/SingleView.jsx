import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSinglePost } from "../redux/postSlice";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated";
import TomTomMap from "./TomTomMap";
import CommentList from "./Comments/CommentList";
import CommentForm from "./Comments/CommentForm";

let socket = null;

const SingleView = ({ postcard, userId, postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loop, setLoop] = useState(0);
  const slides = useRef([]);
  const slideSayisi = slides.current.length;
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
  const lat = postcard.location?.latitude;
  const lng = postcard.location?.longitude;

  //const socket = io("${process.env.REACT_APP_BACKEND_URL}", { withCredentials: true });
  const [comments, setComments] = useState([]); //state to hold comments
  const [currentComment, setCurrentComment] = useState(""); // state to hold current comment input
  const [loadingComment, setLoadinComment] = useState(true);
  const [currentReply, setCurrentReply] = useState("");
  const [deletionOccured, setDeletionOccured] = useState(false);
  const [parentCommentAdded, setparentCommentAdded] = useState(false);

  useEffect(() => {
    slides.current.forEach((slide, index) => {
      slide.style.transform = `translateX(${
        100 * (index - (loop % slideSayisi))
      }%)`;
    });
  }, [loop, slideSayisi]);
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
      console.log("list ins comme", comments);
    }

    // return () => {
    //   console.log("Disconnecting socket...");
    //   socket.off('newComment'); // Remove the event listener
    //   socket.disconnect(); // Disconnect the socket
    // }
  }, [postId, currentReply, deletionOccured, parentCommentAdded]);

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
    console.log("posted a comment ..", currentComment);
    event.preventDefault();
    const newCommentData = {
      roomId: postId,
      comment: currentComment,
      userId: currentUser?.uid,
    };
    socket.emit("newComment", newCommentData);
    console.log(`New comment submitted: ${JSON.stringify(newCommentData)}`);
    setCurrentComment(""); // clear the input field
    setparentCommentAdded((prev) => !prev);
  };

  const handleCommentChange = (event) => {
    setCurrentComment(event.target.value);
  };

  // function to handle  deletion of comments
  const handleDeleteComment = (event, commentId) => {
    event.preventDefault();
    socket.emit("deleteComment", commentId);
    setDeletionOccured((prev) => !prev);
    console.log(`the comment with id: ${commentId} was deleted`);
  };
  // function to handle  deletion of comments
  const handleDeleteReply = (event, replyId) => {
    event.preventDefault();
    socket.emit("deleteReply", replyId);
    setDeletionOccured((prev) => !prev);
    console.log(`the comment with id: ${replyId} was deleted`);
  };

  // function to handle new reply submission
  // function to handle new reply submission
  const handleNewReply = (event, commentId) => {
    event.preventDefault();
    console.log("posted a comment ..", currentReply);
    // Create the newReplyData object with relevant information
    const newReplyData = {
      roomId: commentId, // Set the roomId to the commentId
      reply: currentReply, // Get the reply from the currentReply state variable
      userId: currentUser?.uid, // Get the userId (if available, using optional chaining)
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

  const navigateToProfile = () => {
    console.log("Navigating: ", postcard.user?.id);
    navigate(`/OtherProfile/${postcard.user?.id}`);
  };

  return (
    <center>
      <div>
        <div>
          <div>
            <div className="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4 min-h-screen">
              <div
                id="viewerBox"
                className="lg:p-10 md:p-6 p-4 bg-white dark:bg-gray-900 "
              >
                <div 
                className="mt-3 md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-strech justify-center lg:space-x-8">
                  <div className="lg:w-3/5 flex justify-center items-center items-strech bg-gray-50  px-2 py-20 md:py-6 md:px-6 lg:py-24">
                    <div className="slider">
                      <div className="slide-ana lg:relative">
                        <div
                          className="flex"
                          style={{ transform: `translateX(0)` }}
                        >
                          <div onClick={navigateToProfile}>
                            <img
                              className="mb-4 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"
                              src={url}
                              // className="card-img-top"
                              alt="..."
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className=" lg:w-2/5 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0"
                  >
                    <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
                    Photo Details
                    </h1>
                     <p className="text-base leading-normal text-gray-600 dark:text-white mt-2">
                      You don't just want to be comfortable sitting in a bar
                      stool—you want to be comfortable shimmying it up to the
                      bar, closer to your lover, or back slightly to include a
                      third person in the conversation.
                    </p>
                    {/*<p className="text-3xl font-medium text-gray-600 dark:text-white mt-8 md:mt-10">
                    </p>
                    <div className="flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-8 md:mt-16">
                      <button className="w-full md:w-3/5 border border-gray-800 text-base font-medium leading-none text-white uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                        Add to Cart
                      </button>
                      <button className="w-full md:w-2/5 border border-gray-800 text-base font-medium leading-none text-gray-800 dark:text-white uppercase py-6 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-transparent dark:border-white dark:text-white focus:ring-gray-800 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-800">
                        View Details
                      </button>
                    </div> */}
                    <div className="mt-6 scrollable-container" style={{ maxHeight: "500px", overflow: "auto" }}
>

                      <div className="flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0">
                        {/* <p className="leftCentered">Author: {postcard.user?.name}</p> */}
                        <p className="text-base leading-normal text-gray-600 dark:text-white mt-2">
                          <div className="flex items-start space-x-4">
                            <div onClick={navigateToProfile}>
                              <img
                                src={postcard.user?.profilePicUrl}
                                alt={postcard.user?.name}
                                className="w-7 h-7 rounded-full cursor-pointer"
                              />
                            </div>
                            <div onClick={navigateToProfile}>
                              <span className="">{postcard.user?.name}</span>
                            </div>
                          </div>
                        </p>

                        <p className="leftCentered text-base leading-normal text-gray-600 dark:text-white mt-2">
                          {allTags.map((tag, index) => (
                            <a
                              href="#"
                              onClick={() => handleTagClick(tag)}
                              key={index}
                            >
                              #{tag}{" "}
                            </a>
                          ))}
                        </p>
                        <p 
                        className="leftCentered text-base leading-normal text-gray-600 dark:text-white mt-2">
                          Location - {postcard.location?.location_name} in{" "}
                          {postcard.location?.city}
                        </p>
                        <div>
                          {lat && lng ? (
                            <TomTomMap lat={lat} lng={lng} />
                          ) : (
                            <p className="leftCentered">Map data unavailable</p>
                          )}
                        </div>
                        <p className="leftCentered text-base leading-normal text-gray-600 dark:text-white mt-2">
                          {postcard.description}
                        </p>
                        <p className="leftCentered text-base leading-normal text-gray-600 dark:text-white mt-2">
                          Camera: {postcard.camera_detail?.make}{" "}
                          {postcard.camera_detail?.model} <br />
                          Focal length: {postcard.camera_detail?.focal_length}mm
                          <br />
                          Aperture: {postcard.camera_detail?.aperture}
                          <br />
                          Exposure: {postcard.camera_detail?.exposure_time}s
                          <br />
                          ISO: {postcard.camera_detail?.iso}
                          <br />
                        </p>
                        <p className="leftCentered text-base leading-normal text-gray-600 dark:text-white mt-2">Likes: {post.likesCount}</p>

                      </div>
                      <CommentForm
                        handleCommentChange={handleCommentChange}
                        handleNewComment={handleNewComment}
                        currentComment={currentComment}
                        loading={loadingComment}
                      ></CommentForm>
                      <div
                        className="commentBox"
                        style={{
                          backgroundColor: "white",
                          maxHeight: "500px",
                          overflow: "auto",
                        }}
                      >
                        <h2
                          className="leftCentered"
                          style={{ fontWeight: "bold" }}
                        >
                          {loadingComment ? "Loading Comments..." : "Comments"}
                        </h2>
                        <CommentList
                          handleDeleteReply={handleDeleteReply}
                          handleDeleteComment={handleDeleteComment}
                          commentsArray={comments}
                          handleReplyChange={handleReplyChange}
                          handleNewReply={handleNewReply}
                          currentReply={currentReply}
                        ></CommentList>
                      </div>
                    </div>
                  </div>
                </div>
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
