import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './AppRouter.js';
import App from './App.js';
import "./index.css";

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppRouter>
      <App />
    </AppRouter>
  </React.StrictMode>
);
