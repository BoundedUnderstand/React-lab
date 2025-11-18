import React from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const { id } = useParams();
    return (
        <div className="mt-5">
            <h2>Szczegóły Użytkownika (Lab 05)</h2>
            <p className="alert alert-info">
                Trwają prace nad stroną! Wyszukany użytkownik ma ID: <strong>{id}</strong>.
            </p>
            <p>Tutaj zostaną pobrane i wyświetlone pełne szczegóły użytkownika o tym ID.</p>
        </div>
    );
};
export default UserPage;