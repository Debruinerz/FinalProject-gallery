import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../pages/auth/Auth";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useDarkMode } from "../../pages/darkmode/DarkMode";
import CryptoJS from "crypto-js";
import "./login.css";

const Login = () => {
  const secretPass = "XkhZG4fW2t2W";

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isnotverifited, setisnotverified] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        //databse connection and encryptoin
        const encryptedPassword = CryptoJS.AES.encrypt(
          loginData.password,
          secretPass
        ).toString();

        const encryptData = {
          username: loginData.username,
          password: encryptedPassword,
        };

        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(encryptData),
        });

        const responseData = await response.json();

        if (responseData.success) {
          console.log("Logged in:", loginData.username);
          login(loginData.username);
          setIsSubmitted(true);
          setLoginData({
            username: "",
            password: "",
          });
          navigate("/");
        } else {
          console.log("Login failed:", responseData.message);
          setisnotverified(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  // validation
  const validateForm = () => {
    const { username, password } = loginData;

    if (!username.trim() || !password.trim()) {
      alert("Username and password are required");
      return false;
    }
    return true;
  };

  const { darkMode } = useDarkMode();

  // forgot password
  const [forgotPasswordData, setForgotPasswordData] = useState({
    username: "",
    phoneNumber: "",
    newPassword: "",
  });
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(true);
  const [isPasswordsuccess, setIsPasswordsuccess] = useState(true);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const encryptPhoneNumber = CryptoJS.AES.encrypt(
        forgotPasswordData.phoneNumber,
        secretPass
      ).toString();
      const encryptNewPassword = CryptoJS.AES.encrypt(
        forgotPasswordData.newPassword,
        secretPass
      ).toString();

      const response = await fetch(
        `http://localhost:5000/api/forgotpassword/${forgotPasswordData.username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: encryptPhoneNumber,
            newPassword: encryptNewPassword,
          }),
        }
      );

      const responseData = await response.json();

      if (responseData.success) {
        console.log(responseData);
        console.log("Password updated successfully");
        setIsPasswordsuccess(false);
        setIsPasswordReset(true);
        setForgotPasswordData({
          username: "",
          phoneNumber: "",
          newPassword: "",
        });
      } else {
        console.log("Password update failed:", responseData.message);
        setIsPasswordsuccess(true);
        setIsPasswordReset(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className={`login ${darkMode ? "dark-mode" : ""}`}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit"
              style={{ display: "flex", justifyContent: "center" }}  > Login
            </button>
          </div>
        </form>
        {isSubmitted && (
          <div>
            <div>
              <h3>Login Successful</h3>
              <button onClick={() => setIsSubmitted(false)}>Close</button>
            </div>
          </div>
        )}
        {isnotverifited && (
          <div>
            <div>
              <h3>Login unSuccessful</h3>
              <p>Either username or password iccorect </p>
              <button onClick={() => setisnotverified(false)}>Close</button>
            </div>
          </div>
        )}

        {showForgotPasswordForm && (
          <form onSubmit={handleForgotPasswordSubmit} className="login">
            <h1> Reset Password </h1>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                value={forgotPasswordData.username}
                onChange={(e) =>
                  setForgotPasswordData({
                    ...forgotPasswordData,
                    username: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={forgotPasswordData.phoneNumber}
                onChange={(e) =>
                  setForgotPasswordData({
                    ...forgotPasswordData,
                    phoneNumber: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={forgotPasswordData.newPassword}
                onChange={(e) =>
                  setForgotPasswordData({
                    ...forgotPasswordData,
                    newPassword: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <button type="submit">Reset Password</button>
              <button onClick={() => { setIsPasswordReset(false);
                  setShowForgotPasswordForm(false);
                }}  > Close </button>
            </div>

            {!isPasswordsuccess && (
              <div className="login">
                <div>
                  <h3>Password Reset Successful</h3>
                  <p>Your password has been successfully reset.</p>
                  <button onClick={() => {  setIsPasswordReset(false);
                      setShowForgotPasswordForm(false);
                    }} >  Close </button>
                </div>
              </div>
            )}
            {!isPasswordReset && (
              <div className="login">
                <div>
                  <h3>Password Reset unsuccessful</h3>
                  <p>Your password has not been successfully reset.</p>
                  <button onClick={() => { setIsPasswordReset(false);
                      setShowForgotPasswordForm(false);
                    }}>Close</button>
                </div>
              </div>
            )}
          </form>
        )}

        {!showForgotPasswordForm && (
          <div>
            <button onClick={() => setShowForgotPasswordForm(true)}>
              Forgot Password?
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
