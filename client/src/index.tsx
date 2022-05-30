import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const validParameters: { [key: string]: Boolean } = {
  session: true,
};

const parameters = new URLSearchParams(window.location.search);
parameters.forEach((value, key) => {
  if (validParameters[key]) {
    window.localStorage.setItem(key, value);
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
