import React from 'react';
import { Api } from '../api';

const Form = () => {
    const [name, setName] = React.useState('');
    const [comment, setComment] = React.useState('');

    const submitComment = e => {
        e.preventDefault();
        Api.post('/createComment', {
            name,
            message: comment
        })
    }

    return (
        <form onSubmit={submitComment} className="comment-form">
            <label className="name-label">
                Name
                <input className="name-input" type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)}/>
            </label>
            <label className="comment-label">
                <textarea className="comment-input" type="text" placeholder="Enter your message" value={comment} onChange={e => setComment(e.target.value)}/>
            </label>
            <button className="comment-form-button" type="submit">Comment</button>
        </form>
    )
}

export default Form;