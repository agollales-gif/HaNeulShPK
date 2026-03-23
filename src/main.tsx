import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Hide the static hero shell once React takes over
const shell = document.getElementById('hero-shell');
if (shell) shell.style.display = 'none';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
