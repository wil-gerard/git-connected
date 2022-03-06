import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Context from './hooks/Context';

const params = new URLSearchParams(window.location.search)
params.forEach( (value,key) => { 
  window.localStorage.setItem(key,value)
})

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);
