import React from 'react';

const ContainerGrid = ({ element: Element, data }) => {
    
    if (!Element) {
        return <div className="alert alert-danger">Błąd: Nie zdefiniowano komponentu do renderowania (props 'element').</div>;
    }
    if (!Array.isArray(data) || data.length === 0) {
        return <div className="alert alert-warning">Brak danych do wyświetlenia.</div>;
    }

    return (
        <div className="row g-4"> 
            
            {data.map(item => (
                <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
                    <Element profile={item} /> 
                </div>
            ))}
            
        </div>
    );
};

export default ContainerGrid;