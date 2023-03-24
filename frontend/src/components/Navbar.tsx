import React, { useState } from 'react'
import '../styles/Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import LockIcon from '@mui/icons-material/Lock'

interface User {
  _id?: string,
  username?: string,
  email?: string,
  password?: string,
  iat?: number
}

const Navbar = ({ user, setIsSignedIn }: { user: User, setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>> } ) => {
  let [theme, setTheme] = useState(document.body.className);
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

  let toggleTheme = () => {
    if(theme === 'light-theme'){
      window.localStorage.setItem('theme', 'dark-theme');
      document.body.className = 'dark-theme'
      setTheme('dark-theme');
    }else{
      window.localStorage.setItem('theme', 'light-theme');
      document.body.className = 'light-theme'
      setTheme('light-theme');
    }
  }

  return (
    <div className='navbar'>
      <div className='name'>Pass Keeper</div>
      <div className='nav-links'>
        <Link className={isCurrent('home')} to='/home'><LockIcon className='nav-icon' />Passwords</Link>
        <div className='nav-link' onClick={toggleTheme}>{theme === 'dark-theme' ? (<><LightModeIcon className='nav-icon' />Light Mode</>) : (<><DarkModeIcon className='nav-icon' />Dark Mode</>)}</div>
        <Link className='nav-link' to='/' onClick={logout}><LogoutIcon className='nav-icon' />Sign Out</Link>
      </div>
    </div>
  )
}

export default Navbar