import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../pages/auth/Auth'; // Update the path to AuthContext

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Perform login request to backend
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        //const result = await response.json();
        console.log('Logged in:', loginData.username);
        login(loginData.username); 
        setIsSubmitted(true);
        setLoginData({
          username: '',
          password: '',
        });
        navigate('/'); 
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validateForm = () => {
    const { username, password } = loginData;

    if (!username.trim() || !password.trim()) {
      alert('Username and password are required');
      return false;
    }

    return true;
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" value={loginData.username} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={loginData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {isSubmitted && (
        <div className="modal">
          <div className="modal-content">
            <h3>Login Successful</h3>
            <p>You have successfully logged in.</p>
            <button onClick={() => setIsSubmitted(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;