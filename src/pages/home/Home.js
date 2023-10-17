import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from "../../components/footer/Footer";
import { useDarkMode } from '../../pages/darkmode/DarkMode';
import FontSizeChanger from '../../components/fontSizeChanger/FontSizeChanger';
import TextToSpeech from '../../components/textToSpeech/TextToSpeech';
import './home.css';
import Weather from  '../../components/weather/weather';


const Home = () => {

  const [previewContent, setPreviewContent] = useState({ current: null, future: null });
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user || '');
  }, []);

  const getImagePath = () => {
    const imagePath = previewContent.current ? require(`../../images/${previewContent.current.imgRef}.jpg`) : null;
    return imagePath;
  };

  const getImagePath2 = () => {
    const imagePath = previewContent.future ? require(`../../images/${previewContent.future.imgRef}.jpg`) : null;
    return imagePath;
  };

  const targetId = 'targetId';

  useEffect(() => {
    const fetchPreviewContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/previewContent');
        const data = await response.json();
        setPreviewContent({
          current: data.find((content) => content.type === 'current'),
          future: data.find((content) => content.type === 'future'),
        });
      } catch (error) {
        console.log('Error fetching previewContent data', error);
      }
    };

    fetchPreviewContent();
  }, []);

  const { darkMode } = useDarkMode();
  return (
    <div>
     <div className={`home ${darkMode ? 'dark-mode' : ''} `}> 
     <Header/>
     
            <div className='overview'>
            <div className="sizeChanger">
              <FontSizeChanger initialFontSize={16} targetSelector=".home" />
            </div>
            <div>
              <h1>Home</h1>
            </div>
            <div>
            {loggedInUser && <p>Welcome, {loggedInUser}</p>} 
            </div>
            <h3>EventEire is a newly established company with the aims to enable everyone the change the chance to visit and enjoy different events, shows and gallerys to there fullest potential in which eveyone can roam freely and expierence the different kinds or art and history in an interactive and fun way.  </h3>
            </div>

            <div className="content-container">
              <div className="eventsWrapper">

                <div className="currentCont">
                <h2>Currently on show</h2>
                {previewContent.current && (
                  <>
                    <div>{previewContent.current.Title}</div>
                    <img src={getImagePath()} alt={previewContent.current.imgAlt} title={previewContent.current.imgAlt}/>
                    <div>{previewContent.current.textContent}</div>
                    <TextToSpeech text={previewContent.current.textContent} />
                  </>
                )}
                </div>

                <div className="futurecont">
                <h2>What's to come in the future</h2>
                {previewContent.future && (
                  <>
                    <div>{previewContent.future.Title}</div>
                    <img src={getImagePath2()} alt={previewContent.future.imgAlt} title={previewContent.future.imgAlt} />
                    <div id={targetId}>{previewContent.future.textContent}</div>
                    <TextToSpeech text={previewContent.future.textContent} />
                  </>
                )}
                </div>
              </div>

              <div className='currentweather'>
              <Weather/>
              </div>
              
            </div>
          </div>

          
    <Footer/>
    </div> //wrapper
  );
};

export default Home;

