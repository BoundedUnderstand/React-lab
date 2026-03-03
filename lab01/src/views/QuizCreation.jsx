import React from 'react';
import QuizCreatorForm from '../components/quiz/QuizCreatorForm';

const QuizCreation = () => {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white p-3">
                            <h2 className="h4 mb-0">Dodaj nowy komponent do quizu</h2>
                        </div>
                        <div className="card-body p-4">
                            <QuizCreatorForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizCreation;