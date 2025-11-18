import React from 'react';

const ProfileGrid = ({ columns, children }) => {
  

  return (

    <div className="row m-4"> 

      {React.Children.map(children, child => (

        <div className={`col-md-${12 / (columns || 3)} mb-4`}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default ProfileGrid;