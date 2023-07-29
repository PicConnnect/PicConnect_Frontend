import React, { useEffect, useState } from 'react';
import "../../styles/comments.css";

export default function ReplyForm({ handleNewReply, handleReplyChange, loading, commentId, setIsReplying}) {
  const [reply, setReply] = useState("");
  const handleChange = (event) => {
    setReply(event.target.value);
    handleReplyChange(event);
  };
  const maxLength = 255;
  const remainingCharacters = maxLength - reply?.length;
  const handleSubmit = (event) => {
    handleNewReply(event, commentId);
    setReply("");
    setIsReplying(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea className="message-input" value={reply} onChange={handleChange} placeholder='Add a comment...' maxLength={maxLength}></textarea>
        <button className="post-button" disabled={loading || reply?.trim() === ""}>{loading ? "Loading" : "Reply"}</button>
        <button type="button" onClick={() => setIsReplying(false)}>Cancel</button>
      </div>
      <p style={{ backgroundColor: "white", border: "2px solid blue", margin: ".1em", borderRadius: ".5em" }}>{`(${remainingCharacters} characters left)`}</p>
    </form>
  );
}
