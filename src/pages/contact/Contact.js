import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useDarkMode } from '../../pages/darkmode/DarkMode';
import './contact.css';
import CryptoJS from "crypto-js";
const secretPass = 'XkhZG4fW2t2W';

const Contact = () => {
  
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    text: '',
    phoneNumber: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {


      // encrypt

      const encryptContact = {
        firstName: CryptoJS.AES.encrypt(contact.firstName, secretPass).toString(),
        lastName: CryptoJS.AES.encrypt(contact.lastName, secretPass).toString(),
        email: CryptoJS.AES.encrypt(contact.email, secretPass).toString(),
        text: CryptoJS.AES.encrypt(contact.text, secretPass).toString(),
        phoneNumber: CryptoJS.AES.encrypt(contact.phoneNumber, secretPass).toString(),
      };

      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(encryptContact),
        });


        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        //const result = await response.json();
        console.log('New contact added:', contact);
        setIsSubmitted(true);
        setContact({
          firstName: '',
          lastName: '',
          email: '',
          text: '',
          phoneNumber: '',
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const NameChange = (e) => {
    const { name, value } = e.target;
    const newValue = value.replace(/[^A-Za-z]/g, '');
    setContact({ ...contact, [name]: newValue });
  };

  const validateForm = () => {
    const { firstName, lastName, email, text, phoneNumber } = contact;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const forbiddenChars = /["',`]/;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !text.trim() ||
      !phoneNumber.trim()
    ) {
      alert('All fields are required');
      return false;
    }
    if (!emailReg.test(email)) {
      alert('Invalid email format');
      return false;
    }
    if (firstName.length > 50 || lastName.length > 50) {
      alert('First Name and Last Name cannot exceed 50 characters');
      return false;
    }
    if (text.length > 3000) {
      alert('Message cannot exceed 3000 characters');
      return false;
    }
    if (phoneNumber.length !== 11) {
      alert('Phone Number must be 11 digits');
      return false;
    }
    if (
      forbiddenChars.test(firstName) ||
      forbiddenChars.test(lastName) ||
      forbiddenChars.test(text)
    ) {
      alert('Invalid characters detected. Please remove any quotes (", \', `)');
      return false;
    }
    return true;
  };

  const handleClose = () => {
    setIsSubmitted(false);
  };

  const { darkMode } = useDarkMode();

  return (
    <div>
      <Header />
     <div className={`wrap ${darkMode ? 'dark-mode' : ''}`}> 
      <br/>
        <h2>Contact us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={contact.firstName}
            onChange={NameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={contact.lastName}
            onChange={NameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Message:</label>
          <textarea
            name="text"
            value={contact.text}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            pattern="[0-9]{11}"
            value={contact.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {isSubmitted && (
        <div >
          <div >
            <h3>Submission Successful</h3>
            <p>Your form has been submitted successfully.</p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
      
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;