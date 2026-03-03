import React, { useState } from 'react';

/**
 * Komponent do prezentacji i interakcji z pytaniem typu "Wielokrotny Wybór".
 * Używa checkboxów do zaznaczenia wielu opcji.
 * @param {object} data - Obiekt pytania zawierający { questionId, options }.
 * @param {function} onAnswerChange - Opcjonalna funkcja do przekazywania aktualnej odpowiedzi do nadrzędnego stanu.
 */
const MultipleChoice = ({ data, onAnswerChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionToggle = (optionId) => {
    let newSelection;
    
    if (selectedOptions.includes(optionId)) {
      newSelection = selectedOptions.filter(id => id !== optionId);
    } else {
      
      newSelection = [...selectedOptions, optionId];
    }
    
    setSelectedOptions(newSelection);

    if (onAnswerChange) {
      onAnswerChange(data.questionId, newSelection);
    }
  };

  return (
    <div className="multiple-choice-options">
      <h4>Wybierz wszystkie poprawne odpowiedzi:</h4>
      
      {data.options.map((option) => (
        <label 
          key={option.id} 
          className={`option-label multiple ${selectedOptions.includes(option.id) ? 'selected' : ''}`}
        >
          <input
            type="checkbox"
            name={`question-${data.questionId}`} 
            value={option.id}
            checked={selectedOptions.includes(option.id)}
            onChange={() => handleOptionToggle(option.id)}
            aria-label={option.type === 'text' ? option.value : `Opcja ${option.id}`}
          />
          
          <div className="option-content">
            {option.type === 'text' ? (
              <p>{option.value}</p>
            ) : (
              <img 
                src={option.value} 
                alt={`Opcja obrazkowa ${option.id}`} 
                className="option-image" 
              />
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

export default MultipleChoice;