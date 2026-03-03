import React, { useState } from 'react';
import { auth } from '../data/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                    navigate('/');
                } catch (regErr) { alert(regErr.message); }
            } else { alert(error.message); }
        }
    };

    return (
        <div className="card shadow-lg p-4 border-0 rounded-4">
            <h2 className="text-center mb-4 fw-bold">Witaj</h2>
            <form onSubmit={handleAuth}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Hasło</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold shadow-sm">Zaloguj / Zarejestruj</button>
            </form>
        </div>
    );
};

export default Form;