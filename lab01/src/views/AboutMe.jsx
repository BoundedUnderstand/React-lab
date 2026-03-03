import React from 'react';

const AboutMe = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 transition-hover overflow-hidden">
            {/* Dekoracyjny pasek na górze karty */}
            <div className="bg-primary" style={{ height: '8px' }}></div>

            <div className="card-body p-5">
              <div className="text-center mb-4">
                {/* Miejsce na zdjęcie lub inicjały */}
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm"
                  style={{ width: '100px', height: '100px', border: '2px solid #e2e8f0' }}
                >
                  <span className="display-4 fw-bold text-primary">PB</span>
                </div>
                <h1 className="fw-bold text-dark h2">O Autorze</h1>
                <p className="text-muted">Projekt Semestralny: Frameworki Frontendowe</p>
              </div>

              <hr className="my-4 opacity-25" />

              <div className="space-y-3">
                <div className="d-flex align-items-center mb-3 p-3 bg-light rounded-3 border border-light">
                  <div className="bg-white p-2 rounded shadow-sm me-3">
                    <span style={{ fontSize: '1.2rem' }}>👤</span>
                  </div>
                  <div>
                    <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Imię i Nazwisko</small>
                    <span className="fw-bold text-dark">Patryk Budziński</span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3 p-3 bg-light rounded-3 border border-light">
                  <div className="bg-white p-2 rounded shadow-sm me-3">
                    <span style={{ fontSize: '1.2rem' }}>🆔</span>
                  </div>
                  <div>
                    <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Numer Albumu</small>
                    <span className="fw-bold text-dark">15264</span>
                  </div>
                </div>

                <div className="d-flex align-items-center p-3 bg-light rounded-3 border border-light">
                  <div className="bg-white p-2 rounded shadow-sm me-3">
                    <span style={{ fontSize: '1.2rem' }}>🎓</span>
                  </div>
                  <div>
                    <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Uczelnia</small>
                    <span className="fw-bold text-dark">WSEI Kraków</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-center">
                <p className="text-muted small">
                  Aplikacja stworzona w technologii <strong>React</strong> z wykorzystaniem
                  <strong> Firebase Firestore</strong> oraz <strong>Authentication</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;