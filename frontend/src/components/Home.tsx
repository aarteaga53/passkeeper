import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import { IconButton, Tooltip } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
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
      clearPassword()
    }
  }

  let clearInput = (id: string) => {
    const input = (document.getElementById(id) as HTMLInputElement)
    input.value = ''
  }

  let toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  let clearPassword = () => {
    clearInput('for')
    clearInput('password')
  }

  return (
    <div className='page-body'>
      <div className='password-table'>
        <div className='table-header'>
          <div className='col-1'>For</div>
          <div className='col-2'>Password</div>
        </div>
        <form className='table-row' onSubmit={inputPassword}>
          <input className='table-ipt' id='for' name='for' type='text' autoComplete='off' required></input>
          <input className='table-ipt' id='password' name='password' type={showPassword ? 'text' : 'password'} autoComplete='off' required></input>
          <Tooltip title='show password'>
            <IconButton size='small' onClick={toggleShowPassword} sx={{ '&:hover': { backgroundColor: 'rgba(79, 255, 150, 0.4)' } }}>
              {showPassword ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title='add password'>
            <IconButton size='small' type='submit' sx={{ '&:hover': { backgroundColor: 'rgba(79, 255, 150, 0.4)' } }}>
              <DoneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='clear password'>
            <IconButton size='small' onClick={clearPassword} sx={{ '&:hover': { backgroundColor: 'rgba(79, 255, 150, 0.4)' } }}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </form>
        {passwords.map((password, index) => (
          <PasswordItem password={password} setPasswords={setPasswords} index={index} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Home