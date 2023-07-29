import React, { useEffect } from 'react';
import "../../styles/comments.css";

export default function ReplyForm({ handleNewReply, currentReply, handleReplyChange, loading, commentId, setIsReplying}) {
  const maxLength = 255;
  const remainingCharacters = maxLength - currentReply?.length;
  const handleSubmit = (event) => {
    // Call the handleNewReply function when the form is submitted
    handleNewReply(event, commentId);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea className="message-input" value={currentReply} onChange={handleReplyChange} placeholder='Add a comment...' maxLength={maxLength}></textarea>
        <button className="post-button" disabled={loading || currentReply?.trim() === ""}>{loading ? "Loading" : "Reply"}</button>
        <button type="button" onClick={() => setIsReplying(false)}>Cancel</button>
      </div>
      <p style={{ backgroundColor: "white", border: "2px solid blue", margin: ".1em", borderRadius: ".5em" }}>{`(${remainingCharacters} characters left)`}</p>
    </form>
  );
}
