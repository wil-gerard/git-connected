import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserContextProvider from './hooks/UserContext';

const validParameters: { [key: string]: Boolean } = {
  id: true,
};

const parameters = new URLSearchParams(window.location.search);
parameters.forEach((value, key) => {
  if (validParameters[key]) {
    window.localStorage.setItem(key, value);
  }
});

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
