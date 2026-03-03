import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppItems, useAppState } from '../data/useAppState'; 
import PostForm from '../components/PostForm';


const TableHeader = ({ headerKey, label }) => {
    const dispatch = useAppDispatch();
    const [sortDirection, setSortDirection] = useState('ascending'); 
    const [activeKey, setActiveKey] = useState('');

    const handleSort = (key) => {
        const newDirection = activeKey === key && sortDirection === 'ascending' ? 'descending' : 'ascending';
        
        
        dispatch({
            type: 'SORT_ITEMS',
            payload: { key, direction: newDirection }
        });

        
        setSortDirection(newDirection);
        setActiveKey(key);
    };
    
    
    const icon = activeKey === headerKey 
        ? (sortDirection === 'ascending' ? '▲' : '▼') 
        : '↕'; 

    return (
        <th onClick={() => handleSort(headerKey)} style={{ cursor: 'pointer', userSelect: 'none' }}>
            {label}
            <span className="ms-2 small">{icon}</span>
        </th>
    );
};


const Lab05Page = () => {
    const items = useAppItems(); 
    const navigate = useNavigate();
    const { isLoggedIn } = useAppState(); 


    const handleCommentsClick = (postId) => {
        
        if (!isLoggedIn) {
             alert('Aby wyświetlić komentarze, musisz być zalogowany.');
             navigate('/login');
             return;
        }
        // Nawigacja do /lab05/comments/:id
        navigate(`/lab05/comments/${postId}`);
    };

    if (!items || items.length === 0) {
        return <div className="alert alert-info">Brak danych do wyświetlenia.</div>;
    }
    
    return (
        <div>
            <h2>Tabela Danych (Lab 5)</h2>
            <p className="small text-muted">Kliknij na nagłówki "ID", "User", "Email" lub "Post Title", aby posortować dane.</p>
            <table className="table table-striped table-hover mt-4">
                <thead className="table-dark">
                    <tr>
                        <TableHeader headerKey="id" label="ID" />
                        <TableHeader headerKey="name" label="User" />
                        <TableHeader headerKey="email" label="Email" />
                        <TableHeader headerKey="postTitle" label="Post Title" />
                        <TableHeader headerKey="commentsCount" label="Comments Count" />
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>

                            <td>
                                <NavLink to={`/lab05/users/${item.id}`}>{item.name}</NavLink>
                            </td>

                            <td>{item.email}</td>

                            <td>
                                <NavLink to={`/lab05/posts/${item.postId}`}>{item.postTitle}</NavLink>
                            </td>

                            <td>
                                <button 
                                    className="btn btn-sm btn-link p-0 text-decoration-underline" 
                                    onClick={() => handleCommentsClick(item.postId)}
                                    title={`Liczba komentarzy dla posta ${item.postId}`}
                                    disabled={!isLoggedIn}
                                >
                                    {item.commentsCount}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isLoggedIn && (
                <PostForm />
            )}
            
            <p className="small text-muted"></p>
            {!isLoggedIn && (
                <div className="alert alert-warning">
                    Aby zobaczyć szczegóły posta i komentarze, musisz się zalogować.
                </div>
            )}
        </div>
    );
};

export default Lab05Page;