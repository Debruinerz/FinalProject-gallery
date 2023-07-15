// import React from 'react';
// import Header from '../../components/header/Header';
// import Navbar from '../../components/navbar/Navbar';
// import Footer from '../../components/footer/Footer';
// import FontSizeChanger from '../../components/fontSizeChanger/FontSizeChanger';
// import TextToSpeech from "../../components/textToSpeech/TextToSpeech";
// import './home.css';

// import { useState, useEffect } from 'react';

// const Home = () => {
//   const targetId = 'targetId';
//   const [well, setWell] = useState('');

//   useEffect(() => {
//     const targetElement = document.getElementById(targetId);
//     if (targetElement) {
//       setWell(targetElement.innerText);
//     }
//   }, [targetId]);

//   //const ok = "well hell bell";
//   //cont ex = document.getElementsByClassName()
//   return (
//     <div>
//       <Header />
//       <Navbar />
//       <FontSizeChanger initialFontSize={16} targetSelector=".home-text" />
      
//       <div>
//         <h1 >Home</h1>
//       </div>
//       <div>
//         <h3 id={targetId}>
//           EventEire is a newly established company with the aims to enable those with disabilities 
//         </h3>
//       </div>
//       <div className="home-text">possible past and future events</div>
//       <div className='eventsWrapper'> 
        
//         <div className='currentCont'> 
//            <h4> currently on show</h4>
//            <div> title </div>
//            <div> image </div>
//            <div> text </div>
//         </div>

//         <div className='futurecont'> 
//           <h4> what to come in the future </h4>
//            <div> title </div>
//            <div> image </div>
//            <div> text </div>
//         </div>

//       </div>
//       <TextToSpeech text={well} />
//       <div className="home-text">opening times</div>
//       <Footer />
//     </div>
//   );
// };
// export default Home;



import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';

import FontSizeChanger from '../../components/fontSizeChanger/FontSizeChanger';
import TextToSpeech from '../../components/textToSpeech/TextToSpeech';
import './home.css';

const Home = () => {
  //const [imageName, setImageName] = useState('');
  const [well, setWell] = useState('');
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
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setWell(targetElement.innerText);
    }
  }, [targetId]);

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

  
  useEffect(() => {
    setWell(document.getElementById(targetId)?.innerText || '');
  }, [previewContent]);
  return (
    <div>
      <Header />
      
      <FontSizeChanger initialFontSize={16} targetSelector=".home-text" />


      <div>
        <h1>Home</h1>
      </div>

      <div>
         {loggedInUser && <p>Welcome, {loggedInUser}</p>} {/* Display the logged-in user */}
      </div>

      <div>
        <h3>EventEire is a newly established company with the aims to enable those with disabilities</h3>
      </div>

      <div className="home-text">possible past and future events</div>

      <div className="eventsWrapper">
        <div className="currentCont">
          <h4>Currently on show</h4>
          {previewContent.current && (
            <>
              <div>{previewContent.current.Title}</div>
              <img src={getImagePath()} alt={previewContent.current.imgAlt} />
              <div>{previewContent.current.textContent}</div>
            </>
          )}
        </div>

        <div className="futurecont">
          <h4>What's to come in the future</h4>
          {previewContent.future && (
            <>
              <div>{previewContent.future.Title}</div>
              <img src={getImagePath2()} alt={previewContent.future.imgAlt} />
              <div id={targetId}>{previewContent.future.textContent}</div>
            </>
          )}
        </div>
      </div>

      <TextToSpeech text={well} />

      <div className="home-text">opening times</div>
    </div>
  );
};


export default Home;