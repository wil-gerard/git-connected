import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Context from './hooks/Context';

const validParameters: {[key: string]: Boolean} = { 
  discordId: true
}


const parameters = new URLSearchParams(window.location.search)
parameters.forEach( (value,key) => { 
  if ( validParameters[key] ) { window.localStorage.setItem(key,value) };
})

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);
