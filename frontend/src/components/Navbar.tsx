import React from 'react'
import '../styles/Navbar.css'
import { Link, useLocation } from 'react-router-dom'

interface User {
  _id?: string,
  username?: string,
  email?: string,
  password?: string,
  iat?: number
}

const Navbar = ({ user, setIsSignedIn }: { user: User, setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>> } ) => {
  let locate = useLocation()

  /**
     * checks if path given is currently selected
     * 
     * @param {*} path 
     * @returns a class name for the currently selected path
     */
  let isCurrent = (path: string): string => {
    return locate.pathname.includes(path) ? 'current nav-link' : 'nav-link'
  }

  let logout = () => {
    localStorage.removeItem('token')
    setIsSignedIn(false)
  }

  return (
    <div className='navbar'>
      <div className='name'>Pass Keeper</div>
      <div className='nav-links'>
        <Link className={isCurrent('home')} to='/home'>Home</Link>
        <Link className='nav-link' to='/' onClick={logout}>Sign Out</Link>
      </div>
    </div>
  )
}

export default Navbar