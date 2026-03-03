import React from 'react';
import { useParams } from 'react-router-dom';

const CommentsPage = () => {
    const { id } = useParams();
    return (
        <div className="mt-5">
            <h2>Komentarze do Posta (Lab 05)</h2>
            <p className="alert alert-info">
                Trwają prace nad stroną! Komentarze do posta o ID: <strong>{id}</strong>.
            </p>
            <p>Tutaj zostaną pobrane i wyświetlone wszystkie komentarze powiązane z postem (np. z API /posts/{id}/comments).</p>
        </div>
    );
};
export default CommentsPage;