import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import PasswordItem from './PasswordItem'

interface User {
  _id?: string,
  username?: string,
  email?: string,
  password?: string,
  iat?: number
}

interface Password {
  _id?: string,
  username?: string,
  for?: string,
  password?: string
}

const Home = ({ user }: { user: User }) => {
  let [passwords, setPasswords] = useState<Password[]>([])
  let [showPassword, setShowPassword] = useState<boolean>(false)

  useEffect(() => {
    let getPasswords = async () => {
      if(user) {
        let response = await fetch(`http://127.0.0.1:8000/passwords/${user.username}`)
        let data = await response.json()
  
        if(!('msg' in data)) {
          setPasswords(data.reverse())
        }
      }
    }

    getPasswords()
  }, [user])

  let inputPassword = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const newPassword: Password = {
      username: user.username, 
      for: form.get('for')?.toString(), 
      password: form.get('password')?.toString()
    }

    let response = await fetch(`http://127.0.0.1:8000/passwords/input`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ newPassword: newPassword })
    })

    let data = await response.json()

    if('insertedId' in data) {
      newPassword._id = data.insertedId  
      setPasswords(passwords => [newPassword, ...passwords])
      clearInput('for')
      clearInput('password')
    }
  }

  let clearInput = (id: string) => {
    const input = (document.getElementById(id) as HTMLInputElement)
    input.value = ''
  }

  let toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='page-body'>
      <div className='password-table'>
        {passwords.map((password, index) => (
          <PasswordItem password={password} key={index} />
        ))}
      </div>
      <form className='input-password' onSubmit={inputPassword}>
        <TextField variant='outlined' color='secondary' id='for' name='for' label='For' type='text' margin='normal' focused required />
        <TextField variant='outlined' color='secondary' id='password' name='password' label='Password' type={showPassword ? 'text' : 'password'} margin='normal' focused required
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton size='small' onClick={toggleShowPassword} sx={{ '&:hover': { backgroundColor: 'rgba(38, 255, 125, 0.4)' } }}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant='contained' color='secondary' type='submit' >Enter</Button>
      </form>
    </div>
  )
}

export default Home