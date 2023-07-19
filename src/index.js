import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const port = process.env.PORT || 3000;
console.log(`La aplicación se ejecutará en el puerto ${port}`);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

