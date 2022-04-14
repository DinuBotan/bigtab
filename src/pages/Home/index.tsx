import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Home } from './Home';
import { MachineContextProvider } from '../../hooks/useMachineContext';

export const renderHome = () => {
  const container = document.createElement('div');
  container.id = 'bigtab-home';
  document.body.prepend(container);
  const root = createRoot(container as Element);
  root.render(
    <>
      <MachineContextProvider>
        <Home />
      </MachineContextProvider>
    </>,
  );
};
