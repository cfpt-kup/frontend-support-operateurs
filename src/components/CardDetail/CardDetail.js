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
            <p>Comments: {card.badges.comments}</p>
            <h3>Card Links</h3>
            <a href={card.shortUrl} target="_blank" rel="noopener noreferrer">View on Trello</a>
        </div>
    );
};

export default CardDetail;
