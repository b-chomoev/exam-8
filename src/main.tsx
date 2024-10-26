import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CssBaseline />
    <StrictMode>
      <App />
    </StrictMode>,
  </BrowserRouter>
);
