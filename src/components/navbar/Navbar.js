import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='nav'>
        <div className='navCont'>
            <div className='navList'>
                <div className='navListItem'>
                    <NavLink exact to="/" activeClassName="active">
                        HOME
                    </NavLink>
                </div>

                <div className='navListItem'>
                    <NavLink to="/qrReader" activeClassName="active">
                        QR READER
                    </NavLink>
                </div>

                <div className='navListItem'>
                    <NavLink to="/contactUs" activeClassName="active">
                        CONTACT US
                    </NavLink>
                </div>

                <div className='navListItem'>
                    <NavLink to="/admin" activeClassName="active">
                        ADMIN
                    </NavLink>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default Navbar