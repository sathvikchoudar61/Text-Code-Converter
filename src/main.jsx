import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>  {/* Wrap App with Router */}
      <App />
    </Router>
  </StrictMode>
);
