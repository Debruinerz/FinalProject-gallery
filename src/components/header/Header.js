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

import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          cdcdc
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          Menu
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar