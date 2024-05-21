// CommentList.js
import React, { useState } from 'react';

const CommentList = ({ comments, onUpdate }) => {
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [updatedText, setUpdatedText] = useState('');

    const handleEditClick = (comment) => {
        setEditingCommentId(comment.id);
        setUpdatedText(comment.data?.text || comment.text || '');
    };

    const handleCancelClick = () => {
        setEditingCommentId(null);
        setUpdatedText('');
    };

    const handleUpdateClick = (commentId) => {
        onUpdate(commentId, updatedText);
        setEditingCommentId(null);
        setUpdatedText('');
    };

    return (
        <ul>
            {comments.map((comment, index) => (
                <li key={index}>
                    {editingCommentId === comment.id ? (
                        <div>
                            <textarea
                                value={updatedText}
                                onChange={(e) => setUpdatedText(e.target.value)}
                            />
                            <button onClick={() => handleUpdateClick(comment.id)}>Save</button>
                            <button onClick={handleCancelClick}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p>
                                <strong>{comment.memberCreator?.username || 'Unknown User'}</strong>
                                ({new Date(comment.date).toLocaleString()}):
                                {comment.data?.text || comment.text}
                            </p>
                            <button onClick={() => handleEditClick(comment)}>Update</button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default CommentList;
