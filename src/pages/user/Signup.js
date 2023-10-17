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

import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useDarkMode } from "../../pages/darkmode/DarkMode";
import "./signup.css";
import CryptoJS from "crypto-js";
const secretPass = "XkhZG4fW2t2W";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dobYear: "",
    dobMonth: "",
    dobDay: "",
    phoneNumber: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      // Fetch encrypted user data from the server
      const response = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Network not ok");
      }

      const encryptedUsers = await response.json();

      // check if entered username/phonenumber already exists
      const decryptedUsernames = encryptedUsers.map((user) => {
        return CryptoJS.AES.decrypt(user.Username, secretPass).toString(
          CryptoJS.enc.Utf8
        );
      });

      if (decryptedUsernames.includes(signupData.username)) {
        alert("Username already exists");
        return;
      }

      const decryptedPhoneNumbers = encryptedUsers.map((user) => {
        return CryptoJS.AES.decrypt(user.PhoneNumber, secretPass).toString(
          CryptoJS.enc.Utf8
        );
      });

      if (decryptedPhoneNumbers.includes(signupData.phoneNumber)) {
        alert("Phone number already exists");
        return;
      }


      const dob = `${signupData.dobYear}-${signupData.dobMonth.padStart(
        2,"0")}-${signupData.dobDay.padStart(2, "0")}`;

      const dobvalid = new Date(
        parseInt(signupData.dobYear, 10),
        parseInt(signupData.dobMonth, 10) - 1,
        parseInt(signupData.dobDay, 10)
      );
  
      const currentDate = new Date();
      const minDate = new Date(1901, 0, 1); 
      if (dob < minDate || dobvalid > currentDate) {
        alert("Invalid date of birth. Please enter a valid date.");
        return;
      }

      const encryptedUserData = {
        username: CryptoJS.AES.encrypt(signupData.username, secretPass).toString(),
        password: CryptoJS.AES.encrypt(signupData.password, secretPass).toString(),
        firstName: CryptoJS.AES.encrypt(signupData.firstName, secretPass).toString(),
        lastName: CryptoJS.AES.encrypt(signupData.lastName, secretPass).toString(),
        email: CryptoJS.AES.encrypt(signupData.email, secretPass).toString(),
        phoneNumber: CryptoJS.AES.encrypt(signupData.phoneNumber, secretPass).toString(),
      };


      const res = await fetch("http://localhost:5000/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...encryptedUserData, dob }),
        }
      );
      

      if (!res.ok) {
        throw new Error("Network not ok");
      }

      const result = await res.json();
      console.log("New user:", result);
      setIsSubmitted(true);
      setSignupData({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        dobYear: "",
        dobMonth: "",
        dobDay: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const validateForm = () => {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      dobYear,
      dobMonth,
      dobDay,
      phoneNumber,
    } = signupData;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const forbiddenChara = /["',`]/;
    const yearReg = /^\d{4}$/;
    const monthReg = /^(0?[1-9]|1[0-2])$/;
    const dayReg = /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
    const maxlength = 50;

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
      alert("All fields are required");
      return false;
    }

    if (!emailReg.test(email)) {
      alert("Invalid email format");
      return false;
    }

    if (forbiddenChara.test(username)) {
      alert("Username cannot contain quotes or backticks");
      return false;
    }

    if (!yearReg.test(dobYear)) {
      alert("Invalid year format. Please use yyyy");
      return false;
    }

    if (!monthReg.test(dobMonth)) {
      alert("Invalid month format. Please use mm");
      return false;
    }

    if (!dayReg.test(dobDay)) {
      alert("Invalid day format. Please use dd");
      return false;
    }

    if (
      !username.trim() ||
      username.length > maxlength ||
      !password.trim() ||
      password.length > maxlength ||
      !firstName.trim() ||
      firstName.length > maxlength ||
      !lastName.trim() ||
      lastName.length > maxlength ||
      !email.trim() ||
      email.length > maxlength ||
      !dobYear.trim() ||
      dobYear.length !== 4 ||
      !dobMonth.trim() ||
      dobMonth.length > 2 ||
      !dobDay.trim() ||
      dobDay.length > 2 ||
      !phoneNumber.trim() ||
      phoneNumber.length > 11
    ) {
      alert("Invalid input or field length exceeded");
      return false;
    }

    const dob = `${dobYear}-${dobMonth.padStart(2, "0")}-${dobDay.padStart(
      2,
      "0"
    )}`;
    setSignupData({ ...signupData, dob });

    return true;
  };

  const handleSuccess = () => {
    setIsSubmitted(false);
  };

  const { darkMode } = useDarkMode();

  return (
    <div>
      <Header />
      <div className={`signup ${darkMode ? "dark-mode" : ""}`}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={signupData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={signupData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={signupData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div> DOB :</div>
          <div>
            <label htmlFor="dobYear">Year (yyyy):</label>
            <input
              type="text"
              name="dobYear"
              value={signupData.dobYear}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="dobMonth">Month (mm):</label>
            <input
              type="text"
              name="dobMonth"
              value={signupData.dobMonth}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="dobDay">Day (dd):</label>
            <input
              type="text"
              name="dobDay"
              value={signupData.dobDay}
              onChange={handleChange}
              required
            />
          </div>
          <br />
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
            <small>
              (Enter 11-digit phone number without spaces or dashes)
            </small>
          </div>
          <button type="submit">Register</button>
        </form>
        {isSubmitted && (
          <div >
            <div>
              <h3>Registration Successful</h3>
              <p>You have successfully registered.</p>
              <button onClick={handleSuccess}>Close</button>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default Signup;
