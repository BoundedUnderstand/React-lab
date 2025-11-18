import React from 'react';


const ProfileParagraph = ({ label, title }) => {
  return (
    <div className="mb-2">
      <strong className="d-block">{label}:</strong> 
      <p className="p-0 m-0">{title}</p>
    </div>
  );
};

export default ProfileParagraph;