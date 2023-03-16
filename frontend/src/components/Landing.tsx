import React from 'react'
import '../styles/Landing.css'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='landing-body'>
      <Link className='auth-btn' to='/auth'>Sign In</Link>
    </div>
  )
}

export default Landing