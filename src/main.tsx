import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Hide the static hero shell only after React has painted its first frame
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const shell = document.getElementById('hero-shell');
    if (shell) shell.style.display = 'none';
  });
});
