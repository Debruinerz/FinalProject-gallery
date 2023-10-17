import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './pages/auth/Auth';
import App from './App';
import { DarkModeProvider } from './pages/darkmode/DarkMode';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </DarkModeProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
