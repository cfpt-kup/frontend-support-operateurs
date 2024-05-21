// CommentForm.js
import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        onSubmit(comment);
        setComment('');
    };

    return (
        <form onSubmit={handleCommentSubmit}>
            <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Add a comment"
                required
            />
            <button type="submit">Post Comment</button>
        </form>
    );
};

export default CommentForm;
