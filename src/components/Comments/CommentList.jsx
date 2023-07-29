import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import "../../styles/comments.css"
import { useSelector} from "react-redux";

function CommentList({commentsArray, handleReplyChange, handleNewReply, currentReply, handleDeleteComment, handleDeleteReply}) {
    const [currentUserId, setCurrenUserId] = useState();
    const userId = useSelector((state) => state.user.value)
    useEffect(() => {
        setCurrenUserId(userId.uid)
    }, [commentsArray]);
    return(
        <div className="comment-stack">
            {
                commentsArray?.map((comment) =>{
                    return <Comment handleDeleteReply = {handleDeleteReply} handleDeleteComment={handleDeleteComment} commentId={comment?.id} handleReplyChange={handleReplyChange} currentReply={currentReply} handleNewReply={(event) => handleNewReply(event, comment?.id)} key={comment?.id} message={comment?.commentText ? comment?.commentText : comment?.reply_text} currentUserId={currentUserId} user={comment?.user} createdAt={comment?.createdAt} replies={comment?.replies}></Comment>

                })
            }
        </div>
    )
}
export default CommentList;