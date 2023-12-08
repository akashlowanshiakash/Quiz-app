import React from 'react'
import { FaGithub } from 'react-icons/fa';
import "./Footer.css"


const Footer = () => {
  return (
    <div className='footer'>
        <h6 >Made with Love❤️ by Aashu</h6>
        <div className='footer2'>
        <h6>For code check my Github repository ------</h6>
        <a href="https://github.com/Aashu-Tiwari?tab=repositories" className='git'><FaGithub/></a>
        </div>

    </div>
  )
}

export default Footer