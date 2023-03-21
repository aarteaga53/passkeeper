import React from 'react'
import '../styles/Landing.css'
import { Link } from 'react-router-dom'
import key from '../images/key.png'
import lock from '../images/lock.png'
import store from '../images/store.png'
import manage from '../images/manage.png'

const Landing = () => {
  return (
    <div className='landing-body'>
      <Link className='auth-btn' to='/auth'>Sign In</Link>
      <div className='landing-title'>Pass Keeper</div>
      <div className='landing-sub'>The best password manager around.</div>
      <div className='info-sec'>
        <div className='info'>
          <img src={manage} alt='key' />
          <div className='info-text'>Manage your passwords</div>
        </div>
        <div className='info'>
          <img src={store} alt='key' />
          <div className='info-text'>Store in one place</div>
        </div>
        <div className='info'>
          <img src={lock} alt='key' />
          <div className='info-text'>Keep them protected</div>
        </div>
        <div className='info'>
          <img src={key} alt='key' />
          <div className='info-text'>Access from anywhere</div>
        </div>
      </div>
      <div className='wave'>
        <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
          <path d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' className='shape-fill'></path>
        </svg>
      </div>
    </div>
  )
}

export default Landing