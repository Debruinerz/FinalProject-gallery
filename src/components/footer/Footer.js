import React, { useContext } from 'react';
import { AuthContext } from '../../pages/auth/Auth';
import './footer.css';

const Footer = () => {
  const { darkMode } = useContext(AuthContext);

  return (
    <div className={`footer ${darkMode ? 'dark-mode' : ''}`}>
      <div className="logo">
        <h2>EVENT EIRE</h2>
      </div>
    </div>
  );
};

export default Footer;