import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBarMenuApp from '../components/NavBarMenuApp';
import FooterApp from '../components/FooterApp';

function RootLayout() {
  return (
    <>
      <NavBarMenuApp />

      <main className="container my-4">
        <Outlet />
      </main>

      <FooterApp />
    </>
  );
}

export default RootLayout;