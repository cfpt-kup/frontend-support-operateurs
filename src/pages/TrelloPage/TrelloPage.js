// TrelloPage.js
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const TrelloPage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/api/trello/columns/cards', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setColumns(response.data.data.columns);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    if (loading) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Trello Columns and Cards</h1>
            <div className="flex space-x-4 overflow-x-auto pb-6">
                {columns.map((column) => (
                    <div key={column.id} className="w-full sm:w-80 md:w-96 bg-white rounded-lg shadow p-4 md:p-6 flex-shrink-0">
                        <h2 className="text-xl font-semibold mb-4">{column.name}</h2>
                        {column.cards.length === 0 ? (
                            <p className="text-gray-500">No cards in this column.</p>
                        ) : (
                            <ul>
                                {column.cards.map((card) => (
                                    <li key={card.id} className="mb-4 md:mb-6">
                                        <Link to={`/cards/${card.id}`} className="block p-4 md:p-6 bg-blue-100 rounded-lg hover:bg-blue-200">
                                            <div className="mb-2">
                                                {card.labels.map(label => (
                                                    <span key={label.id} className="inline-block mr-2 mb-1 px-2 py-1 text-xs font-semibold rounded" style={{ backgroundColor: label.color }}>
                                                        {label.name}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-lg font-medium">{card.name}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrelloPage;
