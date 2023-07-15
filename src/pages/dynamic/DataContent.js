import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import FontSizeChanger from '../../components/fontSizeChanger/FontSizeChanger';
import TextToSpeech from '../../components/textToSpeech/TextToSpeech';

const DataContent = () => {
  const { title } = useParams();
  const [content, setContent] = useState(null);
  const [TtSVisible, setTtSVisible] = useState(false);
  const [well, setWell] = useState('');
  const targetId = 'targetId';

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

  if (content === null) {
    console.log('Fetching content for title:', title);
    return (
      <div>
        <Header />
        <div>Loading...</div>
        <Footer />
      </div>
    );
  }

  const ToggleTextToSpeech = () => {
    setTtSVisible(!TtSVisible);
  };


  return (
    <div>
      <Header />
      <h1>Dynamic Content</h1>
      <p>Title: {content.Title}</p>
      <img src={content.imgRef} alt={content.imgAlt} />
      <p id={targetId}>{content.textContent}</p>
      <div>
        {TtSVisible && <TextToSpeech text={well} />}
        <button onClick={ToggleTextToSpeech}>
          {TtSVisible ? 'Hide' : 'Show'} Text to Speech(main text content)
        </button>
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