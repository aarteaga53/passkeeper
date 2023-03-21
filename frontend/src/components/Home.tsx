import React, { useEffect, useState } from 'react'
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
      name: form.get('name')?.toString(), 
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
      clearInput('name')
      clearInput('password')
    }
  }

  let clearInput = (id: string) => {
    const input = (document.getElementById(id) as HTMLInputElement)
    input.value = ''
  }

  return (
    <div className='page-body'>
      <div className='password-table'>
        {passwords.map((pass, index) => (
          <div key={index}>
            <div>{pass.username}</div>
            <div>{pass.name}</div>
            <div>{pass.password}</div>
          </div>
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