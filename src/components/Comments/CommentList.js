// CommentList.js
import React from 'react';

const CommentList = ({ comments }) => {
    return (
        <ul>
            {comments.map((comment, index) => (
                <li key={index}>
                    <p>
                        <strong>{comment.memberCreator?.username || 'Unknown User'}</strong>
                        ({new Date(comment.date).toLocaleString()}):
                        {comment.data?.text || comment.text}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default CommentList;
