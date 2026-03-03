import React from 'react';

const FooterApp = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light border-top">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="text-muted">
          <img src="data/images/wsei-logo-svg (1).svg" alt="Logo Uczelni" style={{ height: '50px', marginRight: '10px' }} />

        </span>

        <span className="text-muted small">
          Autor aplikacji: Patryk Budziński &middot; <a href="mailto:patryk.budzinski@microsoft.wsei.edu.pl" className="text-decoration-none">patryk.budzinski@microsoft.wsei.edu.pl</a>
        </span>
      </div>
    </footer>
  );
};

export default FooterApp;