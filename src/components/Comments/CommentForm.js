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
        <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4 mt-6">
            <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Add a comment"
                required
                className="w-full p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows="4"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                Post Comment
            </button>
        </form>
    );
};

export default CommentForm;
