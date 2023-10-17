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

// import React, { useState, useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../../pages/auth/Auth';
// import { DarkModeContext } from '../../pages/darkmode/DarkMode';
// import useisAdmin from '../isAdmin/isAdmin'; 
// import './header.css';

// const Navbar = () => {
//   const [showNavbar, setShowNavbar] = useState(false);
//   const { loggedIn, logout } = useContext(AuthContext);
//   const isAdminUser = useisAdmin(); 
//   const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

//   const handleShowNavbar = () => {
//     setShowNavbar(!showNavbar);
//   };

//   const handleLogout = () => {
//     logout();
//     window.location.reload();
//   };

//   const handleToggleDarkMode = () => {
//     toggleDarkMode();
//   };

//   return (
//     <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
//       <div className="container">
//         <div className="logo"><h1>EVENT EIRE</h1></div>
//         <div className="menu-icon" onClick={handleShowNavbar}>
//           Menu
//         </div>
//         <div className={`nav-elements  ${showNavbar && 'active'}`}>
//           <ul>
//             <li>
//               <NavLink to="/">Home</NavLink>
//             </li>
//             <li>
//               <NavLink to="/qrReader">QR READER</NavLink>
//             </li>
//             <li>
//               <NavLink to="/contactUs">CONTACT US</NavLink>
//             </li>
//             {isAdminUser && ( // Only show the Admin menu if the user is an admin
//             <li>
//               <NavLink to="/admin">ADMIN</NavLink>
//             </li>
//           )}
//           </ul>
//           <div className="login-logout">
//             {loggedIn !== null ? (
//               <>
//                 <span>logged: {loggedIn}</span>
//                 <NavLink to="/">
//                   <button onClick={handleLogout}>Logout</button>
//                 </NavLink>
//               </>
//             ) : (
//               <>
//                 <NavLink to="/login">
//                   <button>Login</button>
//                 </NavLink>

//                 <NavLink to="/signup">
//                   <button>Signup</button>
//                 </NavLink>
//               </>
//             )}
//           </div>
//           <div className="dark-mode-button">
//             <button onClick={handleToggleDarkMode}>Toggle Dark Mode</button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../pages/auth/Auth';
import useisAdmin from '../isAdmin/isAdmin'; 
import { DarkModeContext } from '../../pages/darkmode/DarkMode';
import './header.css';

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { loggedIn, logout } = useContext(AuthContext);
  const isAdminUser = useisAdmin(); 
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [selectedLink, setSelectedLink] = useState(0);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          setSelectedLink((prevLink) => (prevLink > 0 ? prevLink - 1 : 0));
          break;
        case 'ArrowRight':
          if (isAdminUser){
            setSelectedLink((prevLink) => (prevLink < 3 ? prevLink + 1 : 3)); 
          }else {
            setSelectedLink((prevLink) => (prevLink < 2 ? prevLink + 1 : 2)); 
          }
          break;
        case 'Enter':
          const links = document.querySelectorAll('.nav-elements ul a');
          if (links[selectedLink]) {
            links[selectedLink].click();
          }
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [selectedLink,isAdminUser]);

  

  return (
    <div className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
        <div className="logo"><h2>EVENT EIRE</h2></div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          Menu
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
              <li>
                <NavLink to="/" className={selectedLink === 0 ? 'active' : ''}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/qrReader" className={selectedLink === 1 ? 'active' : ''}>QR READER</NavLink>
              </li>
              <li>
                <NavLink to="/contactUs" className={selectedLink === 2 ? 'active' : ''}>CONTACT US</NavLink>
              </li>
              {isAdminUser && (
                <li>
                  <NavLink to="/admin" className={selectedLink === 3 ? 'active' : ''}>ADMIN</NavLink>
                </li>
              )}
            </ul>
            <div className="dark-mode-button">
              <button onClick={handleToggleDarkMode} >Toggle Dark Mode</button>
            </div>

            <div className="login-logout">
              {loggedIn !== null ? (
                <>
                  <span>logged: {loggedIn}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <button>Login</button>
                  </NavLink>

                  <NavLink to="/signup">
                    <button>Signup</button>
                  </NavLink>
                </>
              )}
            </div>
        </div>
    </div>// navbar
  );
};

export default Header;
