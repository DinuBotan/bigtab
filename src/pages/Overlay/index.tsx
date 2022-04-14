import React from 'react';
import { createRoot } from 'react-dom/client';
import { MachineContextProvider } from '../../hooks/useMachineContext';
import './index.css';
import { Overlay } from './Overlay';

export const renderOverlay = () => {
  const container = document.createElement('div');
  container.id = 'bigtab-overlay';
  document.body.prepend(container);
  const root = createRoot(container as Element);
  root.render(
    <>
      <MachineContextProvider>
        <Overlay />
      </MachineContextProvider>
    </>,
  );
};
