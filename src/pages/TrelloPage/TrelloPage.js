// import React, { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import axios from 'axios';

// const TrelloPage = () => {
//     const { isAuthenticated } = useContext(AuthContext);
//     const [columns, setColumns] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             const token = localStorage.getItem('token');
//             try {
//                 const response = await axios.get('http://localhost:3000/api/trello/columns/cards', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setColumns(response.data.data.columns);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message || 'Failed to fetch data');
//                 setLoading(false);
//             }
//         };

//         if (isAuthenticated) {
//             fetchData();
//         }
//     }, [isAuthenticated]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div>
//             <h1>Trello Columns and Cards</h1>
//             <div className="columns">
//                 {columns.map((column) => (
//                     <div key={column.id} className="column">
//                         <h2>{column.name}</h2>
//                         {column.cards.length === 0 ? (
//                             <p>No cards in this column.</p>
//                         ) : (
//                             <ul>
//                                 {column.cards.map((card) => (
//                                     <li key={card.id}>
//                                         <div>
//                                             {card.labels.map((label) => (
//                                                 <span key={label.id} className="label" style={{ backgroundColor: label.color }}>
//                                                     {label.name}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default TrelloPage;

// TrelloPage.js
import React, { useEffect, useState, useContext } from 'react';
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Trello Columns and Cards</h1>
            <div className="columns">
                {columns.map((column) => (
                    <div key={column.id} className="column">
                        <h2>{column.name}</h2>
                        {column.cards.length === 0 ? (
                            <p>No cards in this column.</p>
                        ) : (
                            <ul>
                                {column.cards.map((card) => (
                                    <li key={card.id}>
                                        <p>{card.name} / {card.labels.map(label => label.name).join(' ')}</p>
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

