import React from 'react';
import ProfileParagraph from './ProfileParagraph';

function ProfileCard({ profile }) {
  
  return (

    <div className="card shadow"> 
      
      <div className="card-header text-center">
        <h5 className="h5 my-0 text-primary">Profil użytkownika</h5>
      </div>
      

      <div className="card-body"> 
        <ProfileParagraph label="Imię" title={profile.name} />
        <ProfileParagraph label="Email" title={profile.email} />
        <ProfileParagraph label="Telefon" title={profile.phone} />
        <ProfileParagraph label="Data urodzin" title={profile.birthDate} />
      </div>

    </div>
  );
}

export default ProfileCard;