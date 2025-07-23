// imporitng react library from react
import React from 'react';
// imporitng react dom fromr eact router dom
import ReactDOM from 'react-dom/client';
// imporitng App(base jsx)
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* rendering App.jsx */}
    <App /> 
  </React.StrictMode>
);
