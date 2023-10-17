import React from 'react';
import { useDarkMode } from '../../pages/darkmode/DarkMode';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import QrScan from '../../components/qr/QrScan';
import './qr.css';

const Qr = () => {
  const { darkMode } = useDarkMode();

  return (
    <div >
      <Header />
    <div className={`qrreader ${darkMode ? 'dark-mode' : ''}`}>
        <QrScan />
    </div>
    <Footer />
    </div>
  );
};

export default Qr;