import React from 'react';
import ContainerGrid from '../components/ContainerGrid'; 
import NewProfileCard from '../components/NewProfileCard'; 
import { people } from '../data/module-data.js'; 

const Lab03 = () => {
    
  return (
    <div>
      <h2 className="mb-4">Laboratorium 3 - Elastyczna Siatka Komponentów</h2>
      
      <ContainerGrid 
        element={NewProfileCard} 
        data={people}           
      />
      
    </div>
  );
};

export default Lab03;