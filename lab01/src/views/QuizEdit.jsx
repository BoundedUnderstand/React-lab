import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../data/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AppContext from '../data/AppContext';

const QuizEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useContext(AppContext);

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestion = async () => {
            const docRef = doc(db, "questions", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setQuestion({ id: docSnap.id, ...docSnap.data() });
            } else {
                navigate('/quiz/dashboard');
            }
            setLoading(false);
        };
        fetchQuestion();
    }, [id, navigate]);

    const handleOptionChange = (optionId, newValue) => {
        setQuestion({
            ...question,
            options: question.options.map(opt =>
                opt.id === optionId ? { ...opt, value: newValue } : opt
            )
        });
    };

    const handlePairChange = (pairId, field, newValue) => {
        setQuestion({
            ...question,
            pairs: question.pairs.map(p =>
                p.id === pairId ? { ...p, [field]: newValue } : p
            )
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "questions", id);
            await updateDoc(docRef, question);

            dispatch({ type: 'EDIT_QUIZ_QUESTION', payload: question });
            alert("Całe zadanie zostało zaktualizowane!");
            navigate('/quiz/dashboard');
        } catch (error) {
            console.error("Błąd edycji:", error);
            alert("Wystąpił błąd podczas zapisu.");
        }
    };

    if (loading) return <div className="container mt-5 text-center text-primary">Wczytywanie pełnej struktury zadania...</div>;

    return (
        <div className="container mt-4 mb-5">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="card-header bg-warning py-3">
                    <h2 className="h4 mb-0 fw-bold text-dark">Tryb Edycji: {question.type}</h2>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleUpdate}>
                        {/* PODSTAWOWE DANE */}
                        <div className="row mb-4">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label fw-bold">Kategoria Quizu (Nazwa)</label>
                                <input type="text" className="form-control shadow-sm" value={question.quizCategory || ''}
                                    onChange={(e) => setQuestion({ ...question, quizCategory: e.target.value })} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Tytuł (widoczny w panelu)</label>
                                <input type="text" className="form-control shadow-sm" value={question.title}
                                    onChange={(e) => setQuestion({ ...question, title: e.target.value })} />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Treść pytania (HTML / Użyj ______ dla luk)</label>
                            <textarea className="form-control shadow-sm" rows="3" value={question.contentHtml}
                                onChange={(e) => setQuestion({ ...question, contentHtml: e.target.value })} />
                        </div>

                        {/* EDYCJA OPCJI - TYLKO DLA TYPÓW WYBORU I LUK */}
                        {(question.type === 'SINGLE_CHOICE' || question.type === 'MULTIPLE_CHOICE' || question.type === 'FILL_IN_BLANKS') && question.options && (
                            <div className="mb-4">
                                <label className="form-label fw-bold text-primary border-bottom pb-2 w-100">Odpowiedzi i Opcje:</label>
                                {question.options.map((opt, index) => (
                                    <div key={opt.id} className="input-group mb-3 shadow-sm">
                                        <span className="input-group-text bg-white fw-bold">{index + 1}</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={opt.type === 'image' ? "Link do obrazka" : "Treść odpowiedzi"}
                                            value={opt.value}
                                            onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                                        />
                                        <div className="input-group-text bg-light">
                                            <input
                                                className="form-check-input"
                                                type={question.type === 'SINGLE_CHOICE' ? "radio" : "checkbox"}
                                                name="isCorrect"
                                                checked={opt.isCorrect}
                                                onChange={(e) => {
                                                    let newOptions;
                                                    if (question.type === 'SINGLE_CHOICE') {
                                                        // Tylko jedna może być poprawna
                                                        newOptions = question.options.map(o => ({
                                                            ...o, isCorrect: o.id === opt.id
                                                        }));
                                                    } else {
                                                        // Wiele może być poprawnych
                                                        newOptions = question.options.map(o =>
                                                            o.id === opt.id ? { ...o, isCorrect: e.target.checked } : o
                                                        );
                                                    }
                                                    setQuestion({ ...question, options: newOptions });
                                                }}
                                            />
                                            <small className="ms-2 fw-bold text-success">Poprawna</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* EDYCJA PAR - TYLKO DLA TYPU MATCHING_PAIRS */}
                        {question.type === 'MATCHING_PAIRS' && question.pairs && (
                            <div className="mb-4">
                                <label className="form-label fw-bold text-success border-bottom pb-2 w-100">Pary do dopasowania:</label>
                                {question.pairs.map((p) => (
                                    <div key={p.id} className="row g-2 mb-2 shadow-sm p-3 bg-light rounded mx-0 align-items-center">
                                        <div className="col-5">
                                            <label className="small text-muted mb-1">Lewa strona</label>
                                            <input type="text" className="form-control" value={p.left}
                                                onChange={(e) => handlePairChange(p.id, 'left', e.target.value)} />
                                        </div>
                                        <div className="col-2 text-center pt-3">
                                            <span className="fs-4">↔</span>
                                        </div>
                                        <div className="col-5">
                                            <label className="small text-muted mb-1">Prawa strona (poprawna)</label>
                                            <input type="text" className="form-control" value={p.right}
                                                onChange={(e) => handlePairChange(p.id, 'right', e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* PRZYCISKI AKCJI */}
                        <div className="d-flex gap-3 pt-4 border-top mt-4">
                            <button type="submit" className="btn btn-warning btn-lg px-5 fw-bold shadow flex-grow-1">
                                Zastosuj zmiany
                            </button>
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4 shadow-sm" onClick={() => navigate('/quiz/dashboard')}>
                                Anuluj
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default QuizEdit;