import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../data/AppContext';
import { db } from '../../data/firebase';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const QuizCreatorForm = ({ initialData, isEditMode = false }) => {
    const { dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    const [question, setQuestion] = useState({
        type: 'SINGLE_CHOICE', // SINGLE_CHOICE, MULTIPLE_CHOICE, MATCHING_PAIRS, FILL_IN_BLANKS
        quizCategory: 'Domyślny Quiz',
        title: '',
        contentHtml: '',
        options: [{ id: Date.now(), value: '', type: 'text', isCorrect: false }],
        pairs: [{ id: Date.now(), left: '', right: '' }]
    });

    useEffect(() => {
        if (initialData) setQuestion(initialData);
    }, [initialData]);

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setQuestion({
            ...question,
            type: newType,
            options: [{ id: Date.now(), value: '', type: 'text', isCorrect: false }],
            pairs: newType === 'MATCHING_PAIRS' ? [{ id: Date.now(), left: '', right: '' }] : []
        });
    };

    const addOption = () => {
        const newOption = { id: Date.now() + Math.random(), value: '', type: 'text', isCorrect: false };
        setQuestion({ ...question, options: [...question.options, newOption] });
    };

    const addPair = () => {
        const newPair = { id: Date.now() + Math.random(), left: '', right: '' };
        setQuestion({ ...question, pairs: [...question.pairs, newPair] });
    };

    const updateOption = (id, field, value) => {
        const updatedOptions = question.options.map(opt => {
            if (opt.id === id) return { ...opt, [field]: value };
            if (field === 'isCorrect' && value === true && question.type === 'SINGLE_CHOICE') return { ...opt, isCorrect: false };
            return opt;
        });
        setQuestion({ ...question, options: updatedOptions });
    };

    const updatePair = (id, field, value) => {
        const updatedPairs = question.pairs.map(p => p.id === id ? { ...p, [field]: value } : p);
        setQuestion({ ...question, pairs: updatedPairs });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!question.title || !question.contentHtml) {
            alert("Tytuł i treść HTML są wymagane!");
            return;
        }

        try {
            if (isEditMode) {
                const questionRef = doc(db, "questions", question.id);
                const { id, ...dataToUpdate } = question;
                await updateDoc(questionRef, dataToUpdate);
                dispatch({ type: 'EDIT_QUIZ_QUESTION', payload: question });
            } else {
                const docRef = await addDoc(collection(db, "questions"), question);
                dispatch({ type: 'ADD_QUIZ_QUESTION', payload: { ...question, id: docRef.id } });
            }
            navigate('/quiz/dashboard');
        } catch (error) {
            alert("Błąd zapisu do bazy danych.");
        }
    };

    return (
        <div className="card p-4 shadow-sm border-0">
            <h3 className="mb-4 text-primary fw-bold">{isEditMode ? '🛠️ Edycja' : '✨ Nowy Komponent'}</h3>
            <form onSubmit={handleSave}>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Kategoria Quizu (Nazwa):</label>
                        <input type="text" className="form-control shadow-sm" value={question.quizCategory || 'Domyślny Quiz'} onChange={e => setQuestion({ ...question, quizCategory: e.target.value })} required />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Rodzaj pytania:</label>
                        <select className="form-select shadow-sm" value={question.type} onChange={handleTypeChange}>
                            <option value="SINGLE_CHOICE">Pojedynczy wybór</option>
                            <option value="MULTIPLE_CHOICE">Wielokrotny wybór</option>
                            <option value="MATCHING_PAIRS">Dopasowanie par</option>
                            <option value="FILL_IN_BLANKS">Uzupełnianie luk (z listy)</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Tytuł:</label>
                        <input type="text" className="form-control shadow-sm" value={question.title} onChange={e => setQuestion({ ...question, title: e.target.value })} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Treść pytania (HTML):</label>
                    <textarea className="form-control shadow-sm" rows="3" value={question.contentHtml} onChange={e => setQuestion({ ...question, contentHtml: e.target.value })} placeholder="Dla luk użyj np. 'Stolicą Polski jest ____'" required />
                </div>

                {/* Sekcja dla Wyborów i Luk */}
                {question.type !== 'MATCHING_PAIRS' && (
                    <div className="mb-4 p-3 bg-light rounded shadow-sm border">
                        <h5 className="fw-bold">Opcje / Słowa do luk:</h5>
                        {question.options.map(opt => (
                            <div key={opt.id} className="input-group mb-2">
                                <span className="input-group-text bg-white">
                                    <input type={question.type === 'SINGLE_CHOICE' ? "radio" : "checkbox"} checked={opt.isCorrect} onChange={e => updateOption(opt.id, 'isCorrect', e.target.checked)} />
                                    <small className="ms-2">Poprawna</small>
                                </span>
                                <input type="text" className="form-control" value={opt.value} onChange={e => updateOption(opt.id, 'value', e.target.value)} placeholder="Treść..." required />
                                <button type="button" className="btn btn-danger" onClick={() => setQuestion({ ...question, options: question.options.filter(o => o.id !== opt.id) })} disabled={question.options.length <= 1}>&times;</button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-outline-primary mt-2" onClick={addOption}>+ Dodaj opcję</button>
                    </div>
                )}

                {/* Sekcja dla Dopasowania Par */}
                {question.type === 'MATCHING_PAIRS' && (
                    <div className="mb-4 p-3 bg-light rounded shadow-sm border">
                        <h5 className="fw-bold">Pary elementów:</h5>
                        {question.pairs.map(p => (
                            <div key={p.id} className="input-group mb-2">
                                <input type="text" className="form-control" placeholder="Lewy (np. Kraj)" value={p.left} onChange={e => updatePair(p.id, 'left', e.target.value)} required />
                                <span className="input-group-text">↔</span>
                                <input type="text" className="form-control" placeholder="Prawy (np. Stolica)" value={p.right} onChange={e => updatePair(p.id, 'right', e.target.value)} required />
                                <button type="button" className="btn btn-danger" onClick={() => setQuestion({ ...question, pairs: question.pairs.filter(pair => pair.id !== p.id) })} disabled={question.pairs.length <= 1}>&times;</button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-outline-primary mt-2" onClick={addPair}>+ Dodaj parę</button>
                    </div>
                )}

                <div className="d-flex gap-3">
                    <button type="submit" className="btn btn-success btn-lg flex-grow-1 shadow-sm fw-bold">{isEditMode ? "💾 Zapisz zmiany" : "🚀 Opublikuj"}</button>
                    <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/quiz/dashboard')}>Anuluj</button>
                </div>
            </form>
        </div>
    );
};

export default QuizCreatorForm;