// CardDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const CardDetail = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [comment, setComment] = useState('');
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
                setCard(response.data.data.card);
                setComments(response.data.data.card.comments || []);
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

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`http://localhost:3000/api/trello/cards/comment`,
                { cardId, text: comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const newComment = {
                author: response.data.data.comment.memberCreator.username,
                text: response.data.data.comment.data.text,
                date: response.data.data.comment.date,
            };
            setComments([...comments, newComment]);
            setComment('');
        } catch (err) {
            setError(err.message || 'Failed to post comment');
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
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <p><strong>{comment.author}</strong> ({new Date(comment.date).toLocaleString()}): {comment.text}</p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment"
                    required
                />
                <button type="submit">Post Comment</button>
            </form>
        </div>
    );
};

export default CardDetail;
