import React, { useState } from 'react';
import { useAppDispatch, useAppState } from '../data/useAppState';

const CommentForm = ({ postId }) => {
    const [commentBody, setCommentBody] = useState('');
    const dispatch = useAppDispatch();
    const { userEmail } = useAppState();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!commentBody) {
            alert('Treść komentarza nie może być pusta.');
            return;
        }

        dispatch({
            type: 'ADD_COMMENT',
            payload: { postId: postId }
        });

        setCommentBody('');
        alert(`Komentarz użytkownika ${userEmail} został dodany do posta ID ${postId}.`);
    };

    return (
        <div className="card mt-4">
            <div className="card-header">Dodaj Komentarz (jako {userEmail})</div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="2"
                            value={commentBody}
                            onChange={(e) => setCommentBody(e.target.value)}
                            placeholder="Wpisz swój komentarz..."
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-sm btn-primary">Opublikuj Komentarz</button>
                </form>
            </div>
        </div>
    );
};

export default CommentForm;