import React from 'react';

const Comment = ({comment}) => {

   const {name, message} = comment;
    return (
        <div className="comment">
            <p className="comment-message">{message}</p>
            <div>{name}</div>
        </div>
    )
}

export default Comment;