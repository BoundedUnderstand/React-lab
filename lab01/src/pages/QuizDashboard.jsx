import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../data/AppContext';
import { db } from '../data/firebase';
import { doc, deleteDoc } from "firebase/firestore";

const QuizDashboard = () => {
    const { quizQuestions = [], dispatch } = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleDelete = async (id) => {
        if (window.confirm("Czy na pewno chcesz trwale usunąć to pytanie z bazy danych?")) {
            try {
                await deleteDoc(doc(db, "questions", id));
                dispatch({ type: 'DELETE_QUIZ_QUESTION', payload: id });
            } catch (error) {
                console.error("Błąd podczas usuwania:", error);
            }
        }
    };

    // Oblicz liczebność poszczególnych kategorii
    const quizCategories = quizQuestions.reduce((acc, question) => {
        const category = question.quizCategory || 'Domyślny Quiz';
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category]++;
        return acc;
    }, {});

    const categoriesList = Object.keys(quizCategories);

    // Wyfiltruj pytania dla wybranego folderu
    const displayedQuestions = selectedCategory
        ? quizQuestions.filter(q => (q.quizCategory || 'Domyślny Quiz') === selectedCategory)
        : [];

    return (
        <div className="container mt-4 mb-5">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 p-4 bg-white shadow-sm rounded-3 border">
                <div className="mb-3 mb-sm-0">
                    <h1 className="h3 fw-bold mb-1 text-dark">Panel Zarządzania Quizami</h1>
                    <p className="text-muted mb-0 small">Zarządzaj swoją bazą pytań zapisaną w chmurze Firestore.</p>
                </div>
                <div className="d-flex gap-2">
                    {selectedCategory && (
                        <button className="btn btn-outline-secondary btn-lg shadow-sm" onClick={() => setSelectedCategory(null)}>
                            ⬅ Wróć do folderów
                        </button>
                    )}
                    <Link to="/quiz/create" className="btn btn-primary btn-lg shadow-sm">
                        + Dodaj Nowe Pytanie
                    </Link>
                </div>
            </div>

            {quizQuestions.length === 0 ? (
                <div className="text-center p-5 border-2 border-dashed rounded-4 bg-white shadow-sm">
                    <h4 className="fw-bold text-dark">Baza pytań jest pusta</h4>
                    <p className="text-muted mb-4">Pobieranie danych lub brak rekordów w Firestore.</p>
                    <Link to="/quiz/create" className="btn btn-outline-primary">Otwórz Kreator</Link>
                </div>
            ) : !selectedCategory ? (
                // WIDOK FOLDERÓW
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                    {categoriesList.map((category) => (
                        <div key={category} className="col">
                            <div
                                className="card h-100 border-0 shadow-sm"
                                style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                                onClick={() => setSelectedCategory(category)}
                            >
                                <div className="card-body p-4 text-center">
                                    <div className="display-4 text-warning mb-3">
                                        📁
                                    </div>
                                    <h5 className="card-title fw-bold text-dark mb-2 text-truncate">
                                        {category}
                                    </h5>
                                    <p className="card-text text-muted mb-0 small">
                                        {quizCategories[category]} {quizCategories[category] === 1 ? 'pytanie' : (quizCategories[category] % 10 >= 2 && quizCategories[category] % 10 <= 4 && (quizCategories[category] % 100 < 10 || quizCategories[category] % 100 >= 20) ? 'pytania' : 'pytań')}
                                    </p>
                                </div>
                                <div className="card-footer bg-light p-2 border-0 text-center">
                                    <span className="text-primary small fw-bold">Otwórz folder</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // WIDOK PYTAŃ W FOLDERZE
                <div>
                    <h4 className="mb-4 text-primary d-flex align-items-center gap-2">
                        <span className="fs-3">📂</span> <span>Folder: <span className="fw-bold text-dark">{selectedCategory}</span></span>
                    </h4>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {displayedQuestions.map((q) => (
                            <div key={q.id} className="col">
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3 flex-wrap gap-2">
                                        <div>
                                            <span className={`badge ${q.type === 'SINGLE_CHOICE' ? 'bg-primary' : 'bg-success'} me-2`}>
                                                {q.type === 'SINGLE_CHOICE' ? 'Jednokrotny' : 'Wielokrotny'}
                                            </span>
                                            <span className="badge bg-secondary">
                                                {q.quizCategory || 'Domyślny Quiz'}
                                            </span>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-outline-danger border-0 rounded-circle"
                                            onClick={() => handleDelete(q.id)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <div className="card-body p-4">
                                        <h5 className="card-title fw-bold text-dark mb-3 text-truncate">
                                            {q.title || "Bez tytułu"}
                                        </h5>
                                        <p className="card-text text-secondary mb-0" style={{ minHeight: "3rem", fontSize: "0.95rem" }}>
                                            {q.contentHtml?.replace(/<[^>]*>?/gm, '').substring(0, 80) || "Brak treści podglądu..."}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white p-3 d-flex gap-2 border-0">
                                        <Link to={`/quiz/edit/${q.id}`} className="btn btn-warning btn-sm flex-grow-1 fw-bold">
                                            Edytuj
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizDashboard;