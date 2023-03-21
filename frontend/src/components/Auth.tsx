import { Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Auth.css'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import Email from '@mui/icons-material/Email'
import Person from '@mui/icons-material/Person'

interface User {
  _id?: string,
  username?: string,
  email?: string,
  password?: string,
  iat?: number
}

const Auth = ({ setToken, setUser}: {setToken: React.Dispatch<React.SetStateAction<string>>, setUser: React.Dispatch<React.SetStateAction<User>>}) => {
  let [isSignup, setIsSignup] = useState<boolean>(false)
  let [showPassword, setShowPassword] = useState<boolean>(false)
  let navigate = useNavigate()

  useEffect(() => {
    let removeToken = () => {
        window.localStorage.removeItem('token')
        setToken('')
        setUser({})
    }

    removeToken()
}, [setToken, setUser])

  /**
     * allows the user to signin
     */
  let signin = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const user = {email: form.get('email'), password: form.get('password')}
    
    let response = await fetch(`http://127.0.0.1:8000/verify`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    let data = await response.json()

    if(data.msg !== 'error') {
        navigateHome(data)
    }
}

/**
 * allows the user to register
 */
let signup = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const newUser = {
        username: form.get('username'), 
        email: form.get('email'), 
        password: form.get('password')
    }

    let response = await fetch(`http://127.0.0.1:8000/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })

    let data = await response.json()

    if('insertedId' in data) {
        setIsSignup(false)
    }
  }

  /**
     * changes between signin and signup inputs
     */
  let toggleAuth = (): void => {
    setIsSignup(!isSignup)
  }

  let navigateHome = async (token: string) => {
    let response = await fetch(`http://127.0.0.1:8000/user`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })

    let data = await response.json()
    setUser(data)
    window.localStorage.setItem('token', JSON.stringify(token))
    setToken(token)
    navigate('/home')
  }

  let toggleShowPassword = (): void => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='auth-body'>
      <div className='auth-box'>
        <form className='auth-form' onSubmit={isSignup ? signup : signin}>
          <div className='auth-title'>{isSignup ? 'Sign Up' : 'Sign In'}</div>
          <div className='auth-inputs'>
            {isSignup ? (<>
              <TextField variant='standard' color='secondary' id='username' name='username' label='Username' type='text' margin='normal' required 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton size='small' disabled>
                        <Person />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>) : null}
            <TextField variant='standard' color='secondary' id='email' name='email' label='Email' type='email' margin='normal' required 
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton size='small' disabled>
                      <Email />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField variant='standard' color='secondary' id='password' name='password' label='Password' type={showPassword ? 'text' : 'password'} margin='normal' required
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton size='small' onClick={toggleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
             />
          </div>
          <div className='auth-options'>
            <FormGroup>
              {isSignup ? (
                <FormControlLabel control={<Checkbox color='secondary' size='small' required />} label="I agree to the terms & conditions." />
              ) : (
                <FormControlLabel control={<Checkbox color='secondary' size='small' />} label="Remember me" />
              )}
            </FormGroup>
            {isSignup ? null : (<div className='forgot'>Forgot Password?</div>)}
          </div>
          <Button variant='contained' color='secondary' type='submit' fullWidth>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
          {isSignup ? (
            <div className='register'>
              <div>Already have an account?</div>
              <div className='register-option' onClick={toggleAuth}>Sign In</div>
            </div>
          ) : (
            <div className='register'>
              <div>Don't have an account?</div>
              <div className='register-option' onClick={toggleAuth}>Register</div>
            </div>
          )}
        </form>
      </div>
      <div className='wave'>
        <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
          <path d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' className='shape-fill'></path>
        </svg>
      </div>
    </div>
  )
}

export default Auth