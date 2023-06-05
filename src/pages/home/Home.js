import React from 'react';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import FontSizeChanger from '../../components/fontSizeChanger/FontSizeChanger';
import TextToSpeech from "../../components/textToSpeech/TextToSpeech";
import './home.css';

import { useState, useEffect } from 'react';

const Home = () => {
  const targetId = 'targetId';

  const [well, setWell] = useState('');

  useEffect(() => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setWell(targetElement.innerText);
    }
  }, [targetId]);

  const ok = "well hell bell smell";
  
  return (
    <div>
      <Header />
      <Navbar />
      <FontSizeChanger initialFontSize={16} targetSelector=".home-text" />
      
      <div>
        <h1 >Home</h1>
      </div>
      <div>
        <h2 id={targetId}>
          EventEire is a newly established company with the aims to ...
        </h2>
      </div>
      <div className="home-text">possible past and future events</div>
      <TextToSpeech text={well || ok} />
      <div className="home-text">opening times</div>
      <Footer />
    </div>
  );
};
export default Home;






