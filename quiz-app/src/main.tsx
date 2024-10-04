// src/main.tsx
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './tailwind.css'; // Import Tailwind CSS
// import App from './App';
// import './App.css'  // Ensure this imports your CSS with Tailwind

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';  // Make sure this is the CSS file with @tailwind imports

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

