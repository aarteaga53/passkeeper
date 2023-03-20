import React, { useState } from 'react'
import '../styles/Home.css'
import { Button, TextField } from '@mui/material'

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
  name?: string,
  password?: string
}

const Home = ({ user }: { user: User }) => {
  let [passwords, setPasswords] = useState<Password[]>([])

  let inputPassword = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const newPassword: Password = {
      username: user.username, 
      name: form.get('name')?.toString(), 
      password: form.get('password')?.toString()
    }

    setPasswords(passwords => [...passwords, newPassword])
    clearInput('name')
    clearInput('password')
  }

  let clearInput = (id: string) => {
    const input = (document.getElementById(id) as HTMLInputElement)
    input.value = ''
  }

  return (
    <div className='page-body'>
      <div className='password-table'>
        {passwords.map((pass, index) => (
          <div key={index}>{pass.name}</div>
        ))}
      </div>
      <form className='input-password' onSubmit={inputPassword}>
        <TextField variant='outlined' color='secondary' id='name' name='name' label='Name' type='text' margin='normal' required />
        <TextField variant='outlined' color='secondary' id='password' name='password' label='Password' type='password' margin='normal' required />
        <Button variant='contained' color='secondary' type='submit' >Enter</Button>
      </form>
    </div>
  )
}

export default Home