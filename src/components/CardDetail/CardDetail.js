// CardDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import CommentList from '../Comments/CommentList';
import CommentForm from '../Comments/CommentForm';
import ReactMarkdown from 'react-markdown';

const CardDetail = () => {
    const { isAuthenticated } = useContext(AuthContext); // Removed user from destructuring
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [comments, setComments] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const fetchCardDetails = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found, please login again.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/trello/cards/${cardId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const cardData = response.data.data.card;
                const commentsResponse = await axios.get(`http://localhost:3000/api/trello/cards/${cardId}/comments`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const columnsResponse = await axios.get(`http://localhost:3000/api/trello/columns/cards`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const sortedComments = (commentsResponse.data.data.comments || []).sort((a, b) => new Date(b.date) - new Date(a.date));
                setCard(cardData);
                setComments(sortedComments);
                setColumns(columnsResponse.data.data.columns);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch card details');
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchCardDetails();
        }
    }, [isAuthenticated, cardId]);

    const addComment = async (text) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found, please login again.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/api/trello/cards/comment`,
                { cardId, text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const newComment = {
                id: response.data.data.comment.id,
                memberCreator: response.data.data.comment.memberCreator,
                data: {
                    text: response.data.data.comment.data.text
                },
                date: response.data.data.comment.date,
            };
            setComments([newComment, ...comments]);
        } catch (err) {
            setError(err.message || 'Failed to post comment');
        }
    };

    const updateComment = async (commentId, text) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found, please login again.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/api/trello/cards/comments/${commentId}`,
                { cardId, text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updatedComment = {
                id: response.data.data.comment.id,
                data: {
                    text: response.data.data.comment.data.text
                },
                date: response.data.data.comment.date,
                memberCreator: response.data.data.comment.memberCreator
            };
            setComments(comments.map(comment => comment.id === commentId ? updatedComment : comment));
        } catch (err) {
            setError(err.message || 'Failed to update comment');
        }
    };

    const deleteComment = async (commentId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found, please login again.');
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/api/trello/cards/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (err) {
            setError(err.message || 'Failed to delete comment');
        }
    };

    const moveCard = async (targetListId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found, please login again.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/api/trello/cards/move`,
                { cardId, targetListId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCard(response.data.data.card);
        } catch (err) {
            setError(err.message || 'Failed to move card');
        }
    };

    if (loading) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    if (!card) {
        return <div className="text-center mt-10 text-lg">No card details available.</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Labels</h3>
                <ul className="mb-4">
                    {card.labels.map(label => (
                        <li key={label.id} className="inline-block mr-2 mb-2 px-2 py-1 rounded" style={{ backgroundColor: label.color }}>
                            {label.name}
                        </li>
                    ))}
                </ul>
                <h1 className="text-3xl font-bold mb-4">{card.name}</h1>
                <div className="mb-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
                    <ReactMarkdown>{card.desc}</ReactMarkdown>
                </div>
                <h3 className="text-xl font-semibold mb-2">Comments</h3>
                <CommentList comments={comments} onUpdate={updateComment} onDelete={deleteComment} />
                <CommentForm onSubmit={addComment} />
                <h3 className="text-xl font-semibold mb-2 mt-4">Move Card</h3>
                <div className="flex flex-wrap">
                    {columns.map(column =>
                        (column.id !== card.idList &&
                            (column.name === "A traiter - Opérateurs [TEST]" || column.name === "A valider - Opérateurs [TEST]")) && (
                            <button
                                key={column.id}
                                onClick={() => moveCard(column.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded mr-2 mb-2 hover:bg-blue-700"
                            >
                                Move to {column.name}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardDetail;

