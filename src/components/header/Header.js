// import './header.css'
// import { Link } from 'react-router-dom'

// const Header = () => {
//   return (
//     <div className='navbar'>
//         <div className='navContainer'>
//             <span className='logo'>EventEire</span>
//             <div className='navItems'>
                
//                 <Link to="/login" className='navbtn'> Login </Link>
//                 <Link to="/signup" className='navbtn'> Sign Up </Link>

//             </div>
//         </div>
//     </div>
//   )
// }

// export default Header

import React, { useState, useContext } from 'react';
import { NavLink} from 'react-router-dom';
import { AuthContext } from '../../pages/auth/Auth';
import './header.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { loggedIn,logout } = useContext(AuthContext); 
  const [darkMode, setDarkMode] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = () => {
    logout(); 
    window.location.reload();
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  }; 

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="logo">EVENT EIRE</div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          Menu
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/qrReader">QR READER</NavLink>
            </li>
            <li>
              <NavLink to="/contactUs">CONTACT US</NavLink>
            </li>
            <li>
              <NavLink to="/admin">ADMIN</NavLink>
            </li>
          </ul>
          <div className="login-logout">
          {loggedIn !== null ? ( // If user is logged in, display username and Logout button
            <>
              <span>logged: {loggedIn}</span> {/* Display the username */}
              <NavLink to="/">
              <button onClick={handleLogout}>Logout</button>
              </NavLink>
            </>
          ) : ( // If user is not logged in, display Login and Signup buttons
            <>
              <NavLink to="/login">
                <button>Login</button>
              </NavLink>
              
              <NavLink to="/signup">
                <button>  Signup</button>
              </NavLink>
            </>
          )}
          </div>
          <div className="dark-mode-button">
            <button onClick={handleToggleDarkMode}>
              Toggle Dark Mode
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
