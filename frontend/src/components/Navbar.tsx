import React, { useState } from 'react'
import '../styles/Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import LockIcon from '@mui/icons-material/Lock'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

interface User {
  _id?: string,
  username?: string,
  email?: string,
  password?: string,
  iat?: number
}

const Navbar = ({ user, setIsSignedIn }: { user: User, setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>> } ) => {
  let [theme, setTheme] = useState(document.body.className)
  let [isDisplayed, setIsDisplayed] = useState<boolean>(false)
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

  let toggleNav = () => {
    let nav = (document.getElementById('navbar') as HTMLDivElement)

    if(isDisplayed) {
      setIsDisplayed(false)
      nav.style.visibility = 'hidden'
    } else {
      setIsDisplayed(true)
      nav.style.visibility = 'visible'
    }
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
    <>
      <div className='nav-toggle'>
        {isDisplayed ? (
          <IconButton className='nav-icon' color='inherit' size='small' onClick={toggleNav}>
            <CloseIcon color='inherit' />
          </IconButton>
        ) : (
          <IconButton className='nav-icon' color='inherit' size='small' onClick={toggleNav}>
            <MenuIcon color='inherit' />
          </IconButton>
        )}
      </div>
      <div className='navbar' id='navbar'>
        <div className='name'>Pass Keeper</div>
        <div className='nav-links'>
          <Link className={isCurrent('home')} to='/home'><LockIcon className='link-icon' />Passwords</Link>
          <div className='nav-link' onClick={toggleTheme}>{theme === 'dark-theme' ? (<><LightModeIcon className='link-icon' />Light Mode</>) : (<><DarkModeIcon className='link-icon' />Dark Mode</>)}</div>
          <Link className='nav-link' to='/' onClick={logout}><LogoutIcon className='link-icon' />Sign Out</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar