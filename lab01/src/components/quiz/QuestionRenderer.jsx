import React, { useState, useEffect } from 'react';

const QuestionRenderer = ({ question, onNext, onIncorrect }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [userPairs, setUserPairs] = useState({});
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        setSelectedOptions([]);
        setUserPairs({});
        setFeedback(null);
    }, [question]);

    const handleVerify = () => {
        let isCorrect = false;
        if (['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'FILL_IN_BLANKS'].includes(question?.type)) {
            const correctIds = question.options?.filter(opt => opt.isCorrect).map(opt => opt.id) || [];
            isCorrect = selectedOptions.length === correctIds.length &&
                selectedOptions.every(id => correctIds.includes(id));
        } else if (question?.type === 'MATCHING_PAIRS') {
            isCorrect = question.pairs?.every(p => userPairs[p.id] === p.right);
        }

        if (isCorrect) {
            setFeedback('correct');
            setTimeout(onNext, 1000);
        } else {
            setFeedback('incorrect');
            if (onIncorrect) onIncorrect();
        }
    };

    const toggleOption = (id) => {
        if (question.type === 'SINGLE_CHOICE') {
            setSelectedOptions([id]);
        } else {
            setSelectedOptions(prev =>
                prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
            );
        }
        setFeedback(null);
    };

    // UNIWERSALNY RENDERER LUK Z PODKREŚLENIEM:
    const renderContent = () => {
        if (question?.type === 'FILL_IN_BLANKS') {
            // Rozdzielamy tekst wszędzie tam, gdzie występuje 6 podkreślników
            const parts = question.contentHtml.split('______');

            return (
                <div className="lh-lg">
                    {parts.map((part, index) => (
                        <React.Fragment key={index}>
                            {/* Renderujemy fragment tekstu (np. "React jest biblioteką języka ") */}
                            <span dangerouslySetInnerHTML={{ __html: part }} />

                            {/* Jeśli to nie jest ostatni fragment, wstawiamy interaktywną linię */}
                            {index < parts.length - 1 && (
                                <span
                                    className={`px-2 mx-1 transition-all border-bottom border-3 d-inline-block text-center ${selectedOptions[index]
                                        ? (index === 0 ? 'text-primary border-primary fw-bold' : 'text-info border-info fw-bold')
                                        : 'text-muted border-secondary opacity-50'
                                        }`}
                                    style={{ minWidth: '100px', verticalAlign: 'bottom' }}
                                >
                                    {selectedOptions[index]
                                        ? question.options.find(o => o.id === selectedOptions[index])?.value
                                        : '______'}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            );
        }
        // Dla innych typów pytań renderujemy standardowy HTML
        return <div dangerouslySetInnerHTML={{ __html: question?.contentHtml }} />;
    };

    return (
        <div className="card shadow-sm p-4 border-0 rounded-4 bg-white transition-hover">
            <div className="mb-4 lead fw-bold">
                {renderContent()}
            </div>

            {['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'FILL_IN_BLANKS'].includes(question?.type) && (
                <div className="d-flex flex-wrap gap-2">
                    {question.options?.map(opt => {
                        const orderIndex = selectedOptions.indexOf(opt.id);
                        const isSelected = orderIndex !== -1;

                        let btnClass = 'btn-outline-secondary';
                        if (isSelected) {
                            btnClass = orderIndex === 0 ? 'btn-primary' : 'btn-info';
                        }

                        return (
                            <button
                                key={opt.id}
                                onClick={() => toggleOption(opt.id)}
                                className={`btn fw-bold px-3 shadow-sm ${question.type === 'FILL_IN_BLANKS' ? 'btn-sm' : 'btn-lg text-start flex-grow-1'
                                    } ${btnClass}`}
                            >
                                {opt.type === 'image' ? (
                                    <img src={opt.value} style={{ maxHeight: '60px' }} alt="option" />
                                ) : (
                                    opt.value
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {question?.type === 'MATCHING_PAIRS' && (
                <div className="d-flex flex-column gap-3">
                    {question.pairs?.map(p => (
                        <div key={p.id} className="d-flex align-items-center gap-2">
                            <span className="p-2 border rounded bg-light flex-grow-1 shadow-sm small">{p.left}</span>
                            <span className="text-primary fw-bold">↔</span>
                            <select
                                className="form-select w-50 shadow-sm border-light"
                                onChange={e => setUserPairs({ ...userPairs, [p.id]: e.target.value })}
                                value={userPairs[p.id] || ""}
                            >
                                <option value="">Wybierz...</option>
                                {question.pairs?.map(pOpt => (
                                    <option key={pOpt.id} value={pOpt.right}>{pOpt.right}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            )}

            {feedback && (
                <div className={`alert mt-4 shadow-sm animate__animated ${feedback === 'correct' ? 'alert-success animate__fadeIn' : 'alert-danger animate__shakeX'
                    }`}>
                    {feedback === 'correct' ? '✨ Świetnie! Poprawna odpowiedź.' : '❌ Spróbuj jeszcze raz!'}
                </div>
            )}

            <button
                className="btn btn-success btn-lg mt-4 w-100 fw-bold shadow transition-hover"
                onClick={handleVerify}
                disabled={feedback === 'correct'}
            >
                Sprawdź odpowiedź
            </button>
        </div>
    );
};

export default QuestionRenderer;