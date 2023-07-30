import React, { useState } from 'react'
import { faBan, faDeleteLeft, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentList from "../Comments/CommentList";
import "../../styles/comments.css"
import ReplyForm from './ReplyForm';


const dateFormatter = new Intl.DateTimeFormat(undefined, {dateStyle: "medium", timeStyle: "short"});
export default function Comment({currentUserId, message, user, createdAt, replies, currentReply, handleReplyChange, handleNewReply, commentId, handleDeleteComment, handleDeleteReply}) {
  const childComment = replies;
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const deleteComment = (event) => {
    handleDeleteComment(event, commentId);
  }
  return (
    <>
    <div className="comment">
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <span style={{color: "gray", fontWeight: "bold"}}>{user?.name}</span>
            <span style={{color: "gray"}}>{dateFormatter.format(Date.parse(createdAt))}</span>
        </div>
        <div style={{display: "flex", alignItems: "flex-start", marginLeft: ".75rem", wordBreak: "break-all"}}>{message}</div>
        <div>
            <FontAwesomeIcon onClick={() => setIsReplying(prev => !prev)} icon={faReply} style={{marginRight: ".85rem", color: "blue"}}></FontAwesomeIcon>
            {currentUserId === user?.id? <FontAwesomeIcon icon={faTrash} style={{color: "red"}} onClick={deleteComment}></FontAwesomeIcon>: <div></div>}
        </div>
    </div>
    {
      isReplying && (
        <div className="mt-1 ml-3">
          <ReplyForm handleReplyChange={handleReplyChange} handleNewReply={handleNewReply} currentReply={currentReply} setIsReplying={setIsReplying} commentId={commentId}></ReplyForm>
        </div>
      )
    }

    {
      childComment?.length > 0 && (
        <>
        <div className={`nested-comments-stack ${areChildrenHidden? "hide": ""}`}>
          <button className="collapse-line" aria-label="Hide Replies" onClick={() => setAreChildrenHidden(true)}></button>
          <div className="nested-comments">
            <CommentList handleDeleteComment={handleDeleteReply}  commentsArray={childComment} handleNewReply={handleNewReply} handleReplyChange={handleReplyChange}currentReply={currentReply}></CommentList>
          </div>
        </div>
        <button className={`btn mt-1 ${!areChildrenHidden? "hide": ""}`} onClick={() => setAreChildrenHidden(false)}>Show Replies</button>
        </>
      )
    }
    </>
  )
}
