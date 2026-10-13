import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-mono/400.css';
import App from './App';
import './styles/color-tokens.css';
import './styles/layout.css';
import './styles/chrome.css';
import './styles/hero-coderabbit.css';
import './styles/social-proof-coderabbit.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
