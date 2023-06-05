import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  return (
    <div className='FooterContainer'>

            <div className='FooterItems'>
                <br/>
                <Link to="/home" className='navbtn'> HOME </Link>

                <Link to="/qrReader" className='navbtn'> QR READER </Link>
                <Link to="/contactUs" className='navbtn'> CONTACT US </Link>
            </div>
    </div>
  )
}


export default Footer