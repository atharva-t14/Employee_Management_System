import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// import { Auth0Provider } from '@auth0/auth0-react';

// console.log('Auth0 Domain:', import.meta.env.VITE_AUTH0_DOMAIN);
// console.log('Auth0 Client ID:', import.meta.env.VITE_AUTH0_CLIENT_ID);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < BrowserRouter >
      <App />
    </BrowserRouter>
  </StrictMode >
);