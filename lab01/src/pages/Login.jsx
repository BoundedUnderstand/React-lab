// Lab 4
import React, { useContext } from 'react';
import AppContext from '../data/AppContext';
import Form from '../components/Form'; 

const Login = () => {
    const { items, dispatch, isLoggedIn, userEmail } = useContext(AppContext);
    
    if (isLoggedIn) {
        return (
            <div className="alert alert-info text-center mt-5">
                Jesteś już zalogowany jako **{userEmail}**.
                <button 
                    className="btn btn-sm btn-outline-secondary ms-3"
                    onClick={() => dispatch({ type: 'LOGOUT' })}
                >
                    Wyloguj
                </button>
            </div>
        );
    }

    
    return (
        <Form />
    );
};

export default Login;