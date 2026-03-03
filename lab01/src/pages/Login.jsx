import React, { useContext } from 'react';
import AppContext from '../data/AppContext';
import Form from '../components/Form';

const Login = () => {
    const { dispatch, isLoggedIn, userEmail } = useContext(AppContext);

    if (isLoggedIn) {
        return (
            <div className="container mt-5">
                <div className="alert alert-success shadow-sm border-0 d-flex flex-column flex-md-row align-items-center justify-content-center p-4">
                    <span className="mb-2 mb-md-0">
                        Jesteś już zalogowany jako: <strong className="text-dark">{userEmail}</strong>
                    </span>
                    <button
                        className="btn btn-danger btn-sm ms-md-3 shadow-sm"
                        onClick={() => dispatch({ type: 'LOGOUT' })}
                    >
                        Wyloguj się
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <Form />
                </div>
            </div>
        </div>
    );
};

export default Login;