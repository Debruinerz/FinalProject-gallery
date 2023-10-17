import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import FontSizeChanger from '../../components/fontSizeChanger/FontSizeChanger';
import TextToSpeech from '../../components/textToSpeech/TextToSpeech';
import './datacontent.css';
import { useDarkMode } from '../../pages/darkmode/DarkMode';

const DataContent = () => {
  const { title } = useParams();
  const [content, setContent] = useState(null);
  const [TtSVisible, setTtSVisible] = useState(false);
  const [well, setWell] = useState('');
  const targetId = 'targetId';
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/content/${title}`);
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.log('Error fetching content data', error);
      }
    };

    fetchContent();
  }, [title]);

  useEffect(() => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setWell(targetElement.innerText);
    }
  }, [targetId]);

  useEffect(() => {
    setWell(document.getElementById(targetId)?.innerText || '');
  }, [content]);

  const getImagePath = () => {
    const imagePath = content ? require(`../../images/${content.imgRef}.jpg`) : null;
    return imagePath;
  };

  if (content === null) {
    console.log('Fetching content for title:', title);
    return (
      <div>
        <Header />
        <div> <h1>Error,</h1> There is no imformation availabe based on the title presented, please try again</div>
        <Footer />
      </div>
    );
  }

  const ToggleTextToSpeech = () => {
    setTtSVisible(!TtSVisible);
  };

 
  return (
    <div >
      <Header />
      <div className={`box ${darkMode ? 'dark-mode' : ''} `}> 
      <div className="sizeChanger">
            <FontSizeChanger initialFontSize={16} targetSelector=".box" />
      </div>
      <div className="content">
        <h1>Title: {content.Title}</h1>
        <img src={getImagePath()} alt={content.imgAlt} />
        <p id={targetId}>{content.textContent}</p>
        <div className="text-to-speech">
          {TtSVisible && <TextToSpeech text={well} />}
          <button onClick={ToggleTextToSpeech}>
            {TtSVisible ? 'Hide' : 'Show'} Text to Speech (main text content)
          </button>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default DataContent;

/* import React, { useState } from 'react';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

const Signup = () => {
  const [imageName, setImageName] = useState('');

  const handleInputChange = (event) => {
    setImageName(event.target.value);
  };

  const getImagePath = () => {
    try {
      return require(`../../images/${imageName}.jpg`);
    } catch (error) {
      return null;
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      
      <div>
        <input type="text" value={imageName} onChange={handleInputChange} />
        {imageName && <img src={getImagePath()} alt="User ex" />}
      </div>

      

      <Footer />
    </div>
  );
};

export default Signup;

 
*/