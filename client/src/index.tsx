import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const validParameters: { [key: string]: Boolean } = {
  id: true,
};

const parameters = new URLSearchParams(window.location.search);
parameters.forEach((value, key) => {
  if (validParameters[key]) {
    window.localStorage.setItem(key, value);
  }
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
