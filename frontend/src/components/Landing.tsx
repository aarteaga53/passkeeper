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
      {/* <svg width="1000" height="200">
        <path d="M 10 10 Q 950 0, 1000 200" stroke="black" strokeWidth='3' fill="none" />
      </svg> */}
    </div>
  )
}

export default Landing