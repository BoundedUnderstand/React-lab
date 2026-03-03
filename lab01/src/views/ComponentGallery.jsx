import React from 'react';
import QuestionRenderer from '../components/quiz/QuestionRenderer';

const ComponentGallery = () => {
    const demoQuestions = [
        {
            id: 'demo1',
            type: 'SINGLE_CHOICE',
            title: 'Pojedynczy wybór - Tekst',
            contentHtml: '<p>Która planeta jest nazywana <b>Czerwoną Planetą</b>?</p>',
            options: [
                { id: 1, value: 'Wenus', isCorrect: false, type: 'text' },
                { id: 2, value: 'Mars', isCorrect: true, type: 'text' },
                { id: 3, value: 'Jowisz', isCorrect: false, type: 'text' }
            ]
        },
        {
            id: 'demo2',
            type: 'MULTIPLE_CHOICE',
            title: 'Wielokrotny wybór - Obrazy',
            contentHtml: '<p>Zaznacz wszystkie <b>owoce</b>:</p>',
            options: [
                { id: 4, value: 'https://cdn-icons-png.flaticon.com/128/415/415733.png', isCorrect: true, type: 'image' },
                { id: 5, value: 'https://cdn-icons-png.flaticon.com/128/2346/2346904.png', isCorrect: false, type: 'image' },
                { id: 6, value: 'https://cdn-icons-png.flaticon.com/128/2909/2909761.png', isCorrect: true, type: 'image' }
            ]
        },
        {
            id: 'demo3',
            type: 'MATCHING_PAIRS',
            title: 'Dopasowanie par',
            contentHtml: '<p>Połącz państwa z ich stolicami:</p>',
            pairs: [
                { id: 10, left: 'Polska', right: 'Warszawa' },
                { id: 11, left: 'Niemcy', right: 'Berlin' },
                { id: 12, left: 'Francja', right: 'Paryż' }
            ]
        },
        {
            id: 'demo4',
            type: 'FILL_IN_BLANKS',
            title: 'Uzupełnianie luk',
            contentHtml: '<p>React jest biblioteką języka ______, a do zarządzania stanem używamy ______.</p>',
            options: [
                { id: 20, value: 'JavaScript', isCorrect: true, type: 'text' },
                { id: 21, value: 'Python', isCorrect: false, type: 'text' },
                { id: 22, value: 'Reducera', isCorrect: true, type: 'text' }
            ]
        }
    ];

    return (
        <div className="container mt-4 mb-5">
            <div className="bg-primary text-white p-4 rounded-4 shadow-sm mb-5 text-center">
                <h1 className="fw-bold">Galeria Komponentów</h1>
                <p className="lead mb-0">Prezentacja wszystkich typów zadań zrealizowanych w projekcie.</p>
            </div>

            <div className="row g-5">
                {demoQuestions.map((q, index) => (
                    <div key={q.id} className="col-12 col-xl-6">
                        <div className="d-flex align-items-center mb-3">
                            <span className="badge bg-dark me-2">Typ {index + 1}</span>
                            <h4 className="mb-0 fw-bold text-secondary">{q.title}</h4>
                        </div>
                        <QuestionRenderer
                            question={q}
                            onNext={() => alert(`Brawo! Ukończono demo: ${q.title}`)}
                        />
                    </div>
                ))}
            </div>

            <footer className="mt-5 pt-4 border-top text-center text-muted">
                <p>Koniec prezentacji komponentów &bull; Projekt 2025</p>
            </footer>
        </div>
    );
};

export default ComponentGallery;