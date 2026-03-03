import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppState, useAppDispatch } from '../data/useAppState';

const NavBarMenuApp = () => {
    const { isLoggedIn, userEmail } = useAppState();
    const dispatch = useAppDispatch();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        closeMenu();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-xl navbar-light bg-light shadow-sm mb-4">
            <div className="container-fluid">
                <NavLink className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
                    Frameworki frontendowe
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" onClick={closeMenu}>Home</NavLink>
                        </li>

                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="lab01" onClick={closeMenu}>Lab 1</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="lab02" onClick={closeMenu}>Lab 2</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="lab03" onClick={closeMenu}>Lab 3</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="lab05" onClick={closeMenu}>Lab 5</NavLink>
                                </li>

                                <li className="nav-item border-start ms-xl-2 ps-xl-2 d-none d-xl-block"></li>

                                <li className="nav-item">
                                    <NavLink className="nav-link fw-bold text-primary" to="quiz" onClick={closeMenu}>Graj</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="quiz/create" onClick={closeMenu}>Kreator</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="quiz/dashboard" onClick={closeMenu}>Panel</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="about" onClick={closeMenu}>O Autorze</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-info fw-bold" to="quiz/gallery" onClick={closeMenu}>Galeria</NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="d-flex align-items-center flex-wrap gap-2 mt-3 mt-xl-0 border-top pt-3 pt-xl-0 border-xl-0">
                        {isLoggedIn ? (
                            <>
                                <span className="navbar-text me-2 small text-truncate" style={{ maxWidth: "200px" }}>
                                    <strong>{userEmail}</strong>
                                </span>
                                <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                                    Wyloguj
                                </button>
                            </>
                        ) : (
                            <NavLink className="btn btn-primary btn-sm px-3" to="login" onClick={closeMenu}>
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