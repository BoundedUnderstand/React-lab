import React from 'react';

const Rating = ({ rating, hover, dispatch }) => {
  
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (index) => {
    dispatch({ type: 'SET_RATING', payload: index });
  };
  
  const handleMouseEnter = (index) => {
    dispatch({ type: 'SET_HOVER', payload: index });
  };
  
  const handleMouseLeave = () => {
    dispatch({ type: 'SET_HOVER', payload: 0 });
  };

  return (
    <div className="star-rating">
      {stars.map((index) => {
        const isStarOn = index <= (hover || rating);
        
        return (
          <button
            key={index}
            className={`btn btn-link star ${isStarOn ? 'on' : 'off'}`}

            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            &#9733; 
          </button>
        );
      })}
    </div>
  );
};

export default Rating;