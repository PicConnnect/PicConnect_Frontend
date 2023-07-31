import React from 'react'
import "../../styles/comments.css"
export default function CommentForm({handleNewComment, currentComment, handleCommentChange, loading, error}) {
    const maxLength = 255;
    const remainingCharacters = maxLength - currentComment?.length;
    return (
    <form onSubmit={handleNewComment}>
        <div className="comment-form-row">
            <textarea className="message-input" value={currentComment} onChange={handleCommentChange} placeholder='Add a comment...' maxLength={maxLength}></textarea>
            <button className="post-button" disabled={loading || currentComment?.trim() === ""}>{loading? "Loading": "Post"}</button>
        </div>
        <p style={{backgroundColor: "white", border: "2px solid rgb(59, 130, 246)", margin: ".1em", borderRadius: ".5em"}}>{`(${remainingCharacters} characters left)`}</p>
    </form>
    )
}
