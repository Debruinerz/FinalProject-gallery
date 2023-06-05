import React from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const DataContent = () => {
  return (
    <div>
        <Header/>
        <Navbar/>
        


        <Footer/> 
    </div>
  )
}

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