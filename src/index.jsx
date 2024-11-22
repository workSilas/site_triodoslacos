import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Rotas from './routes.jsx';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Rotas />
    <Toaster
      position="botton-center"
      reverseOrder={true}
    />
  </React.StrictMode>
);
