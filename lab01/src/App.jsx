import React, { useReducer, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from './data/firebase';

import RootLayout from './layouts/RootLayout';
import AppContext from './data/AppContext';
import AppReducer from './data/AppReducer';
import { useFetchData } from './data/useAppState';

// Importy podstawowych stron
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

// Importy Quizu
import QuizList from './pages/QuizList';
import QuizApp from './pages/QuizApp';
import AboutMe from './pages/AboutMe';
import ProtectedRoute from './components/ProtectedRoute';
import QuizDashboard from './pages/QuizDashboard';
import QuizCreation from './pages/QuizCreation';
import QuizEdit from './pages/QuizEdit';

import ComponentGallery from './pages/ComponentGallery';

const initialState = {
    items: [],
    isLoggedIn: false,
    userEmail: null,
    quizQuestions: [],
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

    const [state, appDispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                appDispatch({ type: 'LOGIN', payload: { email: user.email } });
            } else {
                appDispatch({ type: 'LOGOUT' });
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "questions"));
                const questions = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                appDispatch({ type: 'SET_QUIZ_QUESTIONS', payload: questions });
            } catch (error) {
                console.error("Błąd pobierania:", error);
            }
        };
        fetchQuestions();
    }, []);

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

    useEffect(() => {
        if (formattedPeople.length > 0 && state.items.length === 0) {
            appDispatch({ type: 'SET_ITEMS', payload: formattedPeople });
        }
    }, [formattedPeople, state.items.length]);

    const contextValue = {
        items: state.items,
        quizQuestions: state.quizQuestions,
        dispatch: appDispatch,
        isLoggedIn: state.isLoggedIn,
        userEmail: state.userEmail,
    };

    const isLoading = isUsersLoading || isPostsLoading || isCommentsLoading;

    if (isLoading) {
        return <div className="text-center mt-5">Ładowanie danych z serwisu...</div>;
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
                    <Route path="about" element={<AboutMe />} />
                    <Route path="quiz" element={<QuizList />} />
                    <Route path="quiz/play/:category" element={<QuizApp />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="quiz/create" element={<QuizCreation />} />
                        <Route path="quiz/dashboard" element={<QuizDashboard />} />
                        <Route path="quiz/edit/:id" element={<QuizEdit />} />
                    </Route>
                    <Route path="quiz/gallery" element={<ComponentGallery />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </AppContext.Provider>
    );
}

export default App;