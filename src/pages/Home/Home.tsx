import React from 'react';
import { useMachineContext } from '../../hooks/useMachineContext';

export const Home = (): JSX.Element => {
  const context = useMachineContext();
  return (
    <div>
      <h1>Popup Page</h1>
      <p>If you are seeing this, React is working!</p>
      <p>{JSON.stringify(context)}</p>
    </div>
  );
};
