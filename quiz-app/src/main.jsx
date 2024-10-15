import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';  // Make sure this is the CSS file with @tailwind imports

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
