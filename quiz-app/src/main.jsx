// main.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';  // Ensure this CSS file includes Tailwind imports for styling

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
