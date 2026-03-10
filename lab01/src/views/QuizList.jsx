import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../data/AppContext';

const QuizList = () => {
    const { quizQuestions = [] } = useContext(AppContext);

    // Get unique categories and count questions in each
    const quizCategories = quizQuestions.reduce((acc, question) => {
        const category = question.quizCategory || 'Domyślny Quiz';
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category]++;
        return acc;
    }, {});

    const categoriesList = Object.keys(quizCategories);

    return (
        <div className="container mt-4 mb-5">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 p-4 bg-white shadow-sm rounded-3 border">
                <div className="mb-3 mb-sm-0">
                    <h1 className="h3 fw-bold mb-1 text-dark">Dostępne Quizy</h1>
                    <p className="text-muted mb-0 small">Wybierz quiz, w który chcesz zagrać.</p>
                </div>
            </div>

            {categoriesList.length === 0 ? (
                <div className="text-center p-5 border-2 border-dashed rounded-4 bg-white shadow-sm">
                    <h4 className="fw-bold text-dark">Brak dostępnych quizów</h4>
                    <p className="text-muted mb-4">Pobieranie danych lub nie dodano jeszcze żadnych pytań.</p>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {categoriesList.map((category) => (
                        <div key={category} className="col">
                            <Link to={`/quiz/play/${encodeURIComponent(category)}`} className="text-decoration-none">
                                <div className="card h-100 border-0 shadow-sm quiz-card-hover" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}>
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3" style={{ height: '160px', overflow: 'hidden', borderRadius: '8px' }}>
                                            <img
                                                src={
                                                    {
                                                        'Bazy Danych': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
                                                        'JavaScript': 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=400&q=80',
                                                        'React': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80',
                                                        'Sieci Komputerowe': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80',
                                                    }[category] || `https://picsum.photos/seed/${encodeURIComponent(category)}/400/300`
                                                }
                                                alt={`Kategoria ${category}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                crossOrigin="anonymous"
                                            />
                                        </div>
                                        <h4 className="card-title fw-bold text-dark mb-2">
                                            {category}
                                        </h4>
                                        <p className="card-text text-muted mb-0">
                                            Liczba pytań: <span className="badge bg-secondary">{quizCategories[category]}</span>
                                        </p>
                                    </div>
                                    <div className="card-footer bg-light p-3 border-0 text-center">
                                        <span className="fw-bold text-primary">Rozpocznij grę ➔</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuizList;
