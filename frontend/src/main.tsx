import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ToastProvider } from './context/ToastContext';
import { HistoryProvider } from './context/HistoryContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <HistoryProvider>
        <App />
      </HistoryProvider>
    </ToastProvider>
  </StrictMode>,
);
