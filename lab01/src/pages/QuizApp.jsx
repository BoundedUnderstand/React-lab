import React, { useContext, useState, useMemo } from 'react';
import AppContext from '../data/AppContext';
import QuestionRenderer from '../components/quiz/QuestionRenderer';
import { Link, useParams } from 'react-router-dom';

const QuizApp = () => {
    const { quizQuestions = [] } = useContext(AppContext);
    const { category } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [quizLost, setQuizLost] = useState(false);
    const [chances, setChances] = useState(3);

    // Filter questions by category
    const filteredQuestions = useMemo(() => {
        if (!quizQuestions) return [];
        return quizQuestions.filter(q => (q.quizCategory || 'Domyślny Quiz') === category);
    }, [quizQuestions, category]);

    if (quizQuestions === null || (quizQuestions.length === 0 && currentIndex === 0)) {
        return (
            <div className="container mt-5 text-center px-4">
                <div className="py-5">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Ładowanie...</span>
                    </div>
                    <p className="text-muted">Pobieranie zadań z bazy Firestore...</p>
                </div>
            </div>
        );
    }

    const handleNext = () => {
        if (currentIndex < filteredQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleIncorrect = () => {
        if (chances > 1) {
            setChances(chances - 1);
        } else {
            setChances(0);
            setQuizLost(true);
        }
    };

    const resetQuiz = () => {
        setCurrentIndex(0);
        setQuizFinished(false);
        setQuizLost(false);
        setChances(3);
    };

    if (quizLost) {
        return (
            <div className="container mt-5 px-4">
                <div className="row justify-content-center text-center">
                    <div className="col-12 col-md-8 col-lg-6 card shadow-lg p-5 border-0 rounded-4 bg-white">
                        <div className="display-1 mb-3">💔</div>
                        <h2 className="text-danger mb-3 fw-bold">Koniec Gry!</h2>
                        <p className="lead mb-4">Wykorzystałeś wszystkie 3 szanse w kategorii {category}.</p>
                        <div className="d-flex flex-column gap-3">
                            <button className="btn btn-primary btn-lg w-100 shadow-sm" onClick={resetQuiz}>
                                Spróbuj ponownie
                            </button>
                            <Link to="/quiz" className="btn btn-outline-secondary btn-lg w-100 shadow-sm">
                                Wróć do listy quizów
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (quizFinished) {
        return (
            <div className="container mt-5 px-4">
                <div className="row justify-content-center text-center">
                    <div className="col-12 col-md-8 col-lg-6 card shadow-lg p-5 border-0 rounded-4 bg-white">
                        <div className="display-1 mb-3">🎉</div>
                        <h2 className="text-success mb-3 fw-bold">Gratulacje!</h2>
                        <p className="lead mb-4">Ukończyłeś {category} z wynikiem pozytywnym. Zachowałeś szans: {chances}/3.</p>
                        <div className="d-flex flex-column gap-3">
                            <button className="btn btn-primary btn-lg w-100 shadow-sm" onClick={resetQuiz}>
                                Zacznij ten quiz od nowa
                            </button>
                            <Link to="/quiz" className="btn btn-outline-secondary btn-lg w-100 shadow-sm">
                                Wróć do listy quizów
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (filteredQuestions.length === 0) {
        return (
            <div className="container mt-5 text-center px-4">
                <div className="py-5">
                    <h4 className="text-danger fw-bold">Brak pytań</h4>
                    <p className="text-muted">Ten quiz nie ma jeszcze żadnych przypisanych pytań.</p>
                    <Link to="/quiz" className="btn btn-primary mt-3">Wróć do listy</Link>
                </div>
            </div>
        );
    }

    const currentQuestion = filteredQuestions[currentIndex];
    const progress = Math.round(((currentIndex + 1) / filteredQuestions.length) * 100);

    return (
        <div className="container-fluid container-md mt-4 px-3 px-md-0 mb-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm border">
                        <div className="d-flex align-items-center gap-3">
                            <span className="fw-bold text-dark">{category} - Zadanie {currentIndex + 1} / {filteredQuestions.length}</span>
                            <div className="text-danger fw-bold ms-2" style={{ letterSpacing: '2px' }}>
                                {/* Rendrujemy tyle serduszek, ile wynosi chances */}
                                {'❤️'.repeat(chances)}{'🤍'.repeat(3 - chances)}
                            </div>
                        </div>
                        <div className="progress flex-grow-1 mx-3 d-none d-sm-flex" style={{ height: "10px", maxWidth: "200px" }}>
                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: `${progress}%` }}
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                        <span className="badge bg-secondary py-2 px-3">{progress}%</span>
                    </div>

                    <QuestionRenderer
                        question={currentQuestion}
                        onNext={handleNext}
                        onIncorrect={handleIncorrect}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuizApp;