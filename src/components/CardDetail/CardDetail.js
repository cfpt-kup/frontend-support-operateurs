// CardDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import CommentList from '../Comments/CommentList';
import CommentForm from '../Comments/CommentForm';

const CardDetail = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchCardDetails = async () => {
            const token = localStorage.getItem('token');
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

                const sortedComments = (commentsResponse.data.data.comments || []).sort((a, b) => new Date(b.date) - new Date(a.date));
                setCard(cardData);
                setComments(sortedComments);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!card) {
        return <div>No card details available.</div>;
    }

    return (
        <div>
            <h1>Card Detail</h1>
            <h2>{card.name}</h2>
            <p>{card.desc}</p>
            <h3>Labels</h3>
            <ul>
                {card.labels.map(label => (
                    <li key={label.id} style={{ backgroundColor: label.color }}>
                        {label.name}
                    </li>
                ))}
            </ul>
            <h3>Comments</h3>
            <CommentList comments={comments} onUpdate={updateComment} />
            <CommentForm onSubmit={addComment} />
        </div>
    );
};

export default CardDetail;
