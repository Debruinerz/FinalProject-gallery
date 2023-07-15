// import React, { useState } from 'react';
// import Footer from "../../components/footer/Footer";
// import Header from "../../components/header/Header";
// import Navbar from "../../components/navbar/Navbar";

// const Signup = () => {
//   const [imageName, setImageName] = useState('');

//   const handleInputChange = (event) => {
//     setImageName(event.target.value);
//   };

//   const getImagePath = () => {
//     try {
//       return require(`../../images/${imageName}.jpg`);
//     } catch (error) {
//       return null;
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <Navbar />
      
//       <div>
//         <input type="text" value={imageName} onChange={handleInputChange} />
//         {imageName && <img src={getImagePath()} alt="User ex" />}
//       </div>

      

//       <Footer />
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    dobYear: '',
    dobMonth: '',
    dobDay: '',
    phoneNumber: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const dob = `${signupData.dobYear}-${signupData.dobMonth.padStart(2, '0')}-${signupData.dobDay.padStart(2, '0')}`;

        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...signupData, dob }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('New user registered:', result);
        setIsSubmitted(true);
        setSignupData({
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: '',
          dobYear: '',
          dobMonth: '',
          dobDay: '',
          phoneNumber: '',
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const validateForm = () => {
    const { username, password, firstName, lastName, email, dobYear, dobMonth, dobDay, phoneNumber } = signupData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const forbiddenCharsRegex = /["',`]/;
    const yearRegex = /^\d{4}$/;
    const monthRegex = /^(0?[1-9]|1[0-2])$/;
    const dayRegex = /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/;

    if (
      !username.trim() ||
      !password.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !dobYear.trim() ||
      !dobMonth.trim() ||
      !dobDay.trim() ||
      !phoneNumber.trim()
    ) {
      alert('All fields are required');
      return false;
    }

    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return false;
    }

    if (forbiddenCharsRegex.test(username)) {
      alert('Username cannot contain quotes or backticks');
      return false;
    }

    if (!yearRegex.test(dobYear)) {
      alert('Invalid year format. Please use yyyy');
      return false;
    }

    if (!monthRegex.test(dobMonth)) {
      alert('Invalid month format. Please use mm');
      return false;
    }

    if (!dayRegex.test(dobDay)) {
      alert('Invalid day format. Please use dd');
      return false;
    }

    const dob = `${dobYear}-${dobMonth.padStart(2, '0')}-${dobDay.padStart(2, '0')}`;
    setSignupData({ ...signupData, dob });

    return true;
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
  };

  return (
    <div>
      <Header />

      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" value={signupData.username} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={signupData.password} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstName" value={signupData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="lastName" value={signupData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={signupData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="dobYear">Year (yyyy):</label>
          <input type="text" name="dobYear" value={signupData.dobYear} onChange={handleChange} required />

          <label htmlFor="dobMonth">Month (mm):</label>
          <input type="text" name="dobMonth" value={signupData.dobMonth} onChange={handleChange} required />

          <label htmlFor="dobDay">Day (dd):</label>
          <input type="text" name="dobDay" value={signupData.dobDay} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            pattern="[0-9]{11}"
            value={signupData.phoneNumber}
            onChange={handleChange}
            required
          />
          <small>(Enter 11-digit phone number without spaces or dashes)</small>
        </div>
        <button type="submit">Register</button>
      </form>
      {isSubmitted && (
        <div className="modal">
          <div className="modal-content">
            <h3>Registration Successful</h3>
            <p>You have successfully registered.</p>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Signup;