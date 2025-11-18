import React from 'react';

function SimpleLayout({ children }) {
    
  return (

    <div className="container-fluid">
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link" href="#">Laboratorium 1</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Laboratorium 2</a>
                </li>
            </ul>
        </nav>


        <div className="content"> 
            {children} 
        </div>

    </div>
  );
}

export default SimpleLayout;