import React from 'react';
import './styles/index.css';
import { createRoot } from 'react-dom/client';
import CommandPalette from './CommandPalette';

const container = document.createElement('div');
container.id = 'crx-container';
document.body.prepend(container);
// document.head.innerHTML +=
//   "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src * gap:; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src *; img-src * data: blob: android-webview-video-poster:; style-src * 'unsafe-inline';\">";

const root = createRoot(container as Element);

root.render(
  <>
    <CommandPalette />
  </>,
);
