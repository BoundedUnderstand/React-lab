import React from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm'; 
import { useAppState } from '../data/useAppState';

const PostPage = () => {
    const { id } = useParams();
    const { isLoggedIn } = useAppState(); 
    
    return (
        <div className="mt-5">
            <h2>Treść Posta (ID: {id})</h2>
            <p className="alert alert-info">
                Wyszukany post ma ID: <strong>{id}</strong>.
            </p>
            <p>Tutaj zostanie pobrana i wyświetlona pełna treść posta.</p>
            
            
            {isLoggedIn ? (
                
                <CommentForm postId={parseInt(id)} />
            ) : (
                <div className="alert alert-warning mt-4">
                    Musisz być zalogowany, aby móc dodawać komentarze.
                </div>
            )}
        </div>
    );
};
export default PostPage;