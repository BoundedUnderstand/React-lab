import React, { useState } from 'react';
import { useAppDispatch, useAppState } from '../data/useAppState';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useAppDispatch();
    const { items, userEmail } = useAppState();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!title || !body) {
            alert('Wypełnij oba pola: tytuł i treść.');
            return;
        }

        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 11;
        
        const newPost = {
            id: newId,
            name: userEmail, 
            email: userEmail,
            birthDate: 'Brak danych',
            phone: 'Brak danych',
            postTitle: title,
            postId: newId, 
            commentsCount: 0
        };

        dispatch({
            type: 'ADD_POST',
            payload: newPost
        });


        setTitle('');
        setBody('');
        alert('Nowy post został dodany do listy!');
    };

    return (
        <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
                Dodaj Nowy Post
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="postTitle" className="form-label">Tytuł Posta</label>
                        <input
                            type="text"
                            className="form-control"
                            id="postTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="postBody" className="form-label">Treść</label>
                        <textarea
                            className="form-control"
                            id="postBody"
                            rows="3"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-success">Opublikuj Post</button>
                </form>
            </div>
        </div>
    );
};

export default PostForm;