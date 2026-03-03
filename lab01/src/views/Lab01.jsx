import React, { useContext } from 'react'; 
import ProfileCard from '../components/ProfileCard'; 
import ProfileGrid from '../components/ProfileGrid'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContext from '../data/AppContext';

function Lab01() {
    
  const { items } = useContext(AppContext); 



  const columnCount = 3; 
  
  const GridComponent = ProfileGrid; 

  const profilesToDisplay = items; 


  if (!profilesToDisplay || profilesToDisplay.length === 0) {
      return <div>Ładowanie danych...</div>;
  }
  
  return (
    <>
      <h1>Lista profili użytkowników</h1>
      
      <GridComponent columns={columnCount}>
          {profilesToDisplay.map(person => (
              <ProfileCard key={person.id} profile={person} />
          ))}
      </GridComponent>
    </>
  );
}

export default Lab01;