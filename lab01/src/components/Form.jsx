import React, { useState, useContext } from 'react';
import AppContext from '../data/AppContext';

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    
    const [errors, setErrors] = useState({});
    

    const [isSubmitted, setIsSubmitted] = useState(false);

    const { dispatch } = useContext(AppContext);
    

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;


        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Wprowadź poprawny adres email.';
            isValid = false;
        }

        if (password.length < 6) {
            newErrors.password = 'Hasło musi mieć minimum 6 znaków.';
            isValid = false;
        }


        if (password !== confirmedPassword) {
            newErrors.confirmedPassword = 'Hasła nie są zgodne.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

 
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const isValid = validateForm();
        setIsSubmitted(true);

        if (isValid) {

            dispatch({ 
                type: 'LOGIN', 
                payload: { userEmail: email } 
            });
            

            setEmail('');
            setPassword('');
            setConfirmedPassword('');
            
        } else {

            console.log('Formularz zawiera błędy. Nie wysłano.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    
                    {isSubmitted && Object.keys(errors).length === 0 && (
                        <div className="alert alert-success">
                            Zalogowano pomyślnie!
                        </div>
                    )}

                    <div className="card shadow">
                        <div className="card-header text-center">
                            <h3>Logowanie</h3>
                        </div>
                        <div className="card-body">
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Adres email:</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Hasło:</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Potwierdź hasło:</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.confirmedPassword ? 'is-invalid' : ''}`}
                                        id="confirmPassword"
                                        value={confirmedPassword}
                                        onChange={(e) => setConfirmedPassword(e.target.value)}
                                        required
                                    />
                                    {errors.confirmedPassword && <div className="invalid-feedback">{errors.confirmedPassword}</div>}
                                </div>
                                
                                <button type="submit" className="btn btn-primary w-100 mt-3">
                                    Zaloguj
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;