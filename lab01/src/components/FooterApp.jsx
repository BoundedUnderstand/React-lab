import React from 'react';

const FooterApp = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light border-top">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="text-muted">
          <img src="/logo-uczelni.png" alt="Logo Uczelni" style={{ height: '24px', marginRight: '10px' }} />
          WSEI Kraków
        </span>
        
        <span className="text-muted small">
          Autor aplikacji: P. Budz &middot; <a href="mailto:p.budz@wsei.edu.pl" className="text-decoration-none">p.budz@wsei.edu.pl</a>
        </span>
      </div>
    </footer>
  );
};

export default FooterApp;