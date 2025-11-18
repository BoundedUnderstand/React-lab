import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'; 
import { useAppState, useAppDispatch } from '../data/useAppState';

const NavBarMenuApp = () => {
    
    const { isLoggedIn, userEmail } = useAppState();
    const dispatch = useAppDispatch();
    

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
            <div className="container-fluid">

                <NavLink className="navbar-brand h1 mb-0" to="/">Frameworki frontendowe</NavLink>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                        </li>

                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="lab01">Laboratorium 1</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="lab02">Laboratorium 2</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="lab03">Laboratorium 3</NavLink>
                                </li>
                                
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="lab05">Laboratorium 5</NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="d-flex align-items-center">
                        {isLoggedIn ? (
                            <span className="navbar-text me-3">
                                Zalogowano jako **{userEmail}**
                                <button 
                                    className="btn btn-sm btn-outline-danger ms-2"
                                    onClick={handleLogout}
                                >
                                    Wyloguj
                                </button>
                            </span>
                        ) : (
                            <NavLink className="btn btn-primary" to="login"> 
                                Zaloguj
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBarMenuApp;