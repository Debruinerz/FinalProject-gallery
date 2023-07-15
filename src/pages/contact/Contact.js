

import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

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
      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contact),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('New contact added:', result);
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

  const validateForm = () => {
    const { firstName, lastName, email, text, phoneNumber } = contact;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const forbiddenCharsRegex = /["',`]/;

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
    if (!emailRegex.test(email)) {
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
      forbiddenCharsRegex.test(firstName) ||
      forbiddenCharsRegex.test(lastName) ||
      forbiddenCharsRegex.test(text)
    ) {
      alert('Invalid characters detected. Please remove any quotes (", \', `)');
      return false;
    }

    return true;
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
  };

  return (
    <div>
      <Header />
      <br/>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
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
          <small>(Enter 11-digit phone number without spaces or dashes)</small>
        </div>
        <button type="submit">Submit</button>
      </form>
      {isSubmitted && (
        <div className="modal">
          <div className="modal-content">
            <h3>Submission Successful</h3>
            <p>Your form has been submitted successfully.</p>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}

      <Footer/>
    </div>
  );
};

export default Contact;