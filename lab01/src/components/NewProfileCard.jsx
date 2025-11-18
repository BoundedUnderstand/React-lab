import React, { useReducer } from 'react'; 
import ProfileParagraph from './ProfileParagraph'; 
import Rating from './Rating';
import AppReducer from '../data/AppReducer';


const initialState = {
  rating: 0,
  hover: 0
};

function NewProfileCard({ profile }) {
  
  const [state, dispatch] = useReducer(AppReducer, initialState);
  
  const { rating, hover } = state;

  return (
    <div className="card shadow border-info"> 
      <div className="card-header text-center">
        <h5 className="h5 my-0 text-info">NOWY Profil Użytkownika</h5>
      </div>
      <div className="card-body"> 
        <ProfileParagraph label="Imię" title={profile.name} />
        <ProfileParagraph label="Email" title={profile.email} />
        <ProfileParagraph label="Telefon" title={profile.phone} />
        <ProfileParagraph label="Data urodzin" title={profile.birthDate} />
        <hr />
        <p className="small text-muted mb-1">
          Oceń ten profil (Aktualna ocena: {rating})
        </p>
        
        <Rating 
          rating={rating} 
          hover={hover} 
          dispatch={dispatch} 
        />
        
      </div>
    </div>
  );
}

export default NewProfileCard;