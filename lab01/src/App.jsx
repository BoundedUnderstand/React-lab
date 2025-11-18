import React, { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import RootLayout from './layouts/RootLayout'; 
import AppContext from './data/AppContext'; 
import AppReducer from './data/AppReducer';
import { useFetchData } from './data/useAppState'; 
import Home from './pages/Home';
import Lab01 from './pages/Lab01';
import Lab02 from './pages/Lab02';
import Lab03 from './pages/Lab03'; 
import Lab05Page from './pages/Lab05Page';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import CommentsPage from './pages/CommentsPage';

const initialState = {
    items: [], 
    isLoggedIn: false, 
    userEmail: null,
};

function App() {
    
    const { data: userData, isLoading: isUsersLoading } = useFetchData(
        'https://jsonplaceholder.typicode.com/users', []
    );
    const { data: postData, isLoading: isPostsLoading } = useFetchData(
        'https://jsonplaceholder.typicode.com/posts', []
    );
    const { data: commentData, isLoading: isCommentsLoading } = useFetchData(
        'https://jsonplaceholder.typicode.com/comments', []
    );

    const isLoading = isUsersLoading || isPostsLoading || isCommentsLoading;
    const isError = false; 

    const formattedPeople = React.useMemo(() => {
        if (!userData || !postData || !commentData || userData.length === 0) return [];
        
        const commentsByPost = commentData.reduce((acc, comment) => {
            acc[comment.postId] = (acc[comment.postId] || 0) + 1;
            return acc;
        }, {});

        return userData.slice(0, 5).map(user => {
            const userPost = postData.find(post => post.userId === user.id);
            const postId = userPost ? userPost.id : null;
            
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                birthDate: '1990-01-01', 
                phone: user.phone.split(' ')[0], 
                postTitle: userPost ? userPost.title : 'N/A',
                postId: postId,
                commentsCount: postId ? commentsByPost[postId] || 0 : 0
            };
        });
    }, [userData, postData, commentData]);

    const [state, appDispatch] = useReducer(AppReducer, initialState);

    React.useEffect(() => {
        if (formattedPeople.length > 0 && state.items.length === 0) {
            appDispatch({ 
                type: 'SET_ITEMS', 
                payload: formattedPeople 
            });
        }
    }, [formattedPeople, appDispatch, state.items.length]);

    const contextValue = {
        items: state.items,
        dispatch: appDispatch,
        isLoggedIn: state.isLoggedIn, 
        userEmail: state.userEmail,
    };

    if (isLoading) {
        return <div className="text-center mt-5">Ładowanie danych z API...</div>;
    }
    
    if (isError) {
        return <div className="alert alert-danger text-center mt-5">Błąd podczas pobierania danych z API!</div>;
    }

    return (
        <AppContext.Provider value={contextValue}>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="lab01" element={<Lab01 />} />
                    <Route path="lab02/:id" element={<Lab02 />} /> 
                    <Route path="lab03" element={<Lab03 />} /> 
                    <Route path="lab05" element={<Lab05Page />} /> 
                    <Route path="lab05/users/:id" element={<UserPage />} />
                    <Route path="lab05/posts/:id" element={<PostPage />} />
                    <Route path="lab05/comments/:id" element={<CommentsPage />} />
                    <Route path="login" element={<Login />} /> 
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </AppContext.Provider>
    );
}

export default App;