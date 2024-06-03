import React, { useState } from 'react';
import Swal from 'sweetalert2';

const CommentList = ({ comments, onUpdate, onDelete }) => {
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
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to save the changes?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onUpdate(commentId, updatedText);
                setEditingCommentId(null);
                setUpdatedText('');
                Swal.fire(
                    'Saved!',
                    'Your comment has been updated.',
                    'success'
                );
            }
        });
    };

    const handleDeleteClick = (commentId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this comment?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(commentId);
                Swal.fire(
                    'Deleted!',
                    'Your comment has been deleted.',
                    'success'
                );
            }
        });
    };

    return (
        <ul className="space-y-4">
            {comments.map((comment, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded shadow-md">
                    {editingCommentId === comment.id ? (
                        <div className="flex flex-col space-y-2">
                            <textarea
                                value={updatedText}
                                onChange={(e) => setUpdatedText(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                                rows="4"
                            />
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleUpdateClick(comment.id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelClick}
                                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <p className="text-gray-700">
                                <strong>{comment.memberCreator?.fullName || 'Unknown User'}</strong>
                                ({new Date(comment.date).toLocaleString()}):
                                <span className="block mt-1">{comment.data?.text || comment.text}</span>
                            </p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditClick(comment)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(comment.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default CommentList;
