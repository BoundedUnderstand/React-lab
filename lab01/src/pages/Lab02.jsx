import React from 'react';
import { useParams } from 'react-router-dom'; 
import ProfileCard from '../components/ProfileCard';
import { people } from '../data/module-data.js'; 

const Lab02 = () => {
  
  
  const { id } = useParams();

  
  if (!id) {
    return (
      <div className="alert alert-warning">
        Brak identyfikatora osoby w ścieżce.
      </div>
    );
  }

  
  const numericId = parseInt(id);

  if (isNaN(numericId)) {
    return (
      <div className="alert alert-danger">
        Niepoprawny parametr ID. Identyfikator musi być liczbą.
      </div>
    );
  }


  const person = people.find(p => p.id === numericId);


  if (!person) {
    return (
      <div className="alert alert-warning">
        Nie znaleziono osoby o identyfikatorze: {id}
      </div>
    );
  }


  return (
    <div>
      <h2 className="mb-4">Szczegóły Profilu (ID: {id})</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ProfileCard profile={person} />
        </div>
      </div>
    </div>
  );
};

export default Lab02;