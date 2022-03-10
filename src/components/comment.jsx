import React from 'react';
import moment from 'moment';

const Comment = ({comment}) => {
   const {name, message, created} = comment;

   const parsedTime = moment.utc(created).calendar(null, {
    sameDay: '[today at] ha ',
    nextDay: '[tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[yesterday at] ha',
    lastWeek: '[on] dddd [at] ha',
    sameElse: '[on] MMMM [at] ha'
});

    return (
        <div className="comment">
            <p className="comment-message">{message}</p>
            <div className="time-stamp">Posted by <strong>{name}</strong> {parsedTime} </div>
        </div>
    )
}

export default Comment;